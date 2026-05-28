export interface CustomSymbolPlacement {
  symbolId: string;
  xOffset: number; // décalage par rapport au centre
  yOffset: number;
  rotation: number;
  scale: number;
  flipX?: boolean;
  flipY?: boolean;
}

export interface SpellDef {
  id: string;
  name: string;
  description: string;
  emblems: string[];     // emblem ids at center
  arrows: string[];      // ordered list of arrow ids around the circle (one pass)
  arrowReps: number;     // how many times to repeat the arrows array around the circle
  arrowConfig?: 'alternate' | 'outward' | 'inward' | 'tangent';
  customLayout?: CustomSymbolPlacement[]; // Pour les placements spécifiques hors motif circulaire
  circleCount?: number;  // number of concentric circles (default 1)
  wikiUrl?: string;
}

// Sorts officiels de L'Atelier des Sorciers
// source : latelier-des-sorciers.fandom.com/fr/wiki/Catégorie:Sorts
export const SPELLS: SpellDef[] = [
  // ─── 2 types de flèches alternées (le plus courant) ──────────────────────
  {
    id: 'chaussures_volantes',
    name: 'Chaussures Volantes',
    description: 'Sort gravé sous les semelles permettant de léviter et de voler. Emblème de vent spécial, entouré d\'un cercle de flèches colonne et convergence alternées.',
    emblems: ['vent'],
    arrows: ['colonne', 'convergence'],
    arrowReps: 8,  // ~16 flèches au total comme sur le wiki
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Chaussures_volantes_(sort)',
  },
  {
    id: 'bouclier_vent',
    name: 'Bouclier de Vent',
    description: 'Crée une barrière de vent circulaire autour d\'une cible pour l\'immobiliser. Inventé par Alyra. Utilisé par Tetia pour immobiliser Yinny sous sa forme de loup.',
    emblems: ['vent'],
    arrows: ['convergence', 'colonne'],
    arrowReps: 6,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Bouclier_de_vent',
  },
  {
    id: 'lampe_flottante',
    name: 'Lampe Flottante',
    description: 'Génère une source de lumière magique flottante. Composé d\'un emblème de lumière central entouré de quatre flèches colonne et quatre flèches flottantes alternées.',
    emblems: ['lumiere'],
    arrows: ['colonne', 'flottement'],
    arrowReps: 4,  // 4×2 = 8 flèches (4 colonne + 4 flottement)
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Lampe_flottante',
  },
  {
    id: 'feu_de_camp',
    name: 'Feu de Camp',
    description: 'Crée une boule de feu en lévitation faisant aussi léviter les objets proches. Feu central entouré de flèches de flottement.',
    emblems: ['feu'],
    arrows: ['flottement'],
    arrowReps: 8,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Feu_de_camp_(Cercle_du)',
  },
  {
    id: 'cercle_pluie',
    name: 'Cercle de Pluie',
    description: 'Sort conçu pour générer de la pluie. Composé d\'un emblème d\'eau central entouré d\'un signe de pluie. Mentionné au chapitre 28.',
    emblems: ['eau'],
    arrows: ['pluie'],
    arrowReps: 8,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Cercle_de_pluie',
  },
  {
    id: 'signal_oiseau',
    name: 'Signal : Oiseau Lumineux',
    description: 'Matérialise un oiseau fait de lumière. Un emblème de lumière, une flèche de dispersion et trois flèches oiseau. Utilisé par Agathe pour appeler à l\'aide.',
    emblems: ['lumiere'],
    arrows: ['dispersion', 'oiseau', 'oiseau', 'oiseau'],
    arrowReps: 1,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Signal_en_forme_d%27oiseau_lumineux',
  },
  {
    id: 'desagregation',
    name: 'Désagrégation',
    description: 'Désintègre le matériau sur lequel il est placé. Utilisé par Coco lors du sauvetage de Kustas : transforme la terre en sable, l\'eau en vapeur.',
    emblems: ['terre'],
    arrows: ['desagregation', 'colonne'],
    arrowReps: 4,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Désagrégation',
  },
  {
    id: 'cercle_repetition',
    name: 'Cercle de Répétition',
    description: 'Ramène l\'objet à sa forme ou état original. Utilisé pour restaurer des objets ou maintenir une forme constante.',
    emblems: [],
    arrows: ['repetition'],
    arrowReps: 8,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Cercle_de_répétition',
  },
  {
    id: 'dague_eau',
    name: 'Dague d\'Eau',
    description: 'Sort de combat créant une courte lame d\'eau. Ce sort a un agencement spécifique : une flèche de dispersion canalise l\'eau, entourée de signes colonne et de symboles mystérieux.',
    emblems: ['eau'],
    arrows: [], // Pas de flèches sur le bord
    arrowReps: 0,
    customLayout: [
      // Flèches colonne formant un motif en haut
      { symbolId: 'colonne', xOffset: -45, yOffset: -85, rotation: 90, scale: 0.9 }, // pointe droite
      { symbolId: 'colonne', xOffset: 45, yOffset: -85, rotation: 270, scale: 0.9 }, // pointe gauche
      // Flèche dispersion au centre-haut
      { symbolId: 'dispersion', xOffset: 0, yOffset: -100, rotation: 0, scale: 2.2 },
      // Signes inconnus (courbes) encadrant l'emblème d'eau
      { symbolId: 'inconnu_courbe', xOffset: -80, yOffset: 15, rotation: 0, scale: 2.5 },
      { symbolId: 'inconnu_courbe', xOffset: 80, yOffset: 15, rotation: 0, scale: 2.5, flipX: true }, // symétrique avec miroir H
      // Signe triangle tout en bas
      { symbolId: 'inconnu_triangle', xOffset: 0, yOffset: 160, rotation: 0, scale: 3.5 },
    ],
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Dague_d%27eau',
  },
  {
    id: 'dissimulation',
    name: 'Dissimulation',
    description: 'Sort complexe de Sasaran. Fusion de trois sorts : rassemblement d\'ombre, pantin-leurre volant et fenêtre-portail. Deux anneaux concentriques.',
    emblems: ['vent'],
    arrows: ['vision', 'pantin', 'fenetre'],
    arrowReps: 3,
    arrowConfig: 'alternate',
    circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Dissimulation',
  },
  {
    id: 'eloignement_betes',
    name: 'Éloignement des Bêtes Sauvages',
    description: 'Sort mixte repoussant les animaux sauvages. Emblèmes de lumière avec flèches colonne et dissipation.',
    emblems: ['lumiere'],
    arrows: ['colonne', 'dissipation'],
    arrowReps: 4,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Éloignement_des_bêtes_sauvages',
  },
  {
    id: 'fenetre_portail',
    name: 'Fenêtre-Portail',
    description: 'Crée une ouverture ronde téléportant ce qui la traverse. Deux anneaux concentriques : extérieur en zigzags, intérieur en flèches simples.',
    emblems: [],
    arrows: ['fenetre'],
    arrowReps: 12,
    arrowConfig: 'alternate',
    circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Fenêtre-portail_(sort)',
  },
  {
    id: 'nuage_moelleux',
    name: 'Nuage Moelleux',
    description: 'Génère une substance rappelant un nuage chaud et doux. Souvent entouré d\'un cercle de répétition pour maintenir sa forme. Inventé par Tetia.',
    emblems: [],
    arrows: ['nuage', 'repetition'],
    arrowReps: 4,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Nuage_moelleux',
  },
  {
    id: 'paillasse_dragon',
    name: 'Paillasse du Dragon',
    description: 'Créé par les quatre apprenties pour endormir le dragon du labyrinthe. Sort très complexe à multiples anneaux. Flèches répétition + direction en anneau externe, nuage + collecte au centre.',
    emblems: ['terre'],
    arrows: ['repetition', 'direction', 'colonne', 'desagregation', 'nuage', 'collecte'],
    arrowReps: 2,
    arrowConfig: 'alternate',
    circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Paillasse_du_Dragon',
  },
  {
    id: 'pantin_leurre',
    name: 'Pantin-Leurre Volant',
    description: 'Fait voler l\'objet auquel le sort est appliqué de manière autonome comme un pantin. Mentionné dans le tome 2.',
    emblems: [],
    arrows: ['pantin', 'oiseau'],
    arrowReps: 4,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Pantin-leurre_volant',
  },
  {
    id: 'portail_egouts',
    name: 'Portail des Égouts',
    description: 'Filtre l\'eau des égouts. Pentacle central entouré de quatre grands pentacles latéraux avec emblème Eau et flèches dispersion.',
    emblems: ['eau'],
    arrows: ['dispersion'],
    arrowReps: 4,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Portail_des_égouts',
  },
  {
    id: 'retrecissement',
    name: 'Rétrécissement',
    description: 'Rétrécit l\'objet ou la cible. Quatre flèches de taille en croix. Vu dans le tome 10.',
    emblems: [],
    arrows: ['taille'],
    arrowReps: 4,
    arrowConfig: 'inward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Rétrécissement',
  },
  {
    id: 'rubans_cristal',
    name: 'Rubans de Cristal',
    description: 'Sort de Trice générant un long ruban souple de cristal. Utilise les flèches tissage et pluie.',
    emblems: [],
    arrows: ['tissage', 'pluie'],
    arrowReps: 4,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Rubans_de_Cristal',
  },
  {
    id: 'carrosse_aile',
    name: 'Carrosse Ailé',
    description: 'Sort permettant de maintenir en vol un carrosse. C\'est en observant Kieffrey retracer ce pentacle que Coco apprend ses premiers sorts.',
    emblems: ['vent'],
    arrows: ['colonne'],
    arrowReps: 8,
    arrowConfig: 'alternate',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Carrosse_ailé_(sort)',
  },
  {
    id: 'boule_feu_illusoire',
    name: 'Boule de Feu Illusoire',
    description: 'Conjure une boule de feu froide sans chaleur. Créé par Olugio, jugé trop dangereux à commercialiser. Tome 8.',
    emblems: ['feu'],
    arrows: ['dispersion'],
    arrowReps: 6,
    arrowConfig: 'outward',
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Boule_de_feu_illusoire',
  },
];
