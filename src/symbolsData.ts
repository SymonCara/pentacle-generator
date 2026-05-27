export interface SymbolDef {
  id: string;
  name: string;
  category: 'emblem' | 'arrow';
  image: string;
  description: string;
}

export const EMBLEMS: SymbolDef[] = [
  { id: 'eau',        name: 'Eau',        category: 'emblem', image: '/symbols/emblems/eau.png',        description: 'Hydrate et régule la source de la vie.' },
  { id: 'feu',        name: 'Feu',        category: 'emblem', image: '/symbols/emblems/feu.png',        description: "Devenu l'arme et la défense des hommes." },
  { id: 'vent',       name: 'Vent',       category: 'emblem', image: '/symbols/emblems/vent.png',       description: 'Permet de voyager sans s\'user les pieds. Emblème de la suspension.' },
  { id: 'levitation', name: 'Lévitation', category: 'emblem', image: '/symbols/emblems/levitation.png', description: 'Utilisé sous les souliers des sorciers pour voler.' },
  { id: 'terre',      name: 'Terre',      category: 'emblem', image: '/symbols/emblems/terre.png',      description: 'Change la roche en sable et inversement. Emblème de la force.' },
  { id: 'lumiere',    name: 'Lumière',    category: 'emblem', image: '/symbols/emblems/lumiere.png',    description: 'Application plus précise du feu.' },
  { id: 'glace',      name: 'Glace',      category: 'emblem', image: '/symbols/emblems/glace.png',      description: 'Emblème de la glace.' },
  { id: 'gaz',        name: 'Gaz',        category: 'emblem', image: '/symbols/emblems/gaz.png',        description: 'Symbole qui permet de générer de l\'air.' },
];

export const ARROWS: SymbolDef[] = [
  { id: 'suspension',    name: 'Suspension',       category: 'arrow', image: '/symbols/arrows/suspension.png',    description: "Fait flotter l'effet du sort au-dessus du glyphe." },
  { id: 'colonne',       name: 'Colonne',          category: 'arrow', image: '/symbols/arrows/colonne.png',       description: "Zone d'influence en colonne verticale." },
  { id: 'convergence',   name: 'Convergence',      category: 'arrow', image: '/symbols/arrows/convergence.png',   description: "Concentre l'effet vers le centre." },
  { id: 'desagregation', name: 'Désagrégation',    category: 'arrow', image: '/symbols/arrows/desagregation.png', description: "Désintègre le matériau sur lequel le sort est placé." },
  { id: 'repetition',    name: 'Répétition',       category: 'arrow', image: '/symbols/arrows/repetition.png',    description: "Rafraîchit continuellement l'objet enchanté." },
  { id: 'dissipation',   name: 'Dissipation',      category: 'arrow', image: '/symbols/arrows/dissipation.png',   description: "Effet encore inconnu." },
  { id: 'dispersion',    name: 'Dispersion',       category: 'arrow', image: '/symbols/arrows/dispersion.png',    description: "Fait émaner l'effet du sort." },
  { id: 'direction',     name: 'Direction',         category: 'arrow', image: '/symbols/arrows/direction.png',     description: "Influence la direction de l'effet." },
  { id: 'taille',        name: 'Taille',           category: 'arrow', image: '/symbols/arrows/taille.png',        description: "Change la taille de ce sur quoi le sort est placé." },
  { id: 'rayonnement',   name: 'Rayonnement',      category: 'arrow', image: '/symbols/arrows/rayonnement.png',   description: "Semble adoucir l'effet du sort." },
  { id: 'vision',        name: 'Vision',           category: 'arrow', image: '/symbols/arrows/vision.png',        description: "Lien avec la vue et les illusions d'optique." },
  { id: 'oiseau',        name: 'Oiseau',           category: 'arrow', image: '/symbols/arrows/oiseau.png',        description: "Signal en forme d'oiseau lumineux." },
  { id: 'traction',      name: 'Traction',         category: 'arrow', image: '/symbols/arrows/traction.png',      description: "Tire des objets dans la direction pointée." },
  { id: 'collecte',      name: 'Collecte',         category: 'arrow', image: '/symbols/arrows/collecte.png',      description: "Collecte les matériaux autour du sort." },
  { id: 'pluie',         name: 'Pluie',            category: 'arrow', image: '/symbols/arrows/pluie.png',         description: "Fait pleuvoir la magie dans le rayon d'effet." },
  { id: 'tissage',       name: 'Tissage',          category: 'arrow', image: '/symbols/arrows/tissage.png',       description: "Transforme l'objet en ruban souple." },
  { id: 'nuage',         name: 'Nuage',            category: 'arrow', image: '/symbols/arrows/nuage.png',         description: "Semble transformer en nuages doux." },
  { id: 'bolt',          name: 'Projectile',       category: 'arrow', image: '/symbols/arrows/bolt.png',          description: "Manifeste le sort sous forme de projectiles." },
  { id: 'oeil',          name: 'Œil',              category: 'arrow', image: '/symbols/arrows/oeil.png',          description: "Vu sur les capes magiques. Effet inconnu." },
  { id: 'diamant',       name: 'Diamant',          category: 'arrow', image: '/symbols/arrows/diamant.png',       description: "Effet encore inconnu." },
  { id: 'flottement',    name: 'Flottement',       category: 'arrow', image: '/symbols/arrows/flottement.png',    description: "Variante ancienne de la suspension." },
  { id: 'pantin',        name: 'Pantin',           category: 'arrow', image: '/symbols/arrows/pantin.png',        description: "Partie du pantin-leurre volant." },
  { id: 'courbure',      name: 'Courbure',         category: 'arrow', image: '/symbols/arrows/courbure.png',      description: "Vu sur les capes magiques. Effet inconnu." },
  { id: 'fenetre',       name: 'Fenêtre',          category: 'arrow', image: '/symbols/arrows/fenetre.png',       description: "Effet encore inconnu." },
];

export const ALL_SYMBOLS = [...EMBLEMS, ...ARROWS];
