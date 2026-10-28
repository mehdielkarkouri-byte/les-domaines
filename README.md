# Les Domaines — Boutique en ligne (HTML / CSS / JS)

Reproduction fidèle de la maquette fournie (header, carrousel promo, grille produits,
« Nos engagements », « Idées recettes », footer 3 niveaux, bandeau cookies) avec un
catalogue réellement dynamique. Site 100 % statique, sans build ni dépendance :
ouvrez `index.html` dans un navigateur.

## Démarrage

```bash
git clone https://github.com/mehdielkarkouri-byte/les-domaines.git
cd les-domaines
# ouvrir index.html, ou servir localement :
python3 -m http.server 8080
```

## Arborescence

```
les-domaines/
├── index.html              Accueil (carrousel, à découvrir, engagements, recettes)
├── categorie.html          Catalogue : filtres par catégorie, tri, recherche
├── produit.html            Fiche produit dynamique  → produit.html?p=<slug>
├── panier.html             Panier (localStorage) + livraison offerte dès 100 Dhs
├── commande.html           Formulaire de commande
├── recettes.html           Liste des recettes
├── recette.html            Recette détaillée
├── notre-concept.html      Concept + engagements
├── service-client.html     Contact WhatsApp + FAQ
├── compte.html             Connexion / mon compte
├── cgv.html / cgu.html / confidentialite.html
├── 404.html                Page introuvable
├── manifest.webmanifest    PWA (icône, couleur du thème, mode standalone)
├── robots.txt / sitemap.xml
└── assets/
    ├── data/products.js    ⭐ Catalogue : produits, prix, catégories, visuels
    ├── css/styles.css      Design complet (variables de couleurs en haut du fichier)
    ├── js/main.js          Catalogue, fiche produit, panier, carrousel, UI
    ├── img/                10 visuels produits et recettes
    └── favicon.svg
```

## Modifier le catalogue

Tout se passe dans `assets/data/products.js`. Un produit = un objet :

```js
{
  slug: "avocat",              // URL : produit.html?p=avocat
  name: "Avocat frais …",
  short: "Traçabilité garantie", // sous-titre de la carte
  price: 19.95,
  oldPrice: 24.95,             // facultatif → badge promo + prix barré
  unit: "Dhs/Kg",
  badge: "Promo",              // facultatif
  category: "fruits-legumes",  // doit exister dans LD_CATEGORIES
  categoryLabel: "Fruits & Légumes",
  img: "assets/img/avocat.png",
  stock: 120,
  featured: true,              // affiché dans « À découvrir » sur l'accueil
  description: "…",
  variants: [                  // facultatif → sélecteur de format
    { label: "450 ml — 36g", price: 24.5 },
    { label: "260 ml — 21g", price: 16.9 }
  ]
}
```

Les pages catalogue, fiche produit et l'accueil se mettent à jour automatiquement.
Les catégories se gèrent dans `LD_CATEGORIES` (même fichier) : elles alimentent la
barre de navigation et les filtres.

## Charte graphique (`assets/css/styles.css`, section `:root`)

| Variable | Valeur | Usage |
|---|---|---|
| `--olive` | `#779836` | boutons, barre catégories |
| `--olive-dark` | `#6B9B34` | footer, bandeau cookies |
| `--olive-light` | `#8BB944` | bande de séparation du footer |
| `--red` | `#E30613` | logo, badges promo, prix |
| `--bg` | `#F7F5F2` | fond de page |
| `--text` / `--muted` | `#222` / `#6D6D6D` | titres / textes secondaires |

Typographie : Poppins (400 → 800). Motif récurrent : le chevron vert sous les titres.

## Visuels et logo

Les visuels produits et le logo proviennent de la boutique en ligne officielle
`boutiquelesdomaines.ma` (images produits 415 px + logo officiel), repris localement
dans `assets/img/`. Le catalogue reprend également les libellés et les prix réels
du site (relevé du 28 octobre 2026). Si le magasin change un visuel, il suffit de
remplacer le fichier correspondant dans `assets/img/`.

Les trois photos de recettes (`recette-*.png`) sont des visuels d'illustration :
remplacez-les par les photos officielles quand elles seront disponibles.

## À personnaliser avant mise en ligne

1. **Numéro WhatsApp** — `212664428240` (numéro officiel de la boutique) est utilisé
   dans le footer et le bouton flottant. Constante `WA` dans `build_pages.py`.
2. **Images** — remplacer les fichiers de `assets/img/` par vos photos produits.
3. **Domaine** — `SITE = "https://boutiquelesdomaines.ma"` dans `build_pages.py`
   (balises canonical / Open Graph, `sitemap.xml`, `robots.txt`).
4. **Livraison** — `FREE_DELIVERY` et `DELIVERY_FEE` dans `assets/js/main.js`.
5. **Réseaux sociaux** — liens Facebook / Instagram dans le footer.

## Fonctionnalités

- **Catalogue dynamique** : 10 produits, filtres par catégorie, tri (prix, nom),
  recherche plein texte, compteur de résultats, état vide.
- **Fiche produit** : variantes de format, quantité, stock, prix total en direct,
  produits associés, données structurées Schema.org (JSON-LD).
- **Panier** : persistant (`localStorage`), badge dans l'en-tête sur toutes les pages,
  quantités, suppression, sous-total, livraison offerte dès 100 Dhs, message
  « plus que X Dhs ».
- **Carrousel** : automatique (6 s), puces cliquables, balayage tactile.
- **UX** : bandeau cookies mémorisé, notification d'ajout au panier, bouton WhatsApp
  flottant, retour en haut, lien d'évitement clavier, focus visibles.
- **SEO / PWA** : titres et descriptions par page, Open Graph, canonical, sitemap,
  robots, manifest, favicon.
- **Responsive** : 2 colonnes mobile, 3 tablette, 4 desktop ; footer 4 colonnes.

## Régénérer les pages

`build_pages.py` reconstruit toutes les pages avec l'en-tête, le pied de page et les
balises SEO communs (utile après une modification globale du chrome) :

```bash
python3 build_pages.py
```

Le contenu éditorial (accueil, recettes, pages légales) est conservé : le script
réutilise le corps des pages existantes et ne réécrit que la structure commune.

## Mise en ligne

Glissez le dossier sur n'importe quel hébergement statique (GitHub Pages, Netlify,
Vercel, cPanel, OVH…). Aucun serveur ni base de données requis.
Pour GitHub Pages : Settings → Pages → Source « Deploy from a branch » → `main` / `/`.

Un vrai back-office (stock, commandes, paiement, comptes clients) nécessite une
application dynamique — c'est ce que Base44 génère directement.
