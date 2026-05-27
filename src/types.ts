export type ElementType = 'eau' | 'feu' | 'vent' | 'lévitation' | 'terre' | 'lumière' | 'glace' | 'gaz' | 'inconnu';

export type ArrowType = 
  | 'aucune'
  | 'convergence' 
  | 'dispersion' 
  | 'colonne' 
  | 'répétition' 
  | 'suspension'
  | 'agrandissement'
  | 'réduction';

export interface PlacedArrow {
  type: string;
  angle: number; // e.g. 0, 45, 90
  radius?: number; // optional custom radius, defaults to standard
  scale?: number; // optional custom scale
}

export interface PentacleConfig {
  element: ElementType;
  // We keep `arrow` for backward compatibility in the designer, 
  // but `arrows` array takes precedence if populated
  arrow: ArrowType;
  arrows?: PlacedArrow[];
  symbols?: { type: string; angle: number; radius: number; scale?: number }[];
  subCircles?: { angle: number; radius: number; size: number; strokeWidth?: number }[];
  centerShape?: 'circle' | 'star';
}
