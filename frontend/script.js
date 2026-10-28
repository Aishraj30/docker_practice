
const API_URL = "/api/products";

const form = document.getElementById("product-form");
const productsDiv = document.getElementById("products");
const message = document.getElementById("message");

async function loadProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    const products = await response.json();
    productsDiv.replaceChildren();

    if (products.length === 0) {
      productsDiv.textContent = "No products available.";
      return;
    }

    products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "product";

      const details = document.createElement("span");
      details.textContent =
        `${product.name} — ₹${product.price} — Stock: ${product.stock}`;

      const button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", () => deleteProduct(product._id));

      item.append(details, button);
      productsDiv.appendChild(item);
    });
  } catch (error) {
    productsDiv.textContent = "Backend unavailable. Start the backend first.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const product = {
    name: document.getElementById("name").value.trim(),
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Could not add product");

    message.textContent = "Product added successfully!";
    form.reset();
    await loadProducts();
  } catch (error) {
    message.textContent = "Failed to add product. Check the backend.";
  }
});

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Could not delete product");

    message.textContent = "Product deleted successfully!";
    await loadProducts();
  } catch (error) {
    message.textContent = "Failed to delete product.";
  }
}

loadProducts();
