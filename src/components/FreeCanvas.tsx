import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EMBLEMS, ARROWS, ALL_SYMBOLS } from '../symbolsData';
import type { SymbolDef } from '../symbolsData';
import { SPELLS } from '../spellsData';
import { RotateCw, Trash2, ZoomIn, ZoomOut, Copy, Download, Circle, Crosshair } from 'lucide-react';

interface PlacedSymbol {
  id: string;
  symbolId: string;
  image: string;
  blackImage?: string;
  name: string;
  x: number;   // world coords (top-left du layout 70×70)
  y: number;
  rotation: number;
  scale: number;
  isCircle?: boolean;
  circleSizePx?: number;
}

interface ViewState { x: number; y: number; zoom: number; }

const BASE_SYM = 70;  // taille CSS de base d'un symbole (px)
let nextId = 1;

const CIRCLE_SYM: SymbolDef = {
  id: '__circle__', name: 'Cercle', category: 'emblem', image: '',
  description: 'Cercle de tracé libre',
};

const processImageToBlack = (src: string): Promise<string> =>
  new Promise(resolve => {
    if (!src) { resolve(''); return; }
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth || 70; c.height = img.naturalHeight || 70;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height);
      for (let i = 0; i < d.data.length; i += 4) {
        if (d.data[i + 3] > 10) { d.data[i] = 22; d.data[i+1] = 17; d.data[i+2] = 11; }
      }
      ctx.putImageData(d, 0, 0);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });

