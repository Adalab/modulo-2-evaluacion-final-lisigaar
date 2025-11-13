"use strict";

//QUERY SLECTOR

const dataProducts = document.querySelector(".js_data_products");
const searchButton = document.querySelector(".js_search_button");
const searchInput = document.querySelector(".js_search_input");
const cartList = document.querySelector(".js_cart_list");

//DATOS

let products = [];
let cart = []; 

//FUNCIONES

/*
function renderOneProducts(oneProducts) {
  const html = `
  <li class="products"> 
    <img
      src="${oneProducts.image}"
      alt="Imagen del producto"
      class="products-image"/>
    <h3 class="products-title">${oneProducts.title}</h3>
    <p class="products-price">${oneProducts.price}</p>
    <button class="btn-add-product-to-cart">Comprar</button>
  </li> `; 
  return html;
}*/

//Filtrar por nombre
function filterProductsByName(searchText) {
    // Convertimos el texto de búsqueda a minúsculas
    const lowerSearch = searchText.toLowerCase();
  
    // Filtramos los productos cuyo título incluye el texto buscado
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(lowerSearch)
    );
  
    // Renderizamos el resultado
    renderProducts(filteredProducts);
  }

 // Renderizar los productos con botón dinámico
  function renderOneProducts(oneProduct) {
    const isInCart = cart.find((item) => item.id === oneProduct.id);
  
    const buttonClass = isInCart ? "added" : "";
    const buttonText = isInCart ? "Eliminar" : "Comprar";
  
    return `
      <li class="products">
        <img
          src="${oneProduct.image || 'https://placehold.co/600x400'}"
          alt="${oneProduct.title}"
          class="products-image"
        />
        <h3 class="products-title">${oneProduct.title}</h3>
        <p class="products-price">${oneProduct.price} €</p>
        <button class="btn-add-product-to-cart ${buttonClass}" data-id="${oneProduct.id}">
          ${buttonText}
        </button>
      </li>
    `;
  }

//Renderizar el carrito
  function renderCart() {
    if (cart.length === 0) {
      cartList.innerHTML = "<li>Tu carrito está vacío</li>";
      return;
    }
  
    let html = "";
    for (const item of cart) {
      html += `
        <li>
          <span>${item.title}</span>
          <button class="remove-btn" data-id="${item.id}">x</button>
        </li>
      `;
    }
    cartList.innerHTML = html;
  
    // Escuchar clicks en los botones de eliminar del carrito
    const removeButtons = document.querySelectorAll(".remove-btn");
    for (const btn of removeButtons) {
      btn.addEventListener("click", handleRemoveFromCart);
    }
  }

  //Añadir y quitar productos del carrito
  function handleAddToCart(event) {
    const clickedId = parseInt(event.currentTarget.dataset.id);
    const product = products.find((p) => p.id === clickedId);
    const existing = cart.find((p) => p.id === clickedId);
  
    if (!existing) {
      // Añadir al carrito
      cart.push(product);
    } else {
      // Quitar del carrito
      cart = cart.filter((p) => p.id !== clickedId);
    }
  
    //Añadir y quitar productos del carrito
    // Renderizar ambas listas
    renderProducts(products);
    renderCart();
  }

  function handleRemoveFromCart(event) {
    const id = parseInt(event.currentTarget.dataset.id);
    cart = cart.filter((p) => p.id !== id);
    renderProducts(products);
    renderCart();
  }
  
  function renderProducts(productsList) {
    if (productsList.length === 0) {
      dataProducts.innerHTML = "<li>¡No hay productos!</li>";
    } else {
      let html = "";
      for (const oneProduct of productsList) {
        html += renderOneProducts(oneProduct);
      }
      dataProducts.innerHTML = html;
    }
  
    // Conectar los botones de compra
    const buyButtons = document.querySelectorAll(".btn-add-product-to-cart");
    for (const btn of buyButtons) {
      btn.addEventListener("click", handleAddToCart);
    }
  }

//EVENTOS

//Click para filtrar por el título en el input
searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
  
    const searchValue = searchInput.value.trim();
  
    if (searchValue === "") {
      // Si el campo está vacío, mostramos todos los productos
      renderProducts(products);
    } else {
      // Si hay texto, filtramos por nombre
      filterProductsByName(searchValue);
    }
  });
  

//ACCIONES AL CARGAR LA PÁGINA

//Sacamos la información del localStorage

const productsInLocalStorage = JSON.parse(
  localStorage.getItem("productBackup")
);

//Si ya tenemos la variable y los datos en el localStorage

if (productsInLocalStorage === null) {
  //No: obtenemos los datos desde el fetch
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((responseData) => {
      // Guardar los datos en la variable del código
      products = responseData;

      // Guardar en el localStorage
      localStorage.setItem("productBackup", JSON.stringify(products));

      renderProducts(products);
    })
    .catch((error) => {
      console.error("Error al obtener los datos de la API:", error);
      if (dataProducts) {
        dataProducts.innerHTML =
          "<li>Error al cargar los productos. Por favor, intente recargar la página.</li>";
      }
    });
} else {
  //Sí: usamos la que está en el localStorage
  products = productsInLocalStorage;
  renderProducts(products);
}

/*fetch ('https://fakestoreapi.com/products')
.then (res => res.json ())
.then (responseData => {
    
products = responseData;
});

renderProducts(products);*/

/*const oneBooks = {
    title: "Cocina con Coqui",
    price: "30.00 €",
    image: "./images/cocina-bonito.jpg",
};

const html = renderOneBooks (oneBooks);*/

/*const html = `
  <li class="books"> 
    <img
      src="${booksList.image[0]}"
      alt="Imagen del libro"
      class="book-image"/>
    <h3 class="book-title">${booksList.title[0]}</h3>
    <p class="book-price">${booksList.price[0]}</p>
    <button class="btn-add-book-to-cart">Comprar</button>
  </li> `;
  
  dataBooks.innerHTML = html;*/

/*const booksOneTitle = 'Cocina con Coqui';
const booksOnePrice = '30.00 €';
const booksOneImage = './images/cocina-con-coqui.jpg';

const booksTwoTitle = 'Cocina bonito, cocina sano';
const booksTwoPrice = '35.00 €';
const booksTwoImage = './images/cocina-bonito.jpg';

const booksThreeTitle = 'Cocina con Noelia';
const booksThreePrice = '25.00 €';
const booksThreeImage = './images/cocina-noelia.jpg';*/

/*const oneBooksList = `
  <li class="books"> 
    <img
      src="${booksList.image[0]}"
      alt="Imagen del libro"
      class="book-image"/>
    <h3 class="book-title">${booksList.title[0]}</h3>
    <p class="book-price">${booksList.price[0]}</p>
    <button class="btn-add-book-to-cart">Comprar</button>
  </li> `;

const twoBooksList = `
  <li class="books">
    <img
      src="${booksList.image[1]}"
      alt="Imagen del libro"
      class="book-image"/>
    <h3 class="book-title">${booksList.title[1]}</h3>
    <p class="book-price">${booksList.price[1]}</p>
    <button class="btn-add-book-to-cart">Comprar</button>
  </li> `;

const threeBooksList = `
  <li class="books">
    <img
      src="${booksList.image[2]"
      alt="Imagen del libro"
      class="book-image"/>
    <h3 class="book-title">${booksList.title[2]}</h3>
    <p class="book-price">${booksList.price[2]</p>
    <button class="btn-add-book-to-cart">Comprar</button>
  </li> `;

dataBooks.innerHTML = oneBooksList;
dataBooks.innerHTML += twoBooksList;
dataBooks.innerHTML += threeBooksList; */
