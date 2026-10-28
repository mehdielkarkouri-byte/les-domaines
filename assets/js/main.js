/* ==========================================================================
   Les Domaines — interactions
   Carrousel, panier (localStorage), bannière cookies, notifications.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------- Panier -------------------------------- */

  var CART_KEY = "ld_cart_v1";
  var FREE_DELIVERY = 100;

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(items) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {}
    updateCartBadge();
  }

  function addToCart(item, qty) {
    var cart = readCart();
    var q = qty || 1;
    var found = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        found = cart[i];
        break;
      }
    }
    if (found) {
      found.qty += q;
    } else {
      cart.push({
        name: item.name,
        price: Number(item.price) || 0,
        img: item.img || "",
        qty: q
      });
    }
    writeCart(cart);
  }

  function cartCount() {
    return readCart().reduce(function (sum, it) {
      return sum + (Number(it.qty) || 0);
    }, 0);
  }

  function money(n) {
    return (Math.round(n * 100) / 100).toFixed(2).replace(".", ",") + " Dhs";
  }

  function updateCartBadge() {
    var badges = document.querySelectorAll("[data-cart-count]");
    var n = cartCount();
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = n;
      badges[i].style.display = n ? "" : "none";
    }
  }

  /* -------------------------------- Toast -------------------------------- */

  var toastTimer = null;

  function toast(message, linkHref, linkLabel) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.innerHTML = "";
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
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  /* ------------------------------- Carrousel ----------------------------- */

  function initCarousel() {
    var slidesWrap = document.getElementById("slides");
    var dotsWrap = document.getElementById("dots");
    if (!slidesWrap || !dotsWrap) return;

    var slides = slidesWrap.querySelectorAll(".slide");
    if (!slides.length) return;

    var index = 0;
    var timer = null;
    var dots = [];

    for (var i = 0; i < slides.length; i++) {
      (function (i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Aller au visuel " + (i + 1));
        if (i === 0) b.className = "is-active";
        b.addEventListener("click", function () {
          go(i);
          restart();
        });
        dotsWrap.appendChild(b);
        dots.push(b);
      })(i);
    }

    function go(n) {
      index = (n + slides.length) % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle("is-active", i === index);
        dots[i].classList.toggle("is-active", i === index);
      }
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(function () {
        go(index + 1);
      }, 6000);
    }

    // Balayage tactile
    var startX = null;
    slidesWrap.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    slidesWrap.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) {
        go(dx < 0 ? index + 1 : index - 1);
        restart();
      }
      startX = null;
    });

    restart();
  }

  /* ---------------------------- Cookies banner --------------------------- */

  function initCookie() {
    var banner = document.getElementById("cookie");
    if (!banner) return;

    var KEY = "ld_cookie_consent";
    var accepted = null;
    try {
      accepted = localStorage.getItem(KEY);
    } catch (e) {}

    if (accepted) {
      banner.classList.add("is-hidden");
      return;
    }

    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookie-accept]");
      if (!btn) return;
      try {
        localStorage.setItem(KEY, String(Date.now()));
      } catch (err) {}
      banner.classList.add("is-hidden");
    });
  }

  /* --------------------------- Boutons panier ---------------------------- */

  function initAddButtons() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".add-btn");
      if (!btn) return;

      addToCart({
        name: btn.getAttribute("data-name"),
        price: btn.getAttribute("data-price"),
        img: btn.getAttribute("data-img")
      });

      toast("Ajouté au panier", "panier.html", "Voir le panier");
    });
  }

  /* ------------------------------ Page panier ---------------------------- */

  function initCartPage() {
    var root = document.getElementById("cart-root");
    if (!root) return;

    function render() {
      var cart = readCart();
      var listEl = document.getElementById("cart-list");
      var summaryEl = document.getElementById("cart-summary");

      if (!cart.length) {
        listEl.innerHTML =
          '<div class="cart-empty">Votre panier est vide.<br><a href="categorie.html">Découvrir nos produits</a></div>';
        summaryEl.innerHTML =
          '<h2>Récapitulatif</h2><p class="summary-row">Sous-total <strong>0,00 Dhs</strong></p>' +
          '<p class="summary-row summary-row--total">Total <strong>0,00 Dhs</strong></p>' +
          '<a class="btn btn--block" href="categorie.html">Continuer mes achats</a>';
        return;
      }

      var html = "";
      var subtotal = 0;

      cart.forEach(function (it, idx) {
        var line = it.price * it.qty;
        subtotal += line;
        html +=
          '<div class="cart-row">' +
            '<img src="' + it.img + '" alt="">' +
            '<div class="cart-row-body">' +
              '<h3>' + it.name + "</h3>" +
              '<div class="qty" data-idx="' + idx + '">' +
                '<button type="button" data-step="-1" aria-label="Diminuer">−</button>' +
                "<span>" + it.qty + "</span>" +
                '<button type="button" data-step="1" aria-label="Augmenter">+</button>' +
              "</div>" +
            "</div>" +
            '<div style="text-align:right">' +
              '<div class="price">' + money(line) + "</div>" +
              '<button class="cart-remove" type="button" data-remove="' + idx + '">Retirer</button>' +
            "</div>" +
          "</div>";
      });

      listEl.innerHTML = html;

      var delivery = subtotal >= FREE_DELIVERY || subtotal === 0 ? 0 : 25;
      var total = subtotal + delivery;
      var remaining = Math.max(0, FREE_DELIVERY - subtotal);

      summaryEl.innerHTML =
        "<h2>Récapitulatif</h2>" +
        '<p class="summary-row">Sous-total <strong>' + money(subtotal) + "</strong></p>" +
        '<p class="summary-row">Livraison <strong>' +
          (delivery === 0 ? "Offerte" : money(delivery)) + "</strong></p>" +
        '<p class="summary-row summary-row--total">Total <strong>' + money(total) + "</strong></p>" +
        '<a class="btn btn--block" href="commande.html">Passer la commande</a>' +
        (delivery === 0
          ? '<p class="delivery-note">Livraison offerte 🎉</p>'
          : '<p class="delivery-note">Plus que ' + money(remaining) + " pour la livraison offerte</p>");
    }

    root.addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        var qtyBox = stepBtn.closest(".qty");
        var idx = Number(qtyBox.getAttribute("data-idx"));
        var step = Number(stepBtn.getAttribute("data-step"));
        var cart = readCart();
        if (!cart[idx]) return;
        cart[idx].qty += step;
        if (cart[idx].qty < 1) cart.splice(idx, 1);
        writeCart(cart);
        render();
        return;
      }

      var removeBtn = e.target.closest("[data-remove]");
      if (removeBtn) {
        var cart2 = readCart();
        cart2.splice(Number(removeBtn.getAttribute("data-remove")), 1);
        writeCart(cart2);
        render();
      }
    });

    render();
  }

  /* ---------------------------- Page produit ----------------------------- */

  function initProductPage() {
    var form = document.getElementById("pdp-form");
    if (!form) return;

    var qty = 1;
    var price = 24.5;
    var qtyLabel = form.querySelector("#qty-value");
    var priceLabel = document.getElementById("pdp-price");

    form.addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        qty = Math.max(1, qty + Number(stepBtn.getAttribute("data-step")));
        qtyLabel.textContent = qty;
        return;
      }

      var variant = e.target.closest(".variant");
      if (variant) {
        var siblings = form.querySelectorAll(".variant");
        for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove("is-active");
        variant.classList.add("is-active");
        price = Number(variant.getAttribute("data-price")) || price;
        if (priceLabel) priceLabel.textContent = money(price);
        return;
      }

      var add = e.target.closest("[data-add]");
      if (add) {
        addToCart({
          name: add.getAttribute("data-name"),
          price: price,
          img: add.getAttribute("data-img")
        }, qty);
        toast("Ajouté au panier", "panier.html", "Voir le panier");
      }
    });
  }

  /* -------------------------------- Init --------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initCarousel();
    initCookie();
    initAddButtons();
    initCartPage();
    initProductPage();
    updateCartBadge();
  });
})();
