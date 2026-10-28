/* ==========================================================================
   Les Domaines — catalogue produits
   Source unique de vérité : modifiez ce fichier pour changer prix, stock,
   textes ou visuels. Les pages liste / fiche produit se mettent à jour seules.
   ========================================================================== */

window.LD_CATEGORIES = [
  { slug: "tous", label: "Tous les produits" },
  { slug: "laitiers", label: "Produits laitiers" },
  { slug: "fruits-legumes", label: "Fruits & Légumes" },
  { slug: "epicerie", label: "Épicerie" },
  { slug: "traiteur", label: "Traiteur" },
  { slug: "promotions", label: "Promotions" }
];

window.LD_PRODUCTS = [
  {
    slug: "chergui-sport-450",
    name: "CHERGUI Sport - Yaourt à boire protéiné - Muffins Myrtilles Framboise - (450 ml)",
    short: "36g de Protéines - Complément alimentaire",
    price: 24.5,
    unit: "Dhs",
    oldPrice: 28,
    badge: "Nouveau",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/yaourt-450.png",
    stock: 42,
    featured: true,
    description:
      "Le yaourt à boire protéiné CHERGUI Sport, au goût muffins myrtilles framboise. 36g de protéines par bouteille, sans conservateurs, idéal après l'effort ou au petit-déjeuner.",
    variants: [
      { label: "450 ml — 36g", price: 24.5 },
      { label: "260 ml — 21g", price: 16.9 }
    ]
  },
  {
    slug: "chergui-sport-260",
    name: "CHERGUI Sport - Yaourt à boire protéiné - Muffins Myrtilles Framboise - (260 ml)",
    short: "21g de Protéines - Complément alimentaire",
    price: 16.9,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/yaourt-260.png",
    stock: 60,
    featured: true,
    description:
      "Format nomade du yaourt protéiné CHERGUI Sport : 21g de protéines, texture onctueuse et arôme fruits rouges. À emporter partout."
  },
  {
    slug: "avocat",
    name: "Avocat frais - Calibre moyen - Origine nos fermes",
    short: "Traçabilité garantie - Vendu au kilo",
    price: 19.95,
    unit: "Dhs/Kg",
    oldPrice: 24.95,
    badge: "Promo",
    category: "fruits-legumes",
    categoryLabel: "Fruits & Légumes",
    img: "assets/img/avocat.png",
    stock: 120,
    featured: true,
    promoEnds: "2026-11-03",
    description:
      "Avocats récoltés à maturité dans nos fermes. Chair fondante, calibre moyen, parfaits en salade, en toast ou en guacamole. Prix valable du 27 octobre au 3 novembre 2026."
  },
  {
    slug: "lait-entier-1l",
    name: "Lait frais entier pasteurisé - Ferme Les Domaines - (1 L)",
    short: "Circuit ultra-court - Sans conservateurs",
    price: 12,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/lait.png",
    stock: 80,
    featured: true,
    description:
      "Lait entier frais, collecté le matin dans nos fermes et pasteurisé sur place. Une texture riche et un goût authentique, sans poudre ni reconstituant."
  },
  {
    slug: "jben-frais-250g",
    name: "Jben frais traditionnel - (250 g)",
    short: "Frais du jour - Sans conservateurs",
    price: 28,
    unit: "Dhs",
    badge: "Coup de cœur",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/jben.png",
    stock: 35,
    description:
      "Le jben frais de nos fermes, au lait entier et au caillé doux. À déguster nature, avec du miel ou en feuilletés."
  },
  {
    slug: "oeufs-plein-air-6",
    name: "Œufs de poules élevées en plein air - Boîte de 6",
    short: "Fermes partenaires - Calibre moyen",
    price: 18.5,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/oeufs.png",
    stock: 90,
    description:
      "Six œufs frais de poules élevées en plein air dans nos fermes partenaires. Coquille ferme, jaune soutenu, ramassés du jour."
  },
  {
    slug: "miel-fleurs-500g",
    name: "Miel de fleurs - Récolte artisanale - (500 g)",
    short: "Épicerie fine - Non chauffé",
    price: 85,
    unit: "Dhs",
    category: "epicerie",
    categoryLabel: "Épicerie",
    img: "assets/img/miel.png",
    stock: 24,
    description:
      "Miel de fleurs récolté par nos apiculteurs partenaires, non chauffé pour préserver tous ses arômes. Parfait avec le jben frais."
  },
  {
    slug: "tacos-poulet-4",
    name: "Rouleaux de tacos au poulet et sauce yaourt - Lot de 4",
    short: "Sauce yaourt Jnane CHERGUI",
    price: 38.5,
    unit: "Dhs",
    category: "traiteur",
    categoryLabel: "Traiteur",
    img: "assets/img/recette-tacos.png",
    stock: 18,
    description:
      "Rouleaux de tacos généreusement garnis de poulet moelleux et de sauce yaourt Jnane CHERGUI, aux herbes fines. Prêts à réchauffer."
  },
  {
    slug: "soupe-potiron-500ml",
    name: "Soupe de potiron au poulet et à la crème CHERGUI - (500 ml)",
    short: "Fait maison - À réchauffer",
    price: 22,
    unit: "Dhs",
    category: "traiteur",
    categoryLabel: "Traiteur",
    img: "assets/img/recette-soupe.png",
    stock: 26,
    description:
      "Une soupe onctueuse et réconfortante, où le fondant du potiron se marie à la tendreté du poulet et à la douceur de la crème CHERGUI."
  },
  {
    slug: "feuilletes-jben-6",
    name: "Feuilletés de Jben et truite fumée - Lot de 6",
    short: "Prêt à cuire - Sans conservateurs",
    price: 34,
    unit: "Dhs",
    badge: "Nouveau",
    category: "traiteur",
    categoryLabel: "Traiteur",
    img: "assets/img/recette-feuilletes.png",
    stock: 20,
    description:
      "Une bouchée croustillante et raffinée, où la légèreté du feuilleté s'accorde à la douceur du jben CHERGUI et à la finesse de la truite fumée."
  }
];
