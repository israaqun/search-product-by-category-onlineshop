const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

try {
    getRecipe(id);
} catch (error) {
    console.error(error);
}

async function getRecipe(id) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (response.status === 200) {
            const product = await response.json();
            displayRecipe(product);
        } else {
            handleLoadingError();
        }
    } catch (error) {
        console.error(error);
        handleLoadingError();
    }
}

function displayRecipe(product) {
    const content = document.getElementById("content");
    content.innerHTML = `
    <div class="product-card">
    <div class="product-image">
      <img src="${product.thumbnail}" alt="Product Image">
    </div>
    <div class="product-details">
      <h1 class="product-title">${product.title}</h1>
      <p class="product-description">${product.description}</p>
      <p class="product-price">Price: ${product.price}</p>
      <p class="product-discount">Discount: ${product.discountPercentage}</p>
      <p class="product-final-price">Final Price: $479.04</p>
      <p class="product-rating">Rating: ${product.rating}</p>
      <p class="product-brand">Brand:${product.brand}</p>
    </div>
  </div>
    `;
}

function handleLoadingError() {
    console.error("Failed to load data.");
}