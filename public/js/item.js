const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

fetch(`https://fakestoreapi.com/products/${itemId}`)
  .then((res) => res.json())
  .then((json) => {
    const element = json;
    produto.innerHTML = `
        <div class="item" id="${element.id}">
            <div class="name">${element.title}</div>
            <div class="image"><img class="img" src="${element.image}"></div>
            <div class="price">R$${element.price}</div>
            <div class="description">${element.description}</div>   
        </div>
        `;
  });
