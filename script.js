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
  //problems here
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

function toogleCart() {
  const cartSection = document.getElementById("cart");
  const isVisible = cartSection.style.display === "block"; //problem here

  if (isVisible) {
    cartSection.style.display = "none";
  } else {
    cartSection.style.display = "block";
    fetchCartItems();
  }
}

//I have understood absolutely nothing in the toogleCart function
function fetchCartItems() {
  fetch(`${BASE_URL}/cart`)
    .then((res) => res.json())
    .then((cartItems) => {
      const cartContainer = document.getElementById("cart-items");
      cartContainer.innerHTML = ""; //clear previous cart

      cartItems.forEach((item) => {
        const cartDiv = document.createElement("div");
        cartDiv.className = "cart-item";
        cartDiv.innerHTML = `
          <p>${item.name} - $${item.price}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
          `;
        cartContainer.appendChild(cartDiv);
      });
    });
}
