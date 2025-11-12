# 🛍️ AdaStore

AdaStore es una tienda online desarrollada como ejercicio de evaluación del **Módulo 2 (JavaScript)** en Adalab.  
La aplicación permite consultar productos desde una API, filtrarlos por nombre y añadirlos o quitarlos de un carrito de compra.  
Además, guarda los datos del carrito en el **LocalStorage** para mantenerlos tras recargar la página.

---

## 🚀 Funcionalidades principales

### ✅ Listado de productos
- Se obtienen dinámicamente desde la API pública: [https://fakestoreapi.com/products](https://fakestoreapi.com/products)
- Cada producto muestra una imagen, título, precio y un botón para comprar/eliminar.

### ✅ Búsqueda por nombre
- Al escribir en el campo de búsqueda y pulsar el botón **“Buscar”**, los productos se filtran por coincidencia parcial en el título.

### ✅ Carrito de compras
- Al hacer clic en **“Comprar”**, el producto se añade al carrito.
- El botón cambia a **“Eliminar”** y el color de fondo se invierte para indicar el estado.
- El carrito aparece debajo del buscador, en la columna izquierda, y se mantiene visible al realizar nuevas búsquedas.
- Se guarda automáticamente en el **localStorage**, por lo que se conserva al recargar la página.

### ✅ Bonus implementados
- ❌ Eliminar un producto individual del carrito (botón “x”).
- 🔁 Añadir o quitar productos desde la tarjeta del catálogo.
- 🗑️ Vaciar todo el carrito con un solo clic.
- ➕➖ Modificar la cantidad de productos en el carrito.
- 💾 Sincronización automática con el localStorage.

---

## 🧠 Tecnologías utilizadas
- **HTML5** – estructura base de la aplicación  
- **Sass (SCSS)** – estilos y variables de color  
- **JavaScript (ES6)** – lógica de la app, manejo del DOM y localStorage  
- **Fetch API** – para obtener datos externos  
- **LocalStorage API** – para persistencia de datos  

---

## 🎨 Paleta de colores

| Variable          | Color     | Uso                                  |
|-----------------|----------|--------------------------------------|
| $primary-color   | #4B0082  | Morado oscuro (header, botones activos) |
| $secondary-color | #FFC300  | Amarillo (botones de compra, acentos) |
| $text-color      | #333333  | Texto principal                       |
| $light-bg        | #F8F8F8  | Fondo general                          |
| $white           | #FFFFFF  | Fondos y textos invertidos             |

---

## 🧩 Estructura del proyecto

AdaStore/
│
├── index.html
├── /scss
│ └── main.scss
├── /js
│ └── main.js
└── /assets (opcional)

---

## ⚙️ Cómo arrancar el proyecto

1. Clona el repositorio:
```bash
git clone <URL-del-repositorio>
2. Accede a la carpeta del proyecto:
cd AdaStore
3.Instala las dependencias (si usas Sass compilado con npm):
npm install
4.Compila el Sass a CSS:
npm run compile:sass
(O usa la extensión Live Sass Compiler en VS Code)
5.Abre el proyecto en el navegador:
Si trabajas localmente: abre index.html con Live Server.
Si está publicado: visita el enlace de GitHub Pages indicado en la sección About del repositorio.

## 🧪 API de referencia

Fake Store API
Alternativa de respaldo: Adalab Resources JSON

---

## 👩‍💻 Autora
Proyecto realizado por Lis como ejercicio de evaluación del Módulo 2 (JavaScript) – Promo 58, Adalab 💛

---
