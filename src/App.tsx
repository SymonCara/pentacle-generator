import { useState } from 'react';
import { FreeCanvas } from './components/FreeCanvas';
import './index.css';

function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

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
        <div>
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </header>

      <div className="app-body">
        <FreeCanvas lang={lang} />
      </div>
    </div>
  );
}

export default App;
