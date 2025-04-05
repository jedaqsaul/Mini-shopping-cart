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

function addToCart(productId) {
  // first, get the products details by Id
  fetch(`${BASE_URL}/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      //send the product to the cart
      fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((cartItem) => {
          alert(`${cartItem.name} added to cart!`);
        });
    })
    .catch((err) => console.error("Error adding to cart: ", err));
}
