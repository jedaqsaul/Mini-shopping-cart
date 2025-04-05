const BASE_URL = "http://localhost:3000";

// fetch products and display them
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((products) => {
      const productsContainer = document.getElementById("products");
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price :$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
        productsContainer.appendChild(productDiv);
      });
    })
    .catch((err) => {
      console.error("Error fetching products: ", err);
    });
}
