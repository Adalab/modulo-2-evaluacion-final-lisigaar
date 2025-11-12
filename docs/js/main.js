const i=document.querySelector(".js_data_products"),p=document.querySelector(".js_search_button"),f=document.querySelector(".js_search_input"),l=document.querySelector(".js_cart_list");let o=[],n=[];function m(t){const e=t.toLowerCase(),r=o.filter(s=>s.title.toLowerCase().includes(e));a(r)}function h(t){const e=n.find(c=>c.id===t.id),r=e?"added":"",s=e?"Eliminar":"Comprar";return`
      <li class="products">
        <img
          src="${t.image||"https://placehold.co/600x400"}"
          alt="${t.title}"
          class="products-image"
        />
        <h3 class="products-title">${t.title}</h3>
        <p class="products-price">${t.price} €</p>
        <button class="btn-add-product-to-cart ${r}" data-id="${t.id}">
          ${s}
        </button>
      </li>
    `}function u(){if(n.length===0){l.innerHTML="<li>Tu carrito está vacío</li>";return}let t="";for(const r of n)t+=`
        <li>
          <span>${r.title}</span>
          <button class="remove-btn" data-id="${r.id}">x</button>
        </li>
      `;l.innerHTML=t;const e=document.querySelectorAll(".remove-btn");for(const r of e)r.addEventListener("click",b)}function g(t){const e=parseInt(t.currentTarget.dataset.id),r=o.find(c=>c.id===e);n.find(c=>c.id===e)?n=n.filter(c=>c.id!==e):n.push(r),a(o),u()}function b(t){const e=parseInt(t.currentTarget.dataset.id);n=n.filter(r=>r.id!==e),a(o),u()}function a(t){if(t.length===0)i.innerHTML="<li>¡No hay productos!</li>";else{let r="";for(const s of t)r+=h(s);i.innerHTML=r}const e=document.querySelectorAll(".btn-add-product-to-cart");for(const r of e)r.addEventListener("click",g)}p.addEventListener("click",t=>{t.preventDefault();const e=f.value.trim();e===""?a(o):m(e)});const d=JSON.parse(localStorage.getItem("productBackup"));d===null?fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{o=t,localStorage.setItem("productBackup",JSON.stringify(o)),a(o)}).catch(t=>{console.error("Error al obtener los datos de la API:",t),i&&(i.innerHTML="<li>Error al cargar los productos. Por favor, intente recargar la página.</li>")}):(o=d,a(o));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
