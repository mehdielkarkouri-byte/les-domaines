# Les Domaines — Boutique en ligne (HTML / CSS / JS)

Reproduction fidèle de la maquette fournie : header, carrousel promo, grille produits,
« Nos engagements », « Idées recettes », footer 3 niveaux et bandeau cookies.
Site 100 % statique, aucune dépendance ni build : ouvrez `index.html` dans un navigateur.

## Arborescence

```
les-domaines/
├── index.html              Accueil (header, carrousel, à découvrir, engagements, recettes)
├── categorie.html          Liste des produits
├── produit.html            Fiche produit (variantes, quantité, ajout au panier)
├── panier.html             Panier (localStorage) + calcul livraison offerte dès 100 Dhs
├── commande.html           Formulaire de commande
├── recettes.html           Liste des recettes
├── recette.html            Recette détaillée
├── notre-concept.html      Concept + engagements
├── service-client.html     Contact WhatsApp + FAQ
├── compte.html             Connexion / mon compte
├── cgv.html / cgu.html / confidentialite.html
└── assets/
    ├── css/styles.css      Tout le design (variables de couleurs en haut du fichier)
    ├── js/main.js          Carrousel, panier, cookies, notifications
    └── img/                6 visuels produits et recettes
```

## Charte graphique (dans `assets/css/styles.css`, section `:root`)

| Variable | Valeur | Usage |
|---|---|---|
| `--olive` | `#779836` | boutons, barre catégories |
| `--olive-dark` | `#6B9B34` | footer, bandeau cookies |
| `--olive-light` | `#8BB944` | bande de séparation du footer |
| `--red` | `#E30613` | logo, badges promo, prix |
| `--bg` | `#F7F5F2` | fond de page |
| `--text` / `--muted` | `#222` / `#6D6D6D` | titres / textes secondaires |

Typographie : Poppins (Google Fonts), graisses 400 → 800.
Motif récurrent : le chevron vert sous chaque titre de section (`.chevron`).

## Ce qu'il faut personnaliser avant mise en ligne

1. **Numéro WhatsApp** — remplacer `212600000000` dans les liens `https://wa.me/212600000000`
   (présent dans le footer de chaque page).
2. **Images** — remplacer les fichiers de `assets/img/` par vos photos produits
   (mêmes noms de fichiers, ou mettre à jour les `src`).
3. **Produits** — dans `index.html` / `categorie.html`, chaque carte est un bloc `<article class="product">`.
   Les boutons « + » portent `data-name`, `data-price` et `data-img`.
4. **Prix et livraison** — seuil de livraison offerte dans `assets/js/main.js`
   (`FREE_DELIVERY = 100`) et frais de livraison (`delivery = 25`).
5. **Promo du carrousel** — texte, prix et dates dans le premier `.slide` de `index.html`.
   Pour ajouter un visuel : dupliquer un `<article class="slide">`, les puces se génèrent seules.
6. **Réseaux sociaux** — liens Facebook / Instagram dans le footer.

## Fonctionnalités déjà en place

- Carrousel automatique (6 s), navigation par puces et balayage tactile.
- Panier persistant (`localStorage`), quantités, suppression, sous-total,
  livraison offerte dès 100 Dhs, message « plus que X Dhs pour la livraison offerte ».
- Ajout au panier depuis l'accueil, la liste et la fiche produit (avec variante et quantité).
- Bandeau cookies mémorisé, notification « Ajouté au panier ».
- Responsive : mobile (2 colonnes), tablette (3), desktop (4) + footer 4 colonnes.

## Mise en ligne

Glissez le dossier complet sur n'importe quel hébergement statique
(Netlify Drop, Vercel, GitHub Pages, cPanel, OVH…). Aucun serveur ni base de données requis.
Pour un vrai back-office (stock, commandes, paiement), il faut une application dynamique :
c'est ce que Base44 génère directement.
