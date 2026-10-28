/* ==========================================================================
   Les Domaines — catalogue produits
   Prix, libellés et visuels repris de la boutique réelle (boutiquelesdomaines.ma).
   Source unique de vérité : modifiez ce fichier pour changer prix, stock,
   textes ou visuels. Les pages liste / fiche produit se mettent à jour seules.
   ========================================================================== */

window.LD_CATEGORIES = [
  { slug: "tous", label: "Tous les produits" },
  { slug: "laitiers", label: "Produits laitiers" },
  { slug: "fruits-legumes", label: "Fruits & Légumes" },
  { slug: "epicerie", label: "Épicerie" },
  { slug: "poissonnerie", label: "Poissonnerie" },
  { slug: "boucherie", label: "Boucherie" },
  { slug: "promotions", label: "Promotions" }
];

window.LD_PRODUCTS = [
  {
    slug: "chergui-sport-450",
    name: "CHERGUI Sport - Yaourt à boire protéiné - Muffins Myrtilles Framboise - (450 ml)",
    short: "36g de Protéines - Complément alimentaire",
    price: 21.95,
    unit: "Dhs",
    badge: "Nouveau",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/yaourt-450.jpg",
    stock: 42,
    featured: true,
    description:
      "Le yaourt à boire protéiné CHERGUI Sport au goût muffins myrtilles framboise, format 450 ml. 36g de protéines par bouteille, sans conservateurs, à emporter après le sport ou au petit-déjeuner.",
    variants: [
      { label: "450 ml — 36g", price: 21.95 },
      { label: "260 ml — 21g", price: 14.95 }
    ]
  },
  {
    slug: "chergui-sport-260",
    name: "CHERGUI Sport - Yaourt à boire protéiné - Muffins Myrtilles Framboise - (260 ml)",
    short: "21g de Protéines - Complément alimentaire",
    price: 14.95,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/yaourt-260.jpg",
    stock: 60,
    featured: true,
    description:
      "Format nomade du yaourt protéiné CHERGUI Sport : 21g de protéines, texture onctueuse et arôme myrtilles framboise."
  },
  {
    slug: "fromage-frais-sucre",
    name: "Fromage frais - nature sucré - (140g)",
    short: "Sans soja, sans conservateurs",
    price: 7,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/fromage-sucre.jpg",
    stock: 55,
    featured: true,
    description:
      "Le fromage frais nature sucré de nos fermes, en pot de 140g. Une texture douce et onctueuse, sans soja et sans conservateurs."
  },
  {
    slug: "fromage-frais-nature",
    name: "Fromage frais - nature sans sucre - (140g)",
    short: "Sans soja, sans conservateurs",
    price: 7,
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/fromage-nature.jpg",
    stock: 48,
    description:
      "Fromage frais nature sans sucre, en pot de 140g. Idéal en cuisine comme à table, sans soja et sans conservateurs."
  },
  {
    slug: "kefir-450g",
    name: "Kéfir - Yaourt à boire - (450g)",
    short: "Yaourt à boire au lait fermenté",
    price: 10.5,
    oldPrice: 12,
    badge: "Promo",
    unit: "Dhs",
    category: "laitiers",
    categoryLabel: "Produits laitiers",
    img: "assets/img/kefir.jpg",
    stock: 33,
    description:
      "Yaourt à boire au lait fermenté, format 450g. Un goût frais et légèrement acidulé, riche en ferments."
  },
  {
    slug: "avocat",
    name: "Avocat - (Au Kg)",
    short: "Issu d'une agriculture raisonnée",
    price: 19.95,
    oldPrice: 48.95,
    badge: "Promo",
    category: "fruits-legumes",
    categoryLabel: "Fruits & Légumes",
    img: "assets/img/avocat.jpg",
    unit: "Dhs/Kg",
    stock: 120,
    featured: true,
    promoEnds: "2026-11-03",
    description:
      "Avocats issus d'une agriculture raisonnée, vendus au kilo. Chair fondante, parfaits en salade, en toast ou en guacamole. Offre valable jusqu'au 3 novembre 2026."
  },
  {
    slug: "banane",
    name: "Banane - (Au Kg)",
    short: "Riche en vitamines B6 et potassium",
    price: 24.95,
    unit: "Dhs/Kg",
    category: "fruits-legumes",
    categoryLabel: "Fruits & Légumes",
    img: "assets/img/banane.jpg",
    stock: 75,
    description:
      "Bananes vendues au kilo, riches en vitamines B6 et en potassium. À déguster nature ou en dessert."
  },
  {
    slug: "framboise-125g",
    name: "Framboise - (125g)",
    short: "Fruit rouge frais",
    price: 22.95,
    unit: "Dhs",
    category: "fruits-legumes",
    categoryLabel: "Fruits & Légumes",
    img: "assets/img/framboise.jpg",
    stock: 26,
    description:
      "Barquette de framboises fraîches de 125g. Un fruit rouge parfumé, à savourer nature ou avec le fromage frais."
  },
  {
    slug: "carotte",
    name: "Carotte - (Au Kg)",
    short: "Sans résidu",
    price: 12.95,
    unit: "Dhs/Kg",
    category: "fruits-legumes",
    categoryLabel: "Fruits & Légumes",
    img: "assets/img/carotte.jpg",
    stock: 90,
    description:
      "Carottes fraîches vendues au kilo, cultivées sans résidu. Pour les soupes, les purées et les salades."
  },
  {
    slug: "dattes-boufeggous",
    name: "Dattes Boufeggous (1 kg)",
    short: "Dattes issues de nos fermes, sans résidus",
    price: 59.95,
    oldPrice: 74.95,
    badge: "Promo",
    unit: "Dhs",
    category: "epicerie",
    categoryLabel: "Épicerie",
    img: "assets/img/dattes.jpg",
    stock: 40,
    featured: true,
    description:
      "Dattes Boufeggous issues de nos fermes, sans résidus, en caisse de 1 kg. Une chair fondante et un goût de caramel naturel."
  },
  {
    slug: "amlou-200g",
    name: "Amlou traditionnel - (200g)",
    short: "Recette 100% naturelle",
    price: 83.95,
    unit: "Dhs",
    category: "epicerie",
    categoryLabel: "Épicerie",
    img: "assets/img/amlou.jpg",
    stock: 22,
    description:
      "Amlou traditionnel préparé selon la recette 100% naturelle : amandes, miel et huile d'argane. À déguster au petit-déjeuner."
  },
  {
    slug: "pate-a-tartiner-400g",
    name: "Pâte à tartiner - (400g)",
    short: "Sans huile de palme - Sans conservateurs",
    price: 67.95,
    unit: "Dhs",
    category: "epicerie",
    categoryLabel: "Épicerie",
    img: "assets/img/tartiner.jpg",
    stock: 30,
    description:
      "Pâte à tartiner en pot de 400g, sans huile de palme et sans conservateurs. Gourmande sur le pain ou en pâtisserie."
  },
  {
    slug: "truite-fumee-aneth",
    name: "Filet de truite fumée à l'aneth - (100g)",
    short: "Élevage sans soja, riche en oméga 3",
    price: 59.9,
    unit: "Dhs",
    category: "poissonnerie",
    categoryLabel: "Poissonnerie",
    img: "assets/img/truite-fumee.jpg",
    stock: 18,
    description:
      "Filet de truite fumée à l'aneth, conditionné en 100g. Élevage sans soja, riche en oméga 3, idéal en toast ou en salade."
  },
  {
    slug: "des-saumon-250g",
    name: "Dés de saumon frais - (250g)",
    short: "Riche en oméga 3",
    price: 129,
    unit: "Dhs",
    category: "poissonnerie",
    categoryLabel: "Poissonnerie",
    img: "assets/img/saumon-des.jpg",
    stock: 12,
    description:
      "Dés de saumon frais prêts à cuisiner, en barquette de 250g. Riches en oméga 3, parfaits en tartare, poêlée ou bouillon."
  },
  {
    slug: "brochettes-boeuf-250g",
    name: "Brochettes de bœuf - (250g)",
    short: "Issu de nos élevages, sans soja",
    price: 49.95,
    unit: "Dhs",
    category: "boucherie",
    categoryLabel: "Boucherie",
    img: "assets/img/brochettes.jpg",
    stock: 24,
    description:
      "Brochettes de bœuf issues de nos élevages, sans soja, en barquette de 250g. À griller ou à cuire à la plancha."
  },
  {
    slug: "poulet-fermier",
    name: "Poulet fermier - (1,5 Kg)",
    short: "Poids moyen entre 1,5 kg et 1,8 kg",
    price: 149.95,
    unit: "Dhs",
    category: "boucherie",
    categoryLabel: "Boucherie",
    img: "assets/img/poulet.jpg",
    stock: 15,
    description:
      "Poulet fermier de nos élevages, d'un poids moyen compris entre 1,5 kg et 1,8 kg. Élevé sans soja."
  }
];