export const FreeCanvas: React.FC = () => {
  const [placedSymbols, setPlacedSymbols] = useState<PlacedSymbol[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showGuides, setShowGuides] = useState(true);
  const [clipboard, setClipboard] = useState<PlacedSymbol[]>([]);
  const [rightTab, setRightTab] = useState<'symbols' | 'spells'>('symbols');
  const [blackImages, setBlackImages] = useState<Map<string, string>>(new Map());
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, zoom: 1.0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ vx: number; vy: number; mx: number; my: number } | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [initSymPos, setInitSymPos] = useState<Map<string, { x: number; y: number }>>(new Map());

  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  // Prétraitement images → noir (pour export correct sans CSS filter)
  useEffect(() => {
    const srcs = [...new Set([...EMBLEMS, ...ARROWS].map(s => s.image).filter(Boolean))];
    Promise.all(srcs.map(src => processImageToBlack(src).then(b => [src, b] as [string, string])))
      .then(pairs => setBlackImages(new Map(pairs)));
  }, []);

  // Centrer la vue au démarrage
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const { width, height } = vp.getBoundingClientRect();
    setView({ zoom: 1.0, x: width / 2, y: height / 2 });
  }, []);

  // Zoom molette (non-passif obligatoire)
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = vp.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      setView(prev => {
        const factor = e.deltaY < 0 ? 1.12 : 0.9;
        const z = Math.min(6, Math.max(0.05, prev.zoom * factor));
        return { zoom: z, x: mx - (mx - prev.x) * (z / prev.zoom), y: my - (my - prev.y) * (z / prev.zoom) };
      });
    };
    vp.addEventListener('wheel', onWheel, { passive: false });
    return () => vp.removeEventListener('wheel', onWheel);
  }, []);

  // Raccourcis clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (selectedIds.size > 0) setClipboard(placedSymbols.filter(s => selectedIds.has(s.id)));
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        if (clipboard.length > 0) {
          const ids = new Set<string>();
          const syms = clipboard.map(sym => { const id = `sym-${nextId++}`; ids.add(id); return { ...sym, id, x: sym.x+25, y: sym.y+25 }; });
          setPlacedSymbols(p => [...p, ...syms]); setSelectedIds(ids);
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.size > 0) {
          setPlacedSymbols(p => p.filter(s => !selectedIds.has(s.id)));
          setSelectedIds(new Set());
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIds, clipboard, placedSymbols]);

  const handleViewportMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault(); setIsPanning(true);
      panStart.current = { vx: view.x, vy: view.y, mx: e.clientX, my: e.clientY };
    }
  }, [view]);

  const handleViewportMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning && panStart.current) {
      const dx = e.clientX - panStart.current.mx, dy = e.clientY - panStart.current.my;
      setView(p => ({ ...p, x: panStart.current!.vx + dx, y: panStart.current!.vy + dy }));
    } else if (draggingId && dragStartPos) {
      const dx = (e.clientX - dragStartPos.x) / view.zoom;
      const dy = (e.clientY - dragStartPos.y) / view.zoom;
      setPlacedSymbols(p => p.map(s => {
        if (selectedIds.has(s.id)) { const init = initSymPos.get(s.id); if (init) return { ...s, x: init.x+dx, y: init.y+dy }; }
        return s;
      }));
    }
  }, [isPanning, draggingId, dragStartPos, view.zoom, selectedIds, initSymPos]);

  const handleViewportMouseUp = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) setIsPanning(false);
    setDraggingId(null); setDragStartPos(null);
  }, []);

  const handleViewportClick = (e: React.MouseEvent) => {
    if (e.target === viewportRef.current || e.target === worldRef.current) setSelectedIds(new Set());
  };

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    const symbol: SymbolDef = JSON.parse(data);
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    // Screen → World, centré sur le symbole
    const wx = (e.clientX - rect.left - view.x) / view.zoom - BASE_SYM / 2;
    const wy = (e.clientY - rect.top  - view.y) / view.zoom - BASE_SYM / 2;
    const newId = `sym-${nextId++}`;

    if (symbol.id === '__circle__') {
      setPlacedSymbols(p => [...p, { id: newId, symbolId: '__circle__', image: '', name: 'Cercle', x: wx, y: wy, rotation: 0, scale: 1, isCircle: true, circleSizePx: 200 }]);
    } else {
      setPlacedSymbols(p => [...p, { id: newId, symbolId: symbol.id, image: symbol.image, blackImage: blackImages.get(symbol.image), name: symbol.name, x: wx, y: wy, rotation: 0, scale: 1 }]);
    }
    setSelectedIds(new Set([newId]));
  }, [view, blackImages]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; };

  const handleSymbolMouseDown = (e: React.MouseEvent, symId: string) => {
    e.stopPropagation();
    let sel = new Set(selectedIds);
    if (e.shiftKey) { if (sel.has(symId)) sel.delete(symId); else sel.add(symId); }
    else if (!sel.has(symId)) sel = new Set([symId]);
    setSelectedIds(sel); setDraggingId(symId);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    const ip = new Map<string, { x: number; y: number }>();
    placedSymbols.forEach(s => { if (sel.has(s.id)) ip.set(s.id, { x: s.x, y: s.y }); });
    setInitSymPos(ip);
  };

  const rotateSelected = (d: number) => setPlacedSymbols(p => p.map(s => selectedIds.has(s.id) ? { ...s, rotation: s.rotation + d } : s));
  const scaleSelected  = (d: number) => setPlacedSymbols(p => p.map(s => selectedIds.has(s.id) ? { ...s, scale: Math.max(0.05, s.scale + d) } : s));
  const deleteSelected = () => { setPlacedSymbols(p => p.filter(s => !selectedIds.has(s.id))); setSelectedIds(new Set()); };
  const duplicateSelected = () => {
    const syms = placedSymbols.filter(s => selectedIds.has(s.id));
    const ids = new Set<string>();
    const dupes = syms.map(sym => { const id = `sym-${nextId++}`; ids.add(id); return { ...sym, id, x: sym.x+30, y: sym.y+30 }; });
    setPlacedSymbols(p => [...p, ...dupes]); setSelectedIds(ids);
  };
  const clearAll = () => { setPlacedSymbols([]); setSelectedIds(new Set()); };

  // Recentrer sur l'origine monde (0,0) avec zoom 1
  const recenter = () => {
    const vp = viewportRef.current; if (!vp) return;
    const { width, height } = vp.getBoundingClientRect();
    setView({ zoom: 1.0, x: width / 2, y: height / 2 });
  };

  const adjustZoom = (factor: number) => {
    const vp = viewportRef.current; if (!vp) return;
    const { width, height } = vp.getBoundingClientRect();
    const cx = width/2, cy = height/2;
    setView(p => { const z = Math.min(6, Math.max(0.05, p.zoom * factor)); return { zoom: z, x: cx-(cx-p.x)*(z/p.zoom), y: cy-(cy-p.y)*(z/p.zoom) }; });
  };

  // ── Export via canvas API (CSS filters ignorés par html2canvas) ──────────
  // Calcul clé : CSS transform-origin:center ne modifie PAS la position layout.
  // Le centre du symbole en monde = (sym.x + BASE_SYM/2, sym.y + BASE_SYM/2)
  // Le centre du cercle en monde  = (sym.x + basePx/2,   sym.y + basePx/2)
  const exportJPG = useCallback(async () => {
    const vp = viewportRef.current; if (!vp) return;
    const prevSel = new Set(selectedIds);
    setSelectedIds(new Set());
    await new Promise(r => setTimeout(r, 100));

    try {
      const { width, height } = vp.getBoundingClientRect();
      const DPR = 2;
      const oc = document.createElement('canvas');
      oc.width = width * DPR; oc.height = height * DPR;
      const ctx = oc.getContext('2d')!;
      ctx.scale(DPR, DPR);

      // Fond beige
      ctx.fillStyle = '#f2ece0';
      ctx.fillRect(0, 0, width, height);

      // Guides
      if (showGuides) {
        const ox = view.x, oy = view.y;
        ctx.strokeStyle = 'rgba(0,0,0,0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 9]);
        [100, 200, 300, 400].forEach(r => {
          ctx.beginPath(); ctx.arc(ox, oy, r * view.zoom, 0, Math.PI * 2); ctx.stroke();
        });
        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(width, oy); ctx.stroke();
      }

      // Symboles placés
      await Promise.all(placedSymbols.map(sym => new Promise<void>(resolve => {
        if (sym.isCircle) {
          const basePx = sym.circleSizePx ?? 200;
          // Centre = top-left layout + moitié de la taille de base
          const cx = view.x + (sym.x + basePx / 2) * view.zoom;
          const cy = view.y + (sym.y + basePx / 2) * view.zoom;
          const radius = (basePx / 2) * sym.scale * view.zoom;
          ctx.strokeStyle = 'rgba(22,17,11,0.88)';
          ctx.lineWidth = 1.5 * view.zoom;
          ctx.setLineDash([]);
          ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
          resolve();
        } else {
          const img = new Image();
          img.onload = () => {
            // Centre layout : sym.x + BASE_SYM/2 (indépendant du scale CSS)
            const cx = view.x + (sym.x + BASE_SYM / 2) * view.zoom;
            const cy = view.y + (sym.y + BASE_SYM / 2) * view.zoom;
            const drawSize = BASE_SYM * sym.scale * view.zoom;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(sym.rotation * Math.PI / 180);
            ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
            ctx.restore();
            resolve();
          };
          img.onerror = () => resolve();
          img.src = sym.blackImage || sym.image;
        }
      })));

      const link = document.createElement('a');
      link.download = 'pentacle-atelier.jpg';
      link.href = oc.toDataURL('image/jpeg', 0.95);
      link.click();
    } catch (err) { console.error('Export error:', err); }
    finally { setSelectedIds(prevSel); }
  }, [placedSymbols, view, showGuides, selectedIds]);

  // ── Charger un sort préfait ──────────────────────────────────────────────
  const loadSpell = useCallback((spellId: string) => {
    const spell = SPELLS.find(s => s.id === spellId);
    const vp = viewportRef.current;
    if (!spell || !vp) return;
    const { width, height } = vp.getBoundingClientRect();
    const cx = (width / 2 - view.x) / view.zoom;
    const cy = (height / 2 - view.y) / view.zoom;
    const circleR = 220;
    const innerR = circleR * 0.6;  // cercle intérieur pour circleCount=2
    const circleCount = spell.circleCount ?? 1;
    const syms: PlacedSymbol[] = [];

    // ── Cercle(s) ──
    syms.push({
      id: `sym-${nextId++}`, symbolId: '__circle__', image: '', name: 'Cercle',
      x: cx - circleR, y: cy - circleR,
      rotation: 0, scale: 1, isCircle: true, circleSizePx: circleR * 2,
    });
    if (circleCount >= 2) {
      syms.push({
        id: `sym-${nextId++}`, symbolId: '__circle__', image: '', name: 'Cercle',
        x: cx - innerR, y: cy - innerR,
        rotation: 0, scale: 1, isCircle: true, circleSizePx: innerR * 2,
      });
    }

    // ── Emblème(s) au centre ──
    const ec = spell.emblems.length;
    spell.emblems.forEach((embId, i) => {
      const def = ALL_SYMBOLS.find(s => s.id === embId);
      if (!def) return;
      const angleDeg = ec > 1 ? (i * 360 / ec) : 0;
      const angle = angleDeg * Math.PI / 180;
      const r = ec > 1 ? 55 : 0;
      syms.push({
        id: `sym-${nextId++}`, symbolId: def.id, image: def.image,
        blackImage: blackImages.get(def.image), name: def.name,
        x: cx + Math.cos(angle) * r - BASE_SYM / 2,
        y: cy + Math.sin(angle) * r - BASE_SYM / 2,
        rotation: 0, scale: 2.8,
      });
    });

    // ── Flèches sur le périmètre ──
    const arrCount = spell.arrows.length;
    if (arrCount > 0) {
      const reps = spell.arrowReps ?? (arrCount <= 2 ? 8 : arrCount <= 4 ? 3 : 2);
      const config = spell.arrowConfig ?? 'alternate';

      // Construire la séquence complète de flèches
      const allArrows: string[] = [];
      for (let r = 0; r < reps; r++) spell.arrows.forEach(a => allArrows.push(a));
      const total = allArrows.length;

      allArrows.forEach((arrId, i) => {
        const def = ALL_SYMBOLS.find(s => s.id === arrId);
        if (!def) return;
        const angleDeg = (i * 360 / total) - 90; // départ au sommet
        const angle = angleDeg * Math.PI / 180;

        // Direction de la flèche selon config
        let rotation: number;
        if (config === 'outward')    rotation = angleDeg + 90;   // pointe vers l'extérieur
        else if (config === 'inward') rotation = angleDeg + 270;  // pointe vers le centre
        else if (config === 'tangent') rotation = angleDeg;        // tangentiel dans le sens horaire
        else /* 'alternate' */        rotation = i % 2 === 0 ? angleDeg + 270 : angleDeg + 90;

        // Pour les spells à 2 cercles, les flèches du 2e anneau vont sur innerR
        // Les flèches doivent être à l'intérieur du cercle (0.78 fois le rayon) comme dans le manga
        const radius = circleCount >= 2 && i >= total / 2 ? innerR * 0.78 : circleR * 0.78;

        syms.push({
          id: `sym-${nextId++}`, symbolId: def.id, image: def.image,
          blackImage: blackImages.get(def.image), name: def.name,
          x: cx + Math.cos(angle) * radius - BASE_SYM / 2,
          y: cy + Math.sin(angle) * radius - BASE_SYM / 2,
          rotation, scale: 0.72,
        });
      });
    }

    // ── Symboles placés manuellement (customLayout) ──
    if (spell.customLayout) {
      spell.customLayout.forEach(item => {
        const def = ALL_SYMBOLS.find(s => s.id === item.symbolId);
        if (!def) return;
        syms.push({
          id: `sym-${nextId++}`, symbolId: def.id, image: def.image,
          blackImage: blackImages.get(def.image), name: def.name,
          x: cx + item.xOffset - BASE_SYM / 2,
          y: cy + item.yOffset - BASE_SYM / 2,
          rotation: item.rotation, scale: item.scale,
        });
      });
    }

    setPlacedSymbols(p => [...p, ...syms]);
    setSelectedIds(new Set());
  }, [view, blackImages]);

  const handlePaletteDragStart = (e: React.DragEvent, symbol: SymbolDef) => {
    e.dataTransfer.setData('application/json', JSON.stringify(symbol));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Guides en espace monde — plus visibles
  const renderGuides = () => {
    if (!showGuides) return null;
    return (
      <div style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        {/* Cercles concentriques */}
        {[100, 200, 300, 400].map(r => (
          <div key={r} style={{
            position: 'absolute', left: -r, top: -r, width: r*2, height: r*2,
            border: '1.5px dashed rgba(0,0,0,0.28)', borderRadius: '50%',
          }} />
        ))}
        {/* Croix centrale (traits pleins) */}
        <div style={{ position: 'absolute', left: -5000, top: -1, width: 10000, height: 2, background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'absolute', left: -1, top: -5000, width: 2, height: 10000, background: 'rgba(0,0,0,0.15)' }} />
        {/* Diagonales légères */}
        {[-1,1].map(dir => (
          <div key={dir} style={{
            position: 'absolute', left: -1, top: -3000, width: 2, height: 6000,
            background: 'rgba(0,0,0,0.07)', transformOrigin: 'center',
            transform: `rotate(${dir * 45}deg)`,
          }} />
        ))}
        {/* Point central */}
        <div style={{ position: 'absolute', left: -6, top: -6, width: 12, height: 12, border: '2px solid rgba(0,0,0,0.25)', borderRadius: '50%' }} />
      </div>
    );
  };

  return (
    <>
      {/* ── Sidebar gauche ── */}
      <aside className="left-sidebar">
        <div>
          <div className="sidebar-section-title">Espace de travail</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={exportJPG} className="primary" style={{ width: '100%' }}>
              <Download size={14} /> Exporter JPG
            </button>
            <button onClick={clearAll} className="danger" style={{ width: '100%' }}>
              <Trash2 size={14} /> Tout effacer
            </button>
          </div>
        </div>

        <hr className="section-divider" />

        <div>
          <div className="sidebar-section-title">Navigation</div>
          {/* Bouton recentrer dédié */}
          <button onClick={recenter} style={{ width: '100%', marginBottom: '10px' }}>
            <Crosshair size={14} /> Recentrer (origine)
          </button>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button onClick={() => adjustZoom(1.2)} style={{ flex: 1, padding: '7px' }} title="Zoom +"><ZoomIn size={14} /></button>
            <button onClick={recenter} style={{ flex: 2, fontSize: '0.82rem' }} title="Réinitialiser zoom">
              {Math.round(view.zoom * 100)}%
            </button>
            <button onClick={() => adjustZoom(0.8)} style={{ flex: 1, padding: '7px' }} title="Zoom -"><ZoomOut size={14} /></button>
          </div>
          <div className="toggle-row">
            <span className="toggle-label" style={{ fontSize: '0.85rem' }}>Guides de tracé</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={showGuides} onChange={e => setShowGuides(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.6 }}>
            🖱 Molette : zoom<br />🖱 Clic milieu : déplacer
          </p>
        </div>

        {selectedIds.size > 0 && (
          <>
            <hr className="section-divider" />
            <div>
              <div className="sidebar-section-title">Sélection ({selectedIds.size})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => rotateSelected(-15)} style={{ flex: 1 }}><RotateCw size={13} style={{ transform: 'scaleX(-1)' }} /> -15°</button>
                  <button onClick={() => rotateSelected(15)} style={{ flex: 1 }}><RotateCw size={13} /> +15°</button>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => scaleSelected(0.2)} style={{ flex: 1 }}><ZoomIn size={13} /> +</button>
                  <button onClick={() => scaleSelected(-0.2)} style={{ flex: 1 }}><ZoomOut size={13} /> -</button>
                </div>
                <button onClick={duplicateSelected}><Copy size={13} /> Dupliquer</button>
                <button onClick={deleteSelected} className="danger"><Trash2 size={13} /> Supprimer</button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* ── Canvas infini ── */}
      <div
        ref={viewportRef}
        className={`canvas-viewport ${isPanning ? 'panning' : ''}`}
        onMouseDown={handleViewportMouseDown}
        onMouseMove={handleViewportMouseMove}
        onMouseUp={handleViewportMouseUp}
        onMouseLeave={() => { setIsPanning(false); setDraggingId(null); setDragStartPos(null); }}
        onClick={handleViewportClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onContextMenu={e => e.preventDefault()}
      >
        <div
          ref={worldRef}
          className="canvas-world"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}
        >
          {renderGuides()}

          {placedSymbols.map(sym => (
            <div
              key={sym.id}
              className={`placed-symbol ${selectedIds.has(sym.id) ? 'selected' : ''}`}
              style={{
                position: 'absolute', left: sym.x, top: sym.y,
                transform: `rotate(${sym.rotation}deg) scale(${sym.scale})`,
                transformOrigin: 'center',
                cursor: draggingId === sym.id ? 'grabbing' : 'grab',
                zIndex: selectedIds.has(sym.id) ? 100 : 10,
              }}
              onMouseDown={e => handleSymbolMouseDown(e, sym.id)}
            >
              {sym.isCircle ? (
                <div style={{
                  width: sym.circleSizePx ?? 200, height: sym.circleSizePx ?? 200,
                  border: '2px solid rgba(22,17,11,0.82)', borderRadius: '50%',
                  pointerEvents: 'none',
                }} />
              ) : (
                <img
                  src={sym.blackImage || sym.image} alt={sym.name}
                  style={{ width: BASE_SYM, height: BASE_SYM, objectFit: 'contain', pointerEvents: 'none' }}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>

        {placedSymbols.length === 0 && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(0,0,0,0.18)', textAlign: 'center',
            pointerEvents: 'none', fontFamily: 'Cinzel, serif', fontSize: '1rem', letterSpacing: '1px',
          }}>
            Glissez des symboles depuis le panneau de droite
          </div>
        )}

        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          background: 'rgba(0,0,0,0.07)', color: 'rgba(0,0,0,0.32)',
          fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px',
          letterSpacing: '1px', pointerEvents: 'none', userSelect: 'none',
        }}>
          {Math.round(view.zoom * 100)}%
        </div>
      </div>

      {/* ── Sidebar droite ── */}
      <aside className="right-sidebar">
        <div className="sidebar-tabs">
          <button className={`sidebar-tab ${rightTab === 'symbols' ? 'active' : ''}`} onClick={() => setRightTab('symbols')}>Symboles</button>
          <button className={`sidebar-tab ${rightTab === 'spells' ? 'active' : ''}`} onClick={() => setRightTab('spells')}>Sorts préfaits</button>
        </div>

        <div className="sidebar-content">
          {rightTab === 'symbols' ? (
            <>
              <div className="sidebar-section-title">Formes</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '20px' }}>
                <div className="palette-item" draggable onDragStart={e => handlePaletteDragStart(e, CIRCLE_SYM)} title="Cercle — glisser pour placer">
                  <Circle size={34} color="var(--text-main)" strokeWidth={1.5} />
                  <span>Cercle</span>
                </div>
              </div>
              <div className="sidebar-section-title">Emblèmes</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '20px' }}>
                {EMBLEMS.map(sym => (
                  <div key={sym.id} className="palette-item" draggable onDragStart={e => handlePaletteDragStart(e, sym)} title={sym.description}>
                    <img src={sym.image} alt={sym.name} style={{ width: 38, height: 38, objectFit: 'contain', pointerEvents: 'none', filter: 'brightness(0) invert(0.8)' }} />
                    <span>{sym.name}</span>
                  </div>
                ))}
              </div>
              <div className="sidebar-section-title">Flèches & Modificateurs</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                {ARROWS.map(sym => (
                  <div key={sym.id} className="palette-item" draggable onDragStart={e => handlePaletteDragStart(e, sym)} title={sym.description}>
                    <img src={sym.image} alt={sym.name} style={{ width: 38, height: 38, objectFit: 'contain', pointerEvents: 'none', filter: 'brightness(0) invert(0.8)' }} />
                    <span>{sym.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="sidebar-section-title">Sorts officiels du manga</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.6 }}>
                Cliquer sur un sort pour l'importer au centre de votre vue.
              </p>
              {SPELLS.map(spell => (
                <div key={spell.id} className="spell-card" onClick={() => loadSpell(spell.id)}>
                  <div className="spell-card-title">{spell.name}</div>
                  <div className="spell-card-desc">{spell.description}</div>
                  <div className="spell-card-tags">
                    {spell.emblems.map(e => <span key={e} className="spell-tag">⬡ {e}</span>)}
                    {spell.arrows.map(a => (
                      <span key={a} className="spell-tag" style={{ background: 'rgba(180,120,90,0.1)', borderColor: 'rgba(180,120,90,0.25)', color: 'rgba(200,151,90,0.8)' }}>→ {a}</span>
                    ))}
                    {spell.emblems.length === 0 && spell.arrows.length === 0 && (
                      <span className="spell-tag" style={{ opacity: 0.5 }}>Pentacle non documenté</span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </aside>
    </>
  );
};
