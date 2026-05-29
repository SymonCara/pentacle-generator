import { useState, useRef } from 'react';
import { FreeCanvas } from './components/FreeCanvas';
import type { FreeCanvasRef } from './components/FreeCanvas';
import { SpellSimulation } from './components/SpellSimulation';
import './index.css';

function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [view, setView] = useState<'canvas' | 'simulation'>('canvas');
  const [pentacleImage, setPentacleImage] = useState<string | null>(null);
  const canvasRef = useRef<FreeCanvasRef>(null);

  const handleToggleView = async () => {
    if (view === 'canvas') {
      if (canvasRef.current) {
        const dataUrl = await canvasRef.current.exportDataUrl(true);
        setPentacleImage(dataUrl);
      }
      setView('simulation');
    } else {
      setView('canvas');
    }
  };

  return (
    <div className="app-layout">
      <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '2px' }}>
            {lang === 'fr' ? 'Générateur de Pentacles' : 'Pentacle Generator'}
          </div>
          <h1 className="magic-font" style={{ fontSize: '1.5rem', color: 'var(--text-main)', lineHeight: 1 }}>
            {lang === 'fr' ? "L'Atelier des Sorciers" : 'Witch Hat Atelier'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleToggleView}
            className={view === 'simulation' ? 'primary' : ''}
            style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            {view === 'canvas' ? (lang === 'fr' ? 'Voir Simulation' : 'View Simulation') : (lang === 'fr' ? 'Retour au Générateur' : 'Back to Generator')}
          </button>
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </header>

      <div className="app-body">
        <div style={{ display: view === 'canvas' ? 'block' : 'none', height: '100%', width: '100%' }}>
          <FreeCanvas lang={lang} ref={canvasRef} />
        </div>
        {view === 'simulation' && (
          <div style={{ height: '100%', width: '100%' }}>
            <SpellSimulation lang={lang} pentacleImage={pentacleImage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
