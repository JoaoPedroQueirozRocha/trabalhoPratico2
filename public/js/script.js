const container = document.getElementById("products");
const filter = document.getElementById("filter");
const category = {};

const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "../src/pages/pesquisa.html";
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);

    let selected = "all";
    filter.addEventListener("change", () => {
      selected = filter.value;
      constructor(selected);
    });

    //criaçao do select de categoria
    json.forEach((value) => {
      category[value.category] = true;
    });
    Object.keys(category).forEach((categories) => {
      const option = document.createElement("option");
      option.textContent = categories;
      filter.appendChild(option);
    });

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

    function constructor(selected) {
      if (selected === "all") {
        container.innerHTML = "";
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
      } else {
        const productsByClass = json.filter((element) => {
          return element.category === selected;
        });
        container.innerHTML = "";
        productsByClass.forEach((element) => {
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
        });
      }
    }
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
