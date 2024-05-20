// Wacht tot het volledige DOM geladen is
document.addEventListener("DOMContentLoaded", () => {
  // Selecteer de nodige elementen uit de DOM
  const productList = document.querySelector(".product-list");
  const cartItems = document.querySelector(".cart-items");
  const totalValue = document.querySelector(".total-value");

  // Initialisatie van de winkelwagen en productlijst arrays
  let cart = [];
  let products = [];

  // Voeg een event listener toe aan de productlijst voor klikacties
  document
    .querySelector(".product-list")
    .addEventListener("click", function (event) {
      // Controleer of er op een wensenlijst icoon is geklikt
      if (event.target && event.target.matches(".wishlist-icon")) {
        // Schakel de wensenlijst status van het element
        toggleWishlist(event.target);
      }
    });

  // Functie om de wensenlijst status van een element te schakelen
  function toggleWishlist(element) {
    element.classList.toggle("wishlist-active");
  }

  // Laad producten in de productlijst
  function loadProducts(products) {
    products.forEach((product) => {
      // Maak een nieuw product element
      const productDiv = document.createElement("div");
      productDiv.className = "product-item";
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <a href="productDetails.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}">
    </a>
        <p>Prijs: €${product.price}</p>
        <button onclick="addToCart(${product.id})">Toevoegen aan mandje</button>
        <span class="wishlist-icon" onclick="toggleWishlist(this)">&#9829;</span>
      `;
      // Voeg het nieuwe product element toe aan de lijst
      productList.appendChild(productDiv);
    });
  }

  // Voeg een product toe aan de winkelwagen
  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      // Verhoog de hoeveelheid als het product al in de winkelwagen zit
      existingItem.quantity += 1;
    } else {
      // Voeg het nieuwe product toe aan de winkelwagen
      cart.push({ ...product, quantity: 1 });
    }
    // Update de winkelwagen UI
    updateCartUI();
  };

  // Verhoog de hoeveelheid van een product in de winkelwagen
  function increaseQuantity(productId) {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
      // Update de winkelwagen UI
      updateCartUI();
    }
  }

  // Verlaag de hoeveelheid van een product in de winkelwagen
  function decreaseQuantity(productId) {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex > -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        // Verwijder het product uit de winkelwagen als de hoeveelheid 0 is
        cart.splice(productIndex, 1);
      }
      // Update de winkelwagen UI
      updateCartUI();
    }
  }

  // Verwijder een product uit de winkelwagen
  function removeFromCart(productId) {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex > -1) {
      // Verwijder het product uit de winkelwagen
      cart.splice(productIndex, 1);
      // Update de winkelwagen UI
      updateCartUI();
    }
  }

  // Update de UI van de winkelwagen
  function updateCartUI() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      // Maak een nieuw winkelwagen item element
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      const priceWithoutVAT = (item.price * item.quantity).toFixed(2);
      const priceWithVAT = (item.price * item.quantity * 1.21).toFixed(2);
      itemDiv.innerHTML = `
      <p>${item.name} x ${item.quantity}</p>
      <div class="cart-item-image">
      <img src="${item.image}" alt="${item.name}"></div>
      <p>€${(item.price * item.quantity).toFixed(2)}</p>
      <button class="decrease" data-id="${item.id}">-</button>
      <button class="increase" data-id="${item.id}">+</button>
      <button class="remove" data-id="${item.id}">Verwijderen</button>
        `;
      // Voeg het item toe aan de winkelwagen UI
      cartItems.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
    // Toon het totaalbedrag
    const totalWithoutVAT = total.toFixed(2);
    const totalWithVAT = (total * 1.21).toFixed(2);
    totalValue.textContent = `Totaal: €${total.toFixed(2)}, €${(
      total * 1.21
    ).toFixed(2)} (incl. BTW)`;
  }

  // Voeg een event listener toe voor het aanpassen van de winkelwagen
  document.addEventListener("click", function (e) {
    if (e.target && e.target.className == "increase") {
      increaseQuantity(parseInt(e.target.getAttribute("data-id")));
    } else if (e.target && e.target.className == "decrease") {
      decreaseQuantity(parseInt(e.target.getAttribute("data-id")));
    } else if (e.target && e.target.className == "remove") {
      removeFromCart(parseInt(e.target.getAttribute("data-id")));
    }
  });

  // Haal producten op uit een extern JSON-bestand en laad deze in
  fetch("json/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      loadProducts(products);
    })
    .catch((error) =>
      console.error("Fout bij het laden van producten:", error)
    );
});
