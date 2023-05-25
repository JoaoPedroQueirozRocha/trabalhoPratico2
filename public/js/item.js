const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

fetch(`https://fakestoreapi.com/products/${itemId}`)
  .then((res) => res.json())
  .then((json) => {
    const element = json;
    produto.innerHTML = `
        <div class="item" id="${element.id}">
            <div id="titleImg">
              <div class="name"><h3>${element.title}</h3></div>
              <div class="image"><img class="img" src="${element.image}"></div>
            </div>
            <div id="details">
              <h2>Descrição</h2>
              <div class="description">${
                element.description.charAt(0).toUpperCase() +
                element.description.slice(1)
              }</div>               
              <div id="buy">
                <button id="btnComprar">Comprar</button>
                <div class="price">R$${element.price}</div>
              </div>
            </div>
        </div>
        `;
  });

function getStars(rating) {
  let starHtml = "";
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starHtml += '<i class="fa fa-star"></i>';
    } else if (halfStar && i === fullStars) {
      starHtml += '<i class="fa fa-star-half"></i>';
    } else {
      starHtml += '<i class="fa fa-star-o"></i>';
    }
  }
  return starHtml;
}
