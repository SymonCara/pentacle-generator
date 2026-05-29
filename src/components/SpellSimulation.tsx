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
    particleBaseCount: 130,
    particleCap: 360,
    effectSize: {
      baseScale: 1.28,
      sigilSizeInfluence: 2.1,
      minScale: 1,
      maxScale: 2.35
    }
  }
};

export function SpellSimulation({ lang, pentacleImage, placedSymbols }: SpellSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);
  const [spellIR, setSpellIR] = useState<SpellIR | null>(null);

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
          radius: Math.min(width, height) * 0.35 // Slightly larger radius for effects
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
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth;
          canvasRef.current.height = parent.clientHeight;
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      {/* Rendu principal avec le canvas par-dessus l'image du pentacle */}
      <div className="sim-canvas-panel" style={{ position: 'relative', flex: 1, height: '100%', overflow: 'hidden' }}>
        {pentacleImage && (
          <img 
            src={pentacleImage} 
            alt="Pentacle" 
            style={{ 
              position: 'absolute', 
              top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '80%', height: '80%', 
              objectFit: 'contain',
              opacity: 0.5,
              pointerEvents: 'none'
            }} 
          />
        )}
        <canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
