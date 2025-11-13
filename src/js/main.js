"use strict";

/* ============================
    QUERY SELECTOR
  ============================ */

const dataProducts = document.querySelector(".js_data_products");
const searchButton = document.querySelector(".js_search_button");
const searchInput = document.querySelector(".js_search_input");
const cartList = document.querySelector(".js_cart_list");
const deleteCartButton = document.querySelector(".js_delete_car");

/* ============================
    DATOS
  ============================ */

let products = [];
let cart = [];

/* ============================
    FUNCIONES
  ============================ */

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
          src="${oneProduct.image || "https://placehold.co/600x400"}"
          alt="${oneProduct.title}"
          class="products-image"
        />
        <h3 class="products-title">${oneProduct.title}</h3>
        <p class="products-price">${oneProduct.price} €</p>
        <button class="btn-add-product-to-cart ${buttonClass}" data-id="${
    oneProduct.id
  }">
          ${buttonText}
        </button>
      </li>
    `;
}

//Renderizar el carrito
function renderCart() {
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Tu carrito está vacío</li>";
    deleteCartButton.style.display = "none"; // Oculta el botón
    return;
  }
  // Si hay productos
  deleteCartButton.style.display = "block"; // Muestra el botón

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

  // Renderizar ambas listas al añadir y quitar productos del carrito
  renderProducts(products);
  renderCart();
}

//Elimina un producto específico del carrito cuando haces click en el botón de eliminar (la "x")
function handleRemoveFromCart(event) {
  const id = parseInt(event.currentTarget.dataset.id);
  cart = cart.filter((p) => p.id !== id);
  renderProducts(products);
  renderCart();
}

//Tomamos el array con la lista de productos y la pintamos en el HTML
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

//Vaciar carrito
function handleClearCart() {
  // Vaciar el array del carrito
  cart = [];

  // Guardar el cambio en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Volver a renderizar carrito y productos
  renderCart();
  renderProducts(products);
}

/* ============================
    EVENTOS
  ============================ */

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

//Click en el botón vaciar carrito
deleteCartButton.addEventListener("click", handleClearCart);

/* ===============================
    ACCIONES AL CARGAR LA PÁGINA
  ================================ */

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
    });
} else {
  //Sí: usamos la que está en el localStorage
  products = productsInLocalStorage;
  renderProducts(products);
}
