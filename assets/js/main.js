let currentCategory = 'All';
const searchForm = document.getElementById('search-product-form')
const API_BASE_URL = 'https://dummyjson.com';
const PRODUCTS_URL = `${API_BASE_URL}/products`;
const CATEGORIES_URL = `${API_BASE_URL}/products/categories`;
let debounceTimer;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      handleFetchError(error);
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}
async function getAllProducts() {
  return fetchData(PRODUCTS_URL).then(data => data.products);
}

async function getProductsOfCategory(category) {
  return fetchData(`${PRODUCTS_URL}/category/${category}`).then(data => data.products);

}

async function getAllCategories() {
  return fetchData(CATEGORIES_URL);
}

function addClickListenerToNavs(categoryList) {
  categoryList.forEach((categoryListItem) => {
    categoryListItem.addEventListener('click', async () => {
      const category = categoryListItem.textContent.trim();
      currentCategory = category;
      if (category === "All") {
        currentCategory = "All";
        displayMyData(getAllProducts, displayProducts);
      } else {
        const products = await getProductsOfCategory(category);
        displayProducts(products);
      }
    });
  });
}

function debounceSearch(query, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const products = await searchProduct(query);
    const filteredProducts = searchByCategory(products);
    displayProducts(filteredProducts);
  }, delay);
}

async function searchProduct(query) {
  try {
    const response = await fetch(`${PRODUCTS_URL}/search?q=${query}`);
    const filteredProducts = await response.json();
    return filteredProducts.products;


  } catch (error) {
    handleFetchError(error)
  }
}

function displayProducts(products) {
  const content = document.getElementById('content');
  let result = '';
  if (products.length > 0) {
    for (const product of products) {
      result += `
          <div class="col-md-4 row-eq-height mb-5" >
              <div class="card p-2">
                  <a class="img-container" href="details.html?id=${product.id}">
                  <img src="${product.images[0]}" class=" img-fluid product-img" alt="Image">
                  </a>
                  <div class="card-body mt-2">
                      <div class="d-flex align-items-center justify-content-between">
                          <div>
                              <h5 class="card-title">${(product.title)}</h5>
                              <p class="card-text"> Category: ${product.category}</p>
                          </div>
                          <div>
                              <span class="d-block">Price: ${product.price}$</span>
                          </div>
                      </div>
                      <div>
                          <span class="d-block mt-3"> ${product.description}</span>
                      </div>
                  </div>
              </div>
          </div>
      `;
    }
  } else {
    result = '<div class="d-flex justify-content-center"><p>No Available Products</p></div>'
  }

  content.innerHTML = result;
  searchForm.elements[0].value = "";

}

async function displayMyData(callback, display) {
  const data = await callback()
  display(data)
}

function generateCategories(categories) {
  const categoriesList = document.getElementById('categories');

  let result = ` <li class="nav-item"> <a class="nav-link active"> All </a></li>`;
  for (const category of categories) {
    result += ` <li class="nav-item"> <a class="nav-link text-capitalize"> ${category} </a></li>`;
  }
  categoriesList.innerHTML = result;
  let categoryList = document.querySelectorAll('.nav-link');
  addClickListenerToNavs(categoryList);
}

function searchByCategory(products) {
  return products.filter((product) => product.category == currentCategory)
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchForm.elements[0].value;
  debounceSearch(query, 500);


});

function handleFetchError(error) {
  console.error('An error occurred while fetching data:', error);
}

displayMyData(getAllCategories, generateCategories)
displayMyData(getAllProducts, displayProducts)