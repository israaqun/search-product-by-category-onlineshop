const urlParams=new URLSearchParams(window.location.search),id=urlParams.get("id");try{getRecipe(id)}catch(c){console.error(c)}async function getRecipe(c){try{var r=await fetch("https://dummyjson.com/products/"+c);200===r.status?displayRecipe(await r.json()):handleLoadingError()}catch(c){console.error(c),handleLoadingError()}}function displayRecipe(c){document.getElementById("content").innerHTML=`
    <div class="product-card">
    <div class="product-image">
      <img src="${c.thumbnail}" alt="Product Image">
    </div>
    <div class="product-details">
      <h1 class="product-title">${c.title}</h1>
      <p class="product-description">${c.description}</p>
      <p class="product-price">Price: ${c.price}</p>
      <p class="product-discount">Discount: ${c.discountPercentage}</p>
      <p class="product-final-price">Final Price: $479.04</p>
      <p class="product-rating">Rating: ${c.rating}</p>
      <p class="product-brand">Brand:${c.brand}</p>
    </div>
  </div>
    `}function handleLoadingError(){console.error("Failed to load data.")}