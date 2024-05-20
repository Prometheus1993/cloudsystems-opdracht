fetch("json/products.json")
  .then((response) => response.json())
  .then((products) => {
    const productId = new URLSearchParams(window.location.search).get("id");
    const thisProduct = products.find(
      (product) => product.id === parseInt(productId, 10)
    );
    if (thisProduct) {
      showProductDetails(thisProduct);
    } else {
      console.error("Product not found");
    }
  })
  .catch((error) => console.error("Error fetching product details:", error));

document
  .querySelector(".product-list")
  .addEventListener("click", function (event) {
    if (event.target && event.target.matches(".wishlist-icon")) {
      toggleWishlist(event.target);
    }
  });
function toggleWishlist(element) {
  element.classList.toggle("wishlist-active");
}

function showProductDetails(product) {
  document.querySelector(".image img").src = product.image;
  document.querySelector(".name").innerText = product.name;
  document.querySelector(".price").innerText = "€" + product.price;
  document.querySelector(".description").innerText = product.description;
}
