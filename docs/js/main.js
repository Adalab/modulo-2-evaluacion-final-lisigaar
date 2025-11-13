const d=document.querySelector(".js_data_products"),f=document.querySelector(".js_search_button"),m=document.querySelector(".js_search_input"),u=document.querySelector(".js_cart_list"),i=document.querySelector(".js_delete_car");let r=[],c=[];function h(t){const e=t.toLowerCase(),n=r.filter(a=>a.title.toLowerCase().includes(e));s(n)}function g(t){const e=c.find(o=>o.id===t.id),n=e?"added":"",a=e?"Eliminar":"Comprar";return`
      <li class="products">
        <img
          src="${t.image||"https://placehold.co/600x400"}"
          alt="${t.title}"
          class="products-image"
        />
        <h3 class="products-title">${t.title}</h3>
        <p class="products-price">${t.price} €</p>
        <button class="btn-add-product-to-cart ${n}" data-id="${t.id}">
          ${a}
        </button>
      </li>
    `}function l(){if(c.length===0){u.innerHTML="<li>Tu carrito está vacío</li>",i.style.display="none";return}i.style.display="block";let t="";for(const n of c)t+=`
      <li>
        <span>${n.title}</span>
        <button class="remove-btn" data-id="${n.id}">x</button>
      </li>
    `;u.innerHTML=t;const e=document.querySelectorAll(".remove-btn");for(const n of e)n.addEventListener("click",b)}function y(t){const e=parseInt(t.currentTarget.dataset.id),n=r.find(o=>o.id===e);c.find(o=>o.id===e)?c=c.filter(o=>o.id!==e):c.push(n),s(r),l()}function b(t){const e=parseInt(t.currentTarget.dataset.id);c=c.filter(n=>n.id!==e),s(r),l()}function s(t){if(t.length===0)d.innerHTML="<li>¡No hay productos!</li>";else{let n="";for(const a of t)n+=g(a);d.innerHTML=n}const e=document.querySelectorAll(".btn-add-product-to-cart");for(const n of e)n.addEventListener("click",y)}function S(){c=[],localStorage.setItem("cart",JSON.stringify(c)),l(),s(r)}f.addEventListener("click",t=>{t.preventDefault();const e=m.value.trim();e===""?s(r):h(e)});i.addEventListener("click",S);const p=JSON.parse(localStorage.getItem("productBackup"));p===null?fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{r=t,localStorage.setItem("productBackup",JSON.stringify(r)),s(r)}):(r=p,s(r));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
