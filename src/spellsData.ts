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
  nameEn: string;
  description: string;
  descriptionEn: string;
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
    name: 'Chaussures Volantes', nameEn: 'Flying Shoes',
    description: 'Sort gravé sous les semelles permettant de léviter et de voler. Emblème de vent spécial, entouré d\'un cercle de flèches colonne et convergence alternées.',
    descriptionEn: 'Spell engraved under the soles allowing to levitate and fly. Wind emblem surrounded by alternating column and convergence arrows.',
    emblems: ['vent'], arrows: ['colonne', 'convergence'], arrowReps: 8, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Chaussures_volantes_(sort)',
  },
  {
    id: 'bouclier_vent',
    name: 'Bouclier de Vent', nameEn: 'Wind Shield',
    description: 'Crée une barrière de vent circulaire autour d\'une cible pour l\'immobiliser. Inventé par Alyra. Utilisé par Tetia pour immobiliser Yinny sous sa forme de loup.',
    descriptionEn: 'Creates a circular wind barrier around a target to immobilize it. Invented by Alyra. Used by Tetia to immobilize Yinny in wolf form.',
    emblems: ['vent'], arrows: ['convergence', 'colonne'], arrowReps: 6, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Bouclier_de_vent',
  },
  {
    id: 'lampe_flottante',
    name: 'Lampe Flottante', nameEn: 'Floating Lamp',
    description: 'Génère une source de lumière magique flottante. Composé d\'un emblème de lumière central entouré de quatre flèches colonne et quatre flèches flottantes alternées.',
    descriptionEn: 'Generates a floating magical light source. Composed of a central light emblem surrounded by alternating column and floating arrows.',
    emblems: ['lumiere'], arrows: ['colonne', 'flottement'], arrowReps: 4, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Lampe_flottante',
  },
  {
    id: 'feu_de_camp',
    name: 'Feu de Camp', nameEn: 'Campfire',
    description: 'Crée une boule de feu en lévitation faisant aussi léviter les objets proches. Feu central entouré de flèches de flottement.',
    descriptionEn: 'Creates a levitating fireball that also levitates nearby objects. Central fire surrounded by floating arrows.',
    emblems: ['feu'], arrows: ['flottement'], arrowReps: 8, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Feu_de_camp_(Cercle_du)',
  },
  {
    id: 'cercle_pluie',
    name: 'Cercle de Pluie', nameEn: 'Rain Circle',
    description: 'Sort conçu pour générer de la pluie. Composé d\'un emblème d\'eau central entouré d\'un signe de pluie. Mentionné au chapitre 28.',
    descriptionEn: 'Spell designed to generate rain. Composed of a central water emblem surrounded by rain signs. Mentioned in chapter 28.',
    emblems: ['eau'], arrows: ['pluie'], arrowReps: 8, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Cercle_de_pluie',
  },
  {
    id: 'signal_oiseau',
    name: 'Signal : Oiseau Lumineux', nameEn: 'Signal: Luminous Bird',
    description: 'Matérialise un oiseau fait de lumière. Un emblème de lumière, une flèche de dispersion et trois flèches oiseau. Utilisé par Agathe pour appeler à l\'aide.',
    descriptionEn: 'Materializes a bird made of light. A light emblem, a dispersion arrow, and three bird arrows. Used by Agathe to call for help.',
    emblems: ['lumiere'], arrows: ['dispersion', 'oiseau', 'oiseau', 'oiseau'], arrowReps: 1, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Signal_en_forme_d%27oiseau_lumineux',
  },
  {
    id: 'desagregation',
    name: 'Désagrégation', nameEn: 'Disintegration',
    description: 'Désintègre le matériau sur lequel il est placé. Utilisé par Coco lors du sauvetage de Kustas : transforme la terre en sable, l\'eau en vapeur.',
    descriptionEn: 'Disintegrates the material it is placed on. Used by Coco during Kustas\' rescue: transforms earth into sand, water into vapor.',
    emblems: ['terre'], arrows: ['desagregation', 'colonne'], arrowReps: 4, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Désagrégation',
  },
  {
    id: 'cercle_repetition',
    name: 'Cercle de Répétition', nameEn: 'Circle of Repetition',
    description: 'Ramène l\'objet à sa forme ou état original. Utilisé pour restaurer des objets ou maintenir une forme constante.',
    descriptionEn: 'Returns the object to its original form or state. Used to restore objects or maintain a constant shape.',
    emblems: [], arrows: ['repetition'], arrowReps: 8, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Cercle_de_répétition',
  },
  {
    id: 'dague_eau',
    name: 'Dague d\'Eau', nameEn: 'Water Dagger',
    description: 'Sort de combat créant une courte lame d\'eau. Ce sort a un agencement spécifique : une flèche de dispersion canalise l\'eau, entourée de signes colonne et de symboles mystérieux.',
    descriptionEn: 'Combat spell creating a short water blade. Specific layout: a dispersion arrow channels water, surrounded by column signs and mysterious symbols.',
    emblems: ['eau'], arrows: [], arrowReps: 0,
    customLayout: [
      { symbolId: 'colonne', xOffset: -45, yOffset: -85, rotation: 90, scale: 0.9 },
      { symbolId: 'colonne', xOffset: 45, yOffset: -85, rotation: 270, scale: 0.9 },
      { symbolId: 'dispersion', xOffset: 0, yOffset: -100, rotation: 0, scale: 2.2 },
      { symbolId: 'inconnu_courbe', xOffset: -80, yOffset: 15, rotation: 0, scale: 2.5 },
      { symbolId: 'inconnu_courbe', xOffset: 80, yOffset: 15, rotation: 0, scale: 2.5, flipX: true },
      { symbolId: 'inconnu_triangle', xOffset: 0, yOffset: 160, rotation: 0, scale: 3.5 },
    ],
    circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Dague_d%27eau',
  },
  {
    id: 'dissimulation',
    name: 'Dissimulation', nameEn: 'Concealment',
    description: 'Sort complexe de Sasaran. Fusion de trois sorts : rassemblement d\'ombre, pantin-leurre volant et fenêtre-portail. Deux anneaux concentriques.',
    descriptionEn: 'Complex spell by Sasaran. Fusion of three spells: shadow gathering, flying decoy puppet, and window-portal. Two concentric rings.',
    emblems: ['vent'], arrows: ['vision', 'pantin', 'fenetre'], arrowReps: 3, arrowConfig: 'alternate', circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Dissimulation',
  },
  {
    id: 'eloignement_betes',
    name: 'Éloignement des Bêtes', nameEn: 'Ward off Beasts',
    description: 'Sort mixte repoussant les animaux sauvages. Emblèmes de lumière avec flèches colonne et dissipation.',
    descriptionEn: 'Mixed spell repelling wild animals. Light emblems with column and dissipation arrows.',
    emblems: ['lumiere'], arrows: ['colonne', 'dissipation'], arrowReps: 4, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Éloignement_des_bêtes_sauvages',
  },
  {
    id: 'fenetre_portail',
    name: 'Fenêtre-Portail', nameEn: 'Window-Portal',
    description: 'Crée une ouverture ronde téléportant ce qui la traverse. Deux anneaux concentriques : extérieur en zigzags, intérieur en flèches simples.',
    descriptionEn: 'Creates a round opening teleporting what passes through it. Two concentric rings: outer zigzags, inner simple arrows.',
    emblems: [], arrows: ['fenetre'], arrowReps: 12, arrowConfig: 'alternate', circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Fenêtre-portail_(sort)',
  },
  {
    id: 'nuage_moelleux',
    name: 'Nuage Moelleux', nameEn: 'Fluffy Cloud',
    description: 'Génère une substance rappelant un nuage chaud et doux. Souvent entouré d\'un cercle de répétition pour maintenir sa forme. Inventé par Tetia.',
    descriptionEn: 'Generates a substance resembling a warm, soft cloud. Often surrounded by a repetition circle to maintain its shape. Invented by Tetia.',
    emblems: [], arrows: ['nuage', 'repetition'], arrowReps: 4, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Nuage_moelleux',
  },
  {
    id: 'paillasse_dragon',
    name: 'Paillasse du Dragon', nameEn: 'Dragon\'s Mattress',
    description: 'Créé par les quatre apprenties pour endormir le dragon du labyrinthe. Sort très complexe à multiples anneaux.',
    descriptionEn: 'Created by the four apprentices to put the labyrinth dragon to sleep. Very complex multi-ring spell.',
    emblems: ['terre'], arrows: ['repetition', 'direction', 'colonne', 'desagregation', 'nuage', 'collecte'], arrowReps: 2, arrowConfig: 'alternate', circleCount: 2,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Paillasse_du_Dragon',
  },
  {
    id: 'pantin_leurre',
    name: 'Pantin-Leurre Volant', nameEn: 'Flying Decoy Puppet',
    description: 'Fait voler l\'objet auquel le sort est appliqué de manière autonome comme un pantin. Mentionné dans le tome 2.',
    descriptionEn: 'Makes the object the spell is applied to fly autonomously like a puppet. Mentioned in volume 2.',
    emblems: [], arrows: ['pantin', 'oiseau'], arrowReps: 4, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Pantin-leurre_volant',
  },
  {
    id: 'portail_egouts',
    name: 'Portail des Égouts', nameEn: 'Sewers Portal',
    description: 'Filtre l\'eau des égouts. Pentacle central entouré de quatre grands pentacles latéraux avec emblème Eau et flèches dispersion.',
    descriptionEn: 'Filters sewer water. Central pentacle surrounded by four large lateral pentacles with Water emblem and dispersion arrows.',
    emblems: ['eau'], arrows: ['dispersion'], arrowReps: 4, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Portail_des_égouts',
  },
  {
    id: 'retrecissement',
    name: 'Rétrécissement', nameEn: 'Shrinking',
    description: 'Rétrécit l\'objet ou la cible. Quatre flèches de taille en croix. Vu dans le tome 10.',
    descriptionEn: 'Shrinks the object or target. Four size arrows in a cross. Seen in volume 10.',
    emblems: [], arrows: ['taille'], arrowReps: 4, arrowConfig: 'inward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Rétrécissement',
  },
  {
    id: 'rubans_cristal',
    name: 'Rubans de Cristal', nameEn: 'Crystal Ribbons',
    description: 'Sort de Trice générant un long ruban souple de cristal. Utilise les flèches tissage et pluie.',
    descriptionEn: 'Spell by Trice generating a long flexible crystal ribbon. Uses weaving and rain arrows.',
    emblems: [], arrows: ['tissage', 'pluie'], arrowReps: 4, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Rubans_de_Cristal',
  },
  {
    id: 'carrosse_aile',
    name: 'Carrosse Ailé', nameEn: 'Winged Carriage',
    description: 'Sort permettant de maintenir en vol un carrosse. C\'est en observant Kieffrey retracer ce pentacle que Coco apprend ses premiers sorts.',
    descriptionEn: 'Spell keeping a carriage in flight. Coco learns her first spells by observing Kieffrey redraw this pentacle.',
    emblems: ['vent'], arrows: ['colonne'], arrowReps: 8, arrowConfig: 'alternate', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Carrosse_ailé_(sort)',
  },
  {
    id: 'boule_feu_illusoire',
    name: 'Boule de Feu Illusoire', nameEn: 'Illusory Fireball',
    description: 'Conjure une boule de feu froide sans chaleur. Créé par Olugio, jugé trop dangereux à commercialiser. Tome 8.',
    descriptionEn: 'Conjures a cold fireball without heat. Created by Olugio, deemed too dangerous to commercialize. Volume 8.',
    emblems: ['feu'], arrows: ['dispersion'], arrowReps: 6, arrowConfig: 'outward', circleCount: 1,
    wikiUrl: 'https://latelier-des-sorciers.fandom.com/fr/wiki/Boule_de_feu_illusoire',
  },
];
