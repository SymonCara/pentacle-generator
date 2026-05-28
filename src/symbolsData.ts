export interface SymbolDef {
  id: string;
  name: string;
  nameEn: string;
  category: 'emblem' | 'arrow';
  image: string;
  description: string;
  descriptionEn: string;
}

export const EMBLEMS: SymbolDef[] = [
  { id: 'eau',        name: 'Eau',        nameEn: 'Water',       category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/eau.png',        description: 'Hydrate et régule la source de la vie.', descriptionEn: 'Hydrates and regulates the source of life.' },
  { id: 'feu',        name: 'Feu',        nameEn: 'Fire',        category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/feu.png',        description: "Devenu l'arme et la défense des hommes.", descriptionEn: 'Became the weapon and defense of mankind.' },
  { id: 'vent',       name: 'Vent',       nameEn: 'Wind',        category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/vent.png',       description: 'Permet de voyager sans s\'user les pieds. Emblème de la suspension.', descriptionEn: 'Allows traveling without wearing out feet. Emblem of suspension.' },
  { id: 'levitation', name: 'Lévitation', nameEn: 'Levitation',  category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/levitation.png', description: 'Utilisé sous les souliers des sorciers pour voler.', descriptionEn: 'Used under witches\' shoes to fly.' },
  { id: 'terre',      name: 'Terre',      nameEn: 'Earth',       category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/terre.png',      description: 'Change la roche en sable et inversement. Emblème de la force.', descriptionEn: 'Changes rock to sand and vice versa. Emblem of strength.' },
  { id: 'lumiere',    name: 'Lumière',    nameEn: 'Light',       category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/lumiere.png',    description: 'Application plus précise du feu.', descriptionEn: 'More precise application of fire.' },
  { id: 'glace',      name: 'Glace',      nameEn: 'Ice',         category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/glace.png',      description: 'Emblème de la glace.', descriptionEn: 'Emblem of ice.' },
  { id: 'gaz',        name: 'Gaz',        nameEn: 'Gas',         category: 'emblem', image: import.meta.env.BASE_URL + 'symbols/emblems/gaz.png',        description: 'Symbole qui permet de générer de l\'air.', descriptionEn: 'Symbol that generates air/gas.' },
];

export const ARROWS: SymbolDef[] = [
  { id: 'suspension',    name: 'Suspension',       nameEn: 'Suspension',       category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/suspension.png',    description: "Fait flotter l'effet du sort au-dessus du glyphe.", descriptionEn: "Makes the spell's effect float above the glyph." },
  { id: 'colonne',       name: 'Colonne',          nameEn: 'Column',           category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/colonne.png',       description: "Zone d'influence en colonne verticale.", descriptionEn: "Vertical column area of effect." },
  { id: 'convergence',   name: 'Convergence',      nameEn: 'Convergence',      category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/convergence.png',   description: "Concentre l'effet vers le centre.", descriptionEn: "Concentrates the effect towards the center." },
  { id: 'desagregation', name: 'Désagrégation',    nameEn: 'Disintegration',   category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/desagregation.png', description: "Désintègre le matériau sur lequel le sort est placé.", descriptionEn: "Disintegrates the material the spell is placed on." },
  { id: 'repetition',    name: 'Répétition',       nameEn: 'Repetition',       category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/repetition.png',    description: "Rafraîchit continuellement l'objet enchanté.", descriptionEn: "Continually refreshes the enchanted object." },
  { id: 'dissipation',   name: 'Dissipation',      nameEn: 'Dissipation',      category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/dissipation.png',   description: "Effet encore inconnu.", descriptionEn: "Effect still unknown." },
  { id: 'dispersion',    name: 'Dispersion',       nameEn: 'Dispersion',       category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/dispersion.png',    description: "Fait émaner l'effet du sort.", descriptionEn: "Emanates the spell's effect outward." },
  { id: 'direction',     name: 'Direction',        nameEn: 'Direction',        category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/direction.png',     description: "Influence la direction de l'effet.", descriptionEn: "Influences the direction of the effect." },
  { id: 'taille',        name: 'Taille',           nameEn: 'Size',             category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/taille.png',        description: "Change la taille de ce sur quoi le sort est placé.", descriptionEn: "Changes the size of the target." },
  { id: 'rayonnement',   name: 'Rayonnement',      nameEn: 'Radiation',        category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/rayonnement.png',   description: "Semble adoucir l'effet du sort.", descriptionEn: "Seems to soften the spell's effect." },
  { id: 'vision',        name: 'Vision',           nameEn: 'Vision',           category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/vision.png',        description: "Lien avec la vue et les illusions d'optique.", descriptionEn: "Related to sight and optical illusions." },
  { id: 'oiseau',        name: 'Oiseau',           nameEn: 'Bird',             category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/oiseau.png',        description: "Signal en forme d'oiseau lumineux.", descriptionEn: "Luminous bird-shaped signal." },
  { id: 'traction',      name: 'Traction',         nameEn: 'Pulling',          category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/traction.png',      description: "Tire des objets dans la direction pointée.", descriptionEn: "Pulls objects in the pointed direction." },
  { id: 'collecte',      name: 'Collecte',         nameEn: 'Gathering',        category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/collecte.png',      description: "Collecte les matériaux autour du sort.", descriptionEn: "Gathers materials around the spell." },
  { id: 'pluie',         name: 'Pluie',            nameEn: 'Rain',             category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/pluie.png',         description: "Fait pleuvoir la magie dans le rayon d'effet.", descriptionEn: "Makes magic rain down in the area of effect." },
  { id: 'tissage',       name: 'Tissage',          nameEn: 'Weaving',          category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/tissage.png',       description: "Transforme l'objet en ruban souple.", descriptionEn: "Transforms the object into a flexible ribbon." },
  { id: 'nuage',         name: 'Nuage',            nameEn: 'Cloud',            category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/nuage.png',         description: "Semble transformer en nuages doux.", descriptionEn: "Seems to transform into soft clouds." },
  { id: 'bolt',          name: 'Projectile',       nameEn: 'Projectile',       category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/bolt.png',          description: "Manifeste le sort sous forme de projectiles.", descriptionEn: "Manifests the spell as projectiles." },
  { id: 'oeil',          name: 'Œil',              nameEn: 'Eye',              category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/oeil.png',          description: "Vu sur les capes magiques. Effet inconnu.", descriptionEn: "Seen on magical cloaks. Effect unknown." },
  { id: 'diamant',       name: 'Diamant',          nameEn: 'Diamond',          category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/diamant.png',       description: "Effet encore inconnu.", descriptionEn: "Effect still unknown." },
  { id: 'flottement',    name: 'Flottement',       nameEn: 'Floating',         category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/flottement.png',    description: "Variante ancienne de la suspension.", descriptionEn: "Ancient variant of suspension." },
  { id: 'pantin',        name: 'Pantin',           nameEn: 'Puppet',           category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/pantin.png',        description: "Partie du pantin-leurre volant.", descriptionEn: "Part of the flying decoy puppet." },
  { id: 'courbure',      name: 'Courbure',         nameEn: 'Curvature',        category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/courbure.png',      description: "Vu sur les capes magiques. Effet inconnu.", descriptionEn: "Seen on magical cloaks. Effect unknown." },
  { id: 'fenetre',       name: 'Fenêtre',          nameEn: 'Window',           category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/fenetre.png',       description: "Effet encore inconnu.", descriptionEn: "Effect still unknown." },
  { id: 'inconnu_triangle', name: 'Triangle barré', nameEn: 'Crossed Triangle', category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/inconnu_triangle.png', description: "Signe mystérieux en forme de triangle traversé d'un trait.", descriptionEn: "Mysterious sign shaped like a crossed triangle." },
  { id: 'inconnu_courbe', name: 'Courbe inconnue', nameEn: 'Unknown Curve',    category: 'arrow', image: import.meta.env.BASE_URL + 'symbols/arrows/inconnu_courbe.png', description: "Signe inconnu en forme de courbe/crochet.", descriptionEn: "Unknown sign shaped like a curve/hook." },
];

export const ALL_SYMBOLS = [...EMBLEMS, ...ARROWS];
