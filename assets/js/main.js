let currentCategory="All";const searchForm=document.getElementById("search-product-form"),API_BASE_URL="https://dummyjson.com",PRODUCTS_URL=API_BASE_URL+"/products",CATEGORIES_URL=API_BASE_URL+"/products/categories";let debounceTimer;async function fetchData(e){try{var t=await fetch(e);return t.ok||handleFetchError(error),await t.json()}catch(e){handleFetchError(e)}}async function getAllProducts(){return fetchData(PRODUCTS_URL).then(e=>e.products)}async function getProductsOfCategory(e){return fetchData(PRODUCTS_URL+"/category/"+e).then(e=>e.products)}async function getAllCategories(){return fetchData(CATEGORIES_URL)}function addClickListenerToNavs(e){e.forEach(t=>{t.addEventListener("click",async()=>{var e=t.textContent.trim();"All"===(currentCategory=e)?(currentCategory="All",displayMyData(getAllProducts,displayProducts)):displayProducts(await getProductsOfCategory(e))})})}function debounceSearch(e,t){clearTimeout(debounceTimer),debounceTimer=setTimeout(async()=>{displayProducts(searchByCategory(await searchProduct(e)))},t)}async function searchProduct(e){try{return(await(await fetch(PRODUCTS_URL+"/search?q="+e)).json()).products}catch(e){handleFetchError(e)}}function displayProducts(e){var t=document.getElementById("content");let a="";if(0<e.length)for(const r of e)a+=`
          <div class="col-md-4 row-eq-height mb-5" >
              <div class="card p-2">
                  <a class="img-container" href="details.html?id=${r.id}">
                  <img src="${r.images[0]}" class=" img-fluid product-img" alt="Image">
                  </a>
                  <div class="card-body mt-2">
                      <div class="d-flex align-items-center justify-content-between">
                          <div>
                              <h5 class="card-title">${r.title}</h5>
                              <p class="card-text"> Category: ${r.category}</p>
                          </div>
                          <div>
                              <span class="d-block">Price: ${r.price}$</span>
                          </div>
                      </div>
                      <div>
                          <span class="d-block mt-3"> ${r.description}</span>
                      </div>
                  </div>
              </div>
          </div>
      `;else a='<div class="d-flex justify-content-center"><p>No Available Products</p></div>';t.innerHTML=a,searchForm.elements[0].value=""}async function displayMyData(e,t){t(await e())}function generateCategories(e){var t=document.getElementById("categories");let a=' <li class="nav-item"> <a class="nav-link active"> All </a></li>';for(const r of e)a+=` <li class="nav-item"> <a class="nav-link text-capitalize"> ${r} </a></li>`;t.innerHTML=a,addClickListenerToNavs(document.querySelectorAll(".nav-link"))}function searchByCategory(e){return e.filter(e=>e.category==currentCategory)}function handleFetchError(e){console.error("An error occurred while fetching data:",e)}searchForm.addEventListener("submit",e=>{e.preventDefault(),debounceSearch(searchForm.elements[0].value,500)}),displayMyData(getAllCategories,generateCategories),displayMyData(getAllProducts,displayProducts);