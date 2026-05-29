// Types are assumed any for now

export interface SpellIR {
  active: boolean;
  valid: boolean;
  prepared: boolean;
  element: "fire" | "water" | "wind" | "earth" | "light" | null;
  duration: number;
  activatedAt: number;
  effectScale: number;
  force: number;
  spread: number;
  focus: number;
  gravity: number;
  stability: number;
  signature: string;
  direction: { x: number; y: number; z: number };
  manifestations: Record<string, any>;
  emission?: number;
}

export function compileSpell(placedSymbols: any[]): SpellIR {
  const emblems = placedSymbols.filter(s => !s.isCircle && ["eau", "feu", "vent", "levitation", "terre", "lumiere", "glace", "gaz"].includes(s.symbolId));
  
  // Find primary element
  let element: SpellIR["element"] = null;
  const primaryEmblem = emblems.length > 0 ? emblems[0].symbolId : null;
  
  if (primaryEmblem === "feu") element = "fire";
  else if (primaryEmblem === "eau" || primaryEmblem === "glace") element = "water";
  else if (primaryEmblem === "vent" || primaryEmblem === "gaz") element = "wind";
  else if (primaryEmblem === "terre") element = "earth";
  else if (primaryEmblem === "lumiere") element = "light";
  
  const isValid = element !== null;

  let effectScale = 1.0;
  let force = 0.5;
  let spread = 0.2;
  let focus = 0.5;
  let gravity = 1.0;
  let duration = 10.0;
  const manifestations: Record<string, any> = {};

  // Default manifestation based on elements (so they do something)
  manifestations["aura"] = { strength: 1.0 };

  // Analyze modifiers
  for (const sym of placedSymbols) {
    if (sym.symbolId === "colonne") {
      manifestations["column"] = { strength: 0.8 };
    }
    if (sym.symbolId === "convergence") {
      manifestations["convergence"] = { 
        strength: 0.8, 
        point: { x: 0, y: 0 }, 
        radius: 0.15, 
        rigidity: 0.8 
      };
    }
    if (sym.symbolId === "suspension" || sym.symbolId === "levitation" || sym.symbolId === "flottement") {
      gravity = 0.1;
      manifestations["levitation"] = { strength: 0.9 };
    }
    if (sym.symbolId === "dispersion" || sym.symbolId === "rayonnement") {
      spread += 0.4;
      focus -= 0.2;
    }
    if (sym.symbolId === "taille") {
      effectScale += 0.5;
    }
    if (sym.symbolId === "traction" || sym.symbolId === "collecte") {
      force += 0.3;
    }
  }

  const signature = `${element}-${effectScale}-${force}-${spread}-${gravity}-${Object.keys(manifestations).join(',')}`;

  return {
    active: isValid,
    valid: isValid,
    prepared: false,
    element,
    duration,
    activatedAt: performance.now(),
    effectScale,
    force,
    spread,
    focus,
    gravity,
    stability: 0.8,
    signature,
    direction: { x: 0, y: -0.5, z: 0.8 }, // Default angle leaning slightly back
    manifestations
  };
}
