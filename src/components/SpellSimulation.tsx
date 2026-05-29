import { useState, useEffect, useRef } from 'react';
import './SpellSimulation.css';
import { SpellEffectRenderer } from '../simulation/renderer/SpellEffectRenderer';
import { compileSpell, type SpellIR } from '../simulation/compiler/compiler';

interface SpellSimulationProps {
  lang: 'fr' | 'en';
  pentacleImage?: string | null;
  placedSymbols?: any[];
}

const DEFAULT_CONFIG = {
  renderer: {
    inkColor: "#241b16",
    guideColor: "rgba(92, 74, 54, 0.28)",
    particleBaseCount: 250, // Increased for 3D realism
    particleCap: 700,       // Increased for 3D realism
    effectSize: {
      baseScale: 1.4,       // Slightly larger for depth
      sigilSizeInfluence: 2.1,
      minScale: 1,
      maxScale: 2.5
    }
  }
};

export function SpellSimulation({ lang, pentacleImage, placedSymbols }: SpellSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);
  const [spellIR, setSpellIR] = useState<SpellIR | null>(null);

  // 3D rotation state
  const [rotation, setRotation] = useState({ x: 60, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize renderer
    if (!rendererRef.current) {
      rendererRef.current = new SpellEffectRenderer(canvasRef.current, DEFAULT_CONFIG);
    }

    const ir = compileSpell(placedSymbols || []);
    setSpellIR(ir);

    let animationFrameId: number;

    const renderLoop = (time: number) => {
      if (rendererRef.current && canvasRef.current) {
        // Mock ring to match the center of the canvas
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const ring = {
          found: true,
          center: { x: width / 2, y: height / 2 },
          radius: Math.min(width, height) * 0.35, // Slightly larger radius for effects
          rotationX: rotation.x,
          rotationZ: rotation.y
        };

        rendererRef.current.render(ir, ring, time, { showGuides: false });
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [placedSymbols]);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const wrapper = canvasRef.current.closest('.sim-3d-wrapper');
        if (wrapper) {
          canvasRef.current.width = wrapper.clientWidth;
          canvasRef.current.height = wrapper.clientHeight;
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: Math.max(0, Math.min(85, prev.x - deltaY * 0.5)), // Clamp tilt between 0 and 85 degrees
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const elementNames = {
    fire: lang === 'fr' ? 'Feu' : 'Fire',
    water: lang === 'fr' ? 'Eau/Glace' : 'Water/Ice',
    wind: lang === 'fr' ? 'Vent/Gaz' : 'Wind/Gas',
    earth: lang === 'fr' ? 'Terre' : 'Earth',
    light: lang === 'fr' ? 'Lumière' : 'Light'
  };

  const currentElement = spellIR?.element ? elementNames[spellIR.element] : (lang === 'fr' ? 'Inconnu' : 'Unknown');

  return (
    <div className="simulation-container">
      <div className="sim-text-panel glass-panel" style={{ zIndex: 10 }}>
        <h2 className="magic-font" style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
          {lang === 'fr' ? 'Simulation Magique' : 'Magic Simulation'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          {lang === 'fr' ? 
            'Le pentacle est activé. Les particules réagissent aux emblèmes et modificateurs tracés.' : 
            'The pentacle is activated. Particles react to the drawn emblems and modifiers.'}
        </p>
        
        <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>
          {lang === 'fr' ? 'Détails du Sort' : 'Spell Details'}
        </h3>
        <ul className="components-list">
          <li>
            <span className="spell-tag">{currentElement}</span> 
            {lang === 'fr' ? ' Élément principal' : ' Main element'}
          </li>
          {spellIR && Object.keys(spellIR.manifestations).map(key => {
            if (key === 'aura') return null;
            return (
              <li key={key}>
                <span className="spell-tag">{key}</span> 
                {lang === 'fr' ? ' Modificateur actif' : ' Active modifier'}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Rendu principal interactif 3D */}
      <div 
        className="sim-3d-wrapper" 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="sim-3d-plane"
          style={{ transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.y}deg)` }}
        >
          {pentacleImage && (
            <img 
              src={pentacleImage} 
              alt="Pentacle" 
              className="sim-3d-pentacle-img"
            />
          )}
        </div>
        <canvas 
          ref={canvasRef} 
          className="sim-3d-canvas"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }}
        />
        
        {/* Helper text */}
        <div style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none', fontSize: '0.9rem', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '20px' }}>
          {lang === 'fr' ? 'Cliquez et glissez pour tourner' : 'Click and drag to rotate'}
        </div>
      </div>
    </div>
  );
}
