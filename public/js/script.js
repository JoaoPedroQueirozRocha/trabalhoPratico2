const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "../src/pages/pesquisa.html";
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    const container = document.getElementById("products");
    console.log(json);

    json.forEach((element) => {
      const rating = element.rating.rate;
      const starHtml = getStars(rating);
      container.innerHTML += `
        <div class="item ${element.category}" id="${element.id}">
            <div class="name">${element.title}</div>
            <div class="image"><img class="img" src="${element.image}"></div>
            <div class="price">R$${element.price}</div>
            <div class="rating">${starHtml}</div>
            <div>${element.rating.rate}</div>
        </div>
    `;

      const itemDiv = document.querySelectorAll(".item");
      itemDiv.forEach((divItem) => {
        divItem.addEventListener("click", () => {
          const itemId = divItem.id;
          window.location.href = `../src/pages/item.html?id=${itemId}`;
        });
      });
    });
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
