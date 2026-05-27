import { FreeCanvas } from './components/FreeCanvas';
import './index.css';

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '2px' }}>
            Générateur de Pentacles
          </div>
          <h1 className="magic-font" style={{ fontSize: '1.5rem', color: 'var(--text-main)', lineHeight: 1 }}>
            L'Atelier des Sorciers
          </h1>
        </div>
      </header>

      <div className="app-body">
        <FreeCanvas />
      </div>
    </div>
  );
}

export default App;
