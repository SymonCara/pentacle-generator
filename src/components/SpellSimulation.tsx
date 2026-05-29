import { useState, useEffect } from 'react';
import './SpellSimulation.css';

interface SpellSimulationProps {
  lang: 'fr' | 'en';
  pentacleImage?: string | null;
}

export function SpellSimulation({ lang, pentacleImage }: SpellSimulationProps) {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Sequence the animation stages
    const timer1 = setTimeout(() => setStage(1), 1000); // Draw circle
    const timer2 = setTimeout(() => setStage(2), 3000); // Activation glow
    const timer3 = setTimeout(() => setStage(3), 5000); // Crystal growth
    const timer4 = setTimeout(() => setStage(4), 8000); // Full petrification

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const replay = () => {
    setStage(0);
    setTimeout(() => setStage(1), 100);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => setStage(3), 4000);
    setTimeout(() => setStage(4), 7000);
  };

  const textFr = {
    title: "Simulation : Sort de Pétrification (Cristallisation)",
    desc: "Ce sortilège interdit a été vu dans L'Atelier des Sorciers, déclenché par erreur par Coco. Il emprisonne tout ce qu'il touche dans un cristal impénétrable.",
    components: "Composants du Pentacle :",
    comp1: "Terre/Roche : L'élément central qui génère le cristal.",
    comp2: "Temps : Fige la cible, arrêtant le temps à l'intérieur du cristal.",
    comp3: "Expansion : Ordonne au cristal de grandir continuellement.",
    comp4: "Sphère : Définit la zone d'effet en forme de dôme croissant.",
    log0: "En attente...",
    log1: "Tracé du pentacle avec l'encre magique...",
    log2: "Activation de la magie : connexion des signes...",
    log3: "Génération de la matière : le cristal émerge...",
    log4: "Pétrification terminée. Zone figée dans le temps."
  };

  const textEn = {
    title: "Simulation: Petrification (Crystallization) Spell",
    desc: "This forbidden spell was seen in Witch Hat Atelier, accidentally triggered by Coco. It encases anything it touches in impenetrable crystal.",
    components: "Pentacle Components:",
    comp1: "Earth/Rock: The core element generating the crystal.",
    comp2: "Time: Freezes the target, stopping time within the crystal.",
    comp3: "Expansion: Commands the crystal to grow continuously.",
    comp4: "Sphere: Defines the area of effect as a growing dome.",
    log0: "Waiting...",
    log1: "Drawing the pentacle with magical ink...",
    log2: "Magic activation: connecting the signs...",
    log3: "Matter generation: crystal emerging...",
    log4: "Petrification complete. Area frozen in time."
  };

  const t = lang === 'fr' ? textFr : textEn;

  return (
    <div className="simulation-container">
      <div className="sim-text-panel glass-panel">
        <h2 className="magic-font" style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
          {t.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          {t.desc}
        </p>
        
        <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>{t.components}</h3>
        <ul className="components-list">
          <li><span className="spell-tag">Terre</span> {t.comp1}</li>
          <li><span className="spell-tag">Temps</span> {t.comp2}</li>
          <li><span className="spell-tag">Expansion</span> {t.comp3}</li>
          <li><span className="spell-tag">Sphère</span> {t.comp4}</li>
        </ul>

        <div className="sim-log-box">
          <div className={`log-entry ${stage >= 0 ? 'active' : ''}`}>{t.log0}</div>
          <div className={`log-entry ${stage >= 1 ? 'active' : ''}`}>{t.log1}</div>
          <div className={`log-entry ${stage >= 2 ? 'active' : ''}`}>{t.log2}</div>
          <div className={`log-entry ${stage >= 3 ? 'active' : ''}`}>{t.log3}</div>
          <div className={`log-entry ${stage >= 4 ? 'active' : ''}`}>{t.log4}</div>
        </div>

        <button className="primary" onClick={replay} style={{ marginTop: '20px', width: '100%' }}>
          {lang === 'fr' ? 'Relancer la simulation' : 'Replay simulation'}
        </button>
      </div>

      <div className="sim-3d-panel">
        <div className="scene-3d">
          <div className="camera">
            <div className={`ground-plane stage-${stage}`}>
              <div className="pentacle-base">
                {pentacleImage ? (
                  <img src={pentacleImage} alt="Custom Pentacle" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <>
                    <div className="pentacle-ring outer"></div>
                    <div className="pentacle-ring inner"></div>
                    <div className="pentacle-star"></div>
                    <div className="pentacle-symbols"></div>
                  </>
                )}
              </div>
              
              <div className={`crystal-dome stage-${stage}`}>
                <div className="crystal-face face-1"></div>
                <div className="crystal-face face-2"></div>
                <div className="crystal-face face-3"></div>
                <div className="crystal-face face-4"></div>
                <div className="crystal-face face-5"></div>
                <div className="crystal-face face-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
