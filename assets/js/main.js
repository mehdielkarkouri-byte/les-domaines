/* ==========================================================================
   Les Domaines — interactions V2
   Catalogue dynamique, fiche produit, panier, carrousel, cookies, UI.
   Aucune dépendance externe.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------- Utils --------------------------------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function money(n) {
    return (Math.round(Number(n) * 100) / 100).toFixed(2).replace(".", ",") + " Dhs";
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function products() { return window.LD_PRODUCTS || []; }
  function findProduct(slug) {
    var list = products();
    for (var i = 0; i < list.length; i++) if (list[i].slug === slug) return list[i];
    return null;
  }

  /* ------------------------------- Panier -------------------------------- */

  var CART_KEY = "ld_cart_v1";
  var FREE_DELIVERY = 100;
  var DELIVERY_FEE = 25;

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCartBadge();
  }

  function addToCart(item, qty) {
    var cart = readCart();
    var q = Number(qty) || 1;
    var found = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) { found = cart[i]; break; }
    }
    if (found) {
      found.qty += q;
    } else {
      cart.push({ name: item.name, price: Number(item.price) || 0, img: item.img || "", qty: q });
    }
    writeCart(cart);
  }

  function cartCount() {
    return readCart().reduce(function (s, it) { return s + (Number(it.qty) || 0); }, 0);
  }

  function updateCartBadge() {
    var n = cartCount();
    $$("[data-cart-count]").forEach(function (el) {
      el.textContent = n;
      el.style.display = n ? "" : "none";
      el.setAttribute("aria-label", n + " article(s) dans le panier");
    });
  }

  /* -------------------------------- Toast -------------------------------- */

  var toastTimer = null;

  function toast(message, linkHref, linkLabel) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = "";
    var span = document.createElement("span");
    span.textContent = message;
    el.appendChild(span);
    if (linkHref && linkLabel) {
      var a = document.createElement("a");
      a.href = linkHref;
      a.textContent = linkLabel;
      el.appendChild(a);
    }
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 3400);
  }

  /* ------------------------------- Carrousel ----------------------------- */

  function initCarousel() {
    var wrap = $("#slides");
    var dotsWrap = $("#dots");
    if (!wrap || !dotsWrap) return;

    var slides = $$(".slide", wrap);
    if (!slides.length) return;

    var index = 0, timer = null, dots = [];

    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Aller au visuel " + (i + 1));
      if (i === 0) b.className = "is-active";
      b.addEventListener("click", function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });

    function go(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === index);
        dots[i].classList.toggle("is-active", i === index);
      });
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 6000);
    }

    var startX = null;
    wrap.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) { go(dx < 0 ? index + 1 : index - 1); restart(); }
      startX = null;
    });

    restart();
  }

  /* ---------------------------- Bandeau cookies -------------------------- */

  function initCookie() {
    var banner = $("#cookie");
    if (!banner) return;
    var KEY = "ld_cookie_consent";
    var accepted = null;
    try { accepted = localStorage.getItem(KEY); } catch (e) {}
    if (accepted) { banner.classList.add("is-hidden"); return; }

    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookie-accept]");
      if (!btn) return;
      try { localStorage.setItem(KEY, String(Date.now())); } catch (err) {}
      banner.classList.add("is-hidden");
    });
  }

  /* -------------------------- Cartes produit (HTML) ---------------------- */

  function unitShort(p) {
    return p.unit && p.unit.indexOf("/") > -1 ? " / " + p.unit.split("/")[1] : " / unité";
  }

  function productCard(p) {
    return '' +
      '<article class="product">' +
        '<div class="product-media">' +
          (p.badge ? '<span class="product-tag">' + escapeHtml(p.badge) + '</span>' : '') +
          '<a href="produit.html?p=' + encodeURIComponent(p.slug) + '" aria-label="' + escapeHtml(p.name) + '">' +
            '<img src="' + p.img + '" alt="' + escapeHtml(p.name) + '" loading="lazy" width="400" height="400">' +
          '</a>' +
        '</div>' +
        '<div class="product-body">' +
          '<h3 class="product-title"><a href="produit.html?p=' + encodeURIComponent(p.slug) + '">' + escapeHtml(p.name) + '</a></h3>' +
          '<p class="product-sub">' + escapeHtml(p.short) + '</p>' +
          '<div class="product-foot">' +
            '<span class="price">' +
              (p.oldPrice ? '<span class="price-old">' + money(p.oldPrice) + '</span>' : '') +
              money(p.price) + ' <small>' + escapeHtml(unitShort(p)) + '</small>' +
            '</span>' +
            '<button class="add-btn" type="button" data-add="' + encodeURIComponent(p.slug) + '" aria-label="Ajouter ' + escapeHtml(p.name) + ' au panier">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ------------------------- Sélection « À découvrir » -------------------- */

  function initFeatured() {
    var grid = $("#featured-grid");
    if (!grid) return;
    var list = products().filter(function (p) { return p.featured; }).slice(0, 4);
    grid.innerHTML = list.map(productCard).join("");
  }

  /* --------------------------- Page catalogue ---------------------------- */

  function initCatalog() {
    var root = $("#catalog-root");
    if (!root) return;

    var grid = $("#catalog-grid", root);
    var countEl = $("#results-count");
    var sortEl = $("#sort");
    var chipsWrap = $("#chips");

    var params = new URLSearchParams(window.location.search);
    var state = {
      cat: params.get("cat") || "tous",
      q: (params.get("q") || "").trim(),
      sort: params.get("sort") || "default"
    };

    if (sortEl) sortEl.value = state.sort;

    function buildChips() {
      if (!chipsWrap) return;
      var cats = window.LD_CATEGORIES || [];
      chipsWrap.innerHTML = cats.map(function (c) {
        return '<button class="chip' + (c.slug === state.cat ? " is-active" : "") + '" type="button" data-cat="' +
          c.slug + '">' + escapeHtml(c.label) + '</button>';
      }).join("");
    }

    function filtered() {
      var list = products().slice();
      if (state.cat === "promotions") list = list.filter(function (p) { return !!p.oldPrice; });
      else if (state.cat !== "tous") list = list.filter(function (p) { return p.category === state.cat; });

      if (state.q) {
        var q = state.q.toLowerCase();
        list = list.filter(function (p) {
          return (p.name + " " + p.short + " " + p.categoryLabel).toLowerCase().indexOf(q) !== -1;
        });
      }

      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "name-asc") list.sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); });

      return list;
    }

    function render() {
      var list = filtered();

      if (countEl) {
        countEl.innerHTML = '<strong>' + list.length + '</strong> produit' + (list.length > 1 ? "s" : "");
      }

      if (!list.length) {
        grid.innerHTML = '<div class="empty-state"><strong>Aucun produit trouvé</strong>' +
          'Essayez une autre recherche ou choisissez une autre catégorie.</div>';
        return;
      }

      grid.innerHTML = list.map(productCard).join("");
    }

    function syncUrl() {
      var p = new URLSearchParams();
      if (state.cat !== "tous") p.set("cat", state.cat);
      if (state.q) p.set("q", state.q);
      if (state.sort !== "default") p.set("sort", state.sort);
      var qs = p.toString();
      window.history.replaceState(null, "", "categorie.html" + (qs ? "?" + qs : ""));
    }

    root.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-cat]");
      if (!chip) return;
      state.cat = chip.getAttribute("data-cat");
      buildChips();
      render();
      syncUrl();
    });

    if (sortEl) {
      sortEl.addEventListener("change", function () {
        state.sort = sortEl.value;
        render();
        syncUrl();
      });
    }

    buildChips();
    render();

    if (state.q) toast('Résultats pour « ' + state.q + ' »');
  }

  /* ------------------------- Page fiche produit -------------------------- */

  function initProductPage() {
    var root = $("#pdp-root");
    if (!root) return;

    var slug = new URLSearchParams(window.location.search).get("p");
    var p = slug ? findProduct(slug) : null;

    if (!p) {
      root.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><strong>Produit introuvable</strong>' +
        'Ce produit n\'existe plus ou l\'adresse est incorrecte. ' +
        '<a href="categorie.html" style="color:var(--olive-darker);text-decoration:underline">Voir tous les produits</a></div>';
      return;
    }

    document.title = p.name + " | Les Domaines";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.short + " — " + p.name + ". Livraison à Casablanca, Rabat et Marrakech.");

    var variants = p.variants && p.variants.length ? p.variants : null;
    var price = p.price;
    var qty = 1;

    var related = products().filter(function (x) {
      return x.category === p.category && x.slug !== p.slug;
    }).slice(0, 3);
    if (related.length < 2) {
      related = related.concat(products().filter(function (x) {
        return x.slug !== p.slug && related.indexOf(x) === -1;
      })).slice(0, 3);
    }

    var crumbs = '<div class="breadcrumb"><a href="index.html">Accueil</a> — ' +
      '<a href="categorie.html?cat=' + p.category + '">' + escapeHtml(p.categoryLabel) + '</a> — ' +
      escapeHtml(p.name) + '</div>';

    root.innerHTML = '' +
      '<div class="page-head" style="background:none;border:0;padding:10px 0 0;text-align:left">' +
        '<div class="wrap" style="padding:0">' + crumbs + '</div>' +
      '</div>' +
      '<div class="pdp">' +
        '<div class="pdp-media">' +
          (p.badge ? '<span class="product-tag">' + escapeHtml(p.badge) + '</span>' : '') +
          '<img src="' + p.img + '" alt="' + escapeHtml(p.name) + '" width="600" height="600">' +
          '<div class="pdp-thumbs">' +
            '<img src="' + p.img + '" alt="">' +
            '<img src="assets/img/avocat.jpg" alt="">' +
            '<img src="assets/img/fromage-sucre.jpg" alt="">' +
          '</div>' +
        '</div>' +

        '<div class="pdp-info">' +
          '<div class="pdp-meta">' +
            '<span class="badge-soft">' + escapeHtml(p.categoryLabel) + '</span>' +
            '<span class="badge-soft">Traçabilité garantie</span>' +
          '</div>' +
          '<h1>' + escapeHtml(p.name) + '</h1>' +
          '<p class="pdp-sub">' + escapeHtml(p.short) + '</p>' +
          '<div class="pdp-price">' +
            '<span class="price" id="pdp-price">' + money(price) + '</span>' +
            (p.oldPrice ? '<span class="old">' + money(p.oldPrice) + '</span>' : '') +
          '</div>' +
          '<p class="pdp-stock' + (p.stock <= 25 ? " is-low" : "") + '"><span class="dot"></span>' +
            (p.stock > 0 ? 'En stock — ' + p.stock + ' disponibles' : 'Rupture de stock') + '</p>' +

          '<form id="pdp-form">' +
            (variants ? '<div class="variants">' + variants.map(function (v, i) {
              return '<button type="button" class="variant' + (i === 0 ? " is-active" : "") +
                '" data-price="' + v.price + '">' + escapeHtml(v.label) + '</button>';
            }).join("") + '</div>' : '') +

            '<div class="qty">' +
              '<button type="button" data-step="-1" aria-label="Diminuer la quantité">−</button>' +
              '<span id="qty-value">1</span>' +
              '<button type="button" data-step="1" aria-label="Augmenter la quantité">+</button>' +
            '</div>' +

            '<div class="pdp-buy">' +
              '<button class="btn btn--block" type="button" data-add>' +
                'Ajouter au panier — <span id="pdp-total">' + money(price) + '</span>' +
              '</button>' +
              '<a class="btn btn--ghost btn--block" href="panier.html">Voir mon panier</a>' +
            '</div>' +
          '</form>' +

          '<ul class="pdp-perks">' +
            '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg> Livraison offerte dès 100 Dhs</li>' +
            '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg> Expédié sous 24h à Casablanca, Rabat et Marrakech</li>' +
            '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.4 3 8 7.5 9.5 4.5-1.5 7.5-5.1 7.5-9.5V6Z"/><path d="m8.7 12 2.3 2.3 4.3-4.6"/></svg> Paiement sécurisé ou à la livraison</li>' +
          '</ul>' +

          '<p class="pdp-desc">' + escapeHtml(p.description || "") + '</p>' +

          '<div class="trace-card">' +
            '<span class="stamp">Traçabilité<br>garantie</span>' +
            '<div><h3>D\'où vient ce produit ?</h3>' +
            '<p>Produit dans nos fermes au Maroc, collecté et conditionné en circuit ultra-court. ' +
            'Sans conservateurs, sans soja, sans glyphosate.</p></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<section class="section">' +
        '<div class="section-head"><h2>Vous aimerez aussi</h2>' +
          '<svg class="chevron" viewBox="0 0 40 14" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2.5 20 11.5 37 2.5"/></svg>' +
        '</div>' +
        '<div class="products">' + related.map(productCard).join("") + '</div>' +
      '</section>';

    var form = $("#pdp-form");
    var qtyEl = $("#qty-value");
    var priceEl = $("#pdp-price");
    var totalEl = $("#pdp-total");

    function refreshTotals() {
      if (qtyEl) qtyEl.textContent = qty;
      if (totalEl) totalEl.textContent = money(price * qty);
    }

    form.addEventListener("click", function (e) {
      var step = e.target.closest("[data-step]");
      if (step) {
        qty = Math.max(1, Math.min(20, qty + Number(step.getAttribute("data-step"))));
        refreshTotals();
        return;
      }

      var v = e.target.closest(".variant");
      if (v) {
        $$(".variant", form).forEach(function (x) { x.classList.remove("is-active"); });
        v.classList.add("is-active");
        price = Number(v.getAttribute("data-price")) || price;
        if (priceEl) priceEl.textContent = money(price);
        refreshTotals();
        return;
      }

      if (e.target.closest("[data-add]")) {
        var label = variants ? $$(".variant", form).filter(function (x) { return x.classList.contains("is-active"); })[0] : null;
        var baseName = p.name.replace(/\s*-\s*\([^)]*\)\s*$/, "");
        addToCart({
          name: label ? baseName + " — " + label.textContent.trim() : p.name,
          price: price,
          img: p.img
        }, qty);
        toast("Ajouté au panier", "panier.html", "Voir le panier");
      }
    });

    // Données structurées pour les moteurs de recherche
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      description: p.description || p.short,
      image: p.img,
      brand: { "@type": "Brand", name: "Les Domaines" },
      offers: {
        "@type": "Offer",
        priceCurrency: "MAD",
        price: String(p.price),
        availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    });
    document.head.appendChild(ld);
  }

  /* ------------------------ Ajout au panier global ----------------------- */

  function initAddButtons() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-add]");
      if (!btn || btn.closest("#pdp-form")) return; // la fiche produit gère son propre bouton

      var slug = btn.getAttribute("data-add");
      if (!slug) return;
      var p = findProduct(decodeURIComponent(slug));
      if (!p) return;

      addToCart({ name: p.name, price: p.price, img: p.img }, 1);
      toast("Ajouté au panier", "panier.html", "Voir le panier");
    });
  }

  /* ------------------------------ Page panier ---------------------------- */

  function initCartPage() {
    var root = $("#cart-root");
    if (!root) return;

    function render() {
      var cart = readCart();
      var listEl = $("#cart-list");
      var summaryEl = $("#cart-summary");

      if (!cart.length) {
        listEl.innerHTML = '<div class="cart-empty">Votre panier est vide.<br>' +
          '<a href="categorie.html">Découvrir nos produits</a></div>';
        summaryEl.innerHTML =
          '<h2>Récapitulatif</h2>' +
          '<p class="summary-row">Sous-total <strong>0,00 Dhs</strong></p>' +
          '<p class="summary-row summary-row--total">Total <strong>0,00 Dhs</strong></p>' +
          '<a class="btn btn--block" href="categorie.html">Continuer mes achats</a>';
        return;
      }

      var html = "", subtotal = 0;

      cart.forEach(function (it, idx) {
        var line = it.price * it.qty;
        subtotal += line;
        html +=
          '<div class="cart-row">' +
            '<img src="' + it.img + '" alt="">' +
            '<div class="cart-row-body">' +
              '<h3>' + escapeHtml(it.name) + '</h3>' +
              '<div class="qty" data-idx="' + idx + '">' +
                '<button type="button" data-step="-1" aria-label="Diminuer">−</button>' +
                '<span>' + it.qty + '</span>' +
                '<button type="button" data-step="1" aria-label="Augmenter">+</button>' +
              '</div>' +
            '</div>' +
            '<div style="text-align:right">' +
              '<div class="price">' + money(line) + '</div>' +
              '<button class="cart-remove" type="button" data-remove="' + idx + '">Retirer</button>' +
            '</div>' +
          '</div>';
      });

      listEl.innerHTML = html;

      var delivery = subtotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
      var total = subtotal + delivery;
      var remaining = Math.max(0, FREE_DELIVERY - subtotal);

      summaryEl.innerHTML =
        "<h2>Récapitulatif</h2>" +
        '<p class="summary-row">Sous-total <strong>' + money(subtotal) + '</strong></p>' +
        '<p class="summary-row">Livraison <strong>' + (delivery === 0 ? "Offerte" : money(delivery)) + '</strong></p>' +
        '<p class="summary-row summary-row--total">Total <strong>' + money(total) + '</strong></p>' +
        '<a class="btn btn--block" href="commande.html">Passer la commande</a>' +
        (delivery === 0
          ? '<p class="delivery-note">Livraison offerte 🎉</p>'
          : '<p class="delivery-note">Plus que ' + money(remaining) + " pour la livraison offerte</p>");
    }

    root.addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        var idx = Number(stepBtn.closest(".qty").getAttribute("data-idx"));
        var cart = readCart();
        if (!cart[idx]) return;
        cart[idx].qty += Number(stepBtn.getAttribute("data-step"));
        if (cart[idx].qty < 1) cart.splice(idx, 1);
        writeCart(cart);
        render();
        return;
      }
      var removeBtn = e.target.closest("[data-remove]");
      if (removeBtn) {
        var c2 = readCart();
        c2.splice(Number(removeBtn.getAttribute("data-remove")), 1);
        writeCart(c2);
        render();
      }
    });

    render();
  }

  /* ---------------------------- Recherche header ------------------------- */

  function initSearch() {
    $$("form.search").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=search]");
        var q = (input && input.value || "").trim();
        window.location.href = "categorie.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      });
    });
  }

  /* --------------------------- Bouton retour haut ------------------------ */

  function initBackToTop() {
    var btn = $("#back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------- Init --------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initFeatured();
    initCarousel();
    initCookie();
    initCatalog();
    initProductPage();
    initAddButtons();
    initCartPage();
    initSearch();
    initBackToTop();
    updateCartBadge();
  });
})();
