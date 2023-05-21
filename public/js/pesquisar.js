const btnPesquisa = document.querySelector("#btnPesquisar");
const inputPesquisa = document.querySelector("#inputPesquisa");
const products = document.querySelector("#produtos");

let lista = []; //array para armazenar a lista de produtos

//event listener's para realizar a pesquisa no click do botão ou no enter
btnPesquisa.addEventListener("click", () => {
  search();
});

inputPesquisa.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});

function search() {
  const pesquisa = inputPesquisa.value.toLowerCase();

  const resultado = lista.filter((item) => {
    const regex = new RegExp(`(^|\\s)${pesquisa}\\b`, "i");
    return regex.test(item.title);
  });

  products.innerHTML = "";
  if (resultado.length === 0) {
    products.innerHTML = `Nenhum produto encontrado`;
  } else {
    resultado.forEach((element) => {
      const rating = element.rating.rate;
      const starHtml = getStars(rating);
      products.innerHTML += `
            <div class="item ${element.category}" id="${element.id}">
              <div class="name">${element.title}</div>
              <div class="image"><img class="img" src="${element.image}"></div>
              <div class="price">R$${element.price}</div>
              <div class="stars">${starHtml}</div>
              <div class="stars">${element.rating.rate}</div>   
            </div>
            `;
      const divItem = document.querySelectorAll(".item");
      divItem.forEach((item) => {
        item.addEventListener("click", () => {
          const itemId = item.id;
          window.location.href = `item.html?id=${itemId}`;
        });
      });
    });
  }

  console.log(resultado);
}

function searchProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.onload = () => {
    if (xhr.status === 200) {
      lista = JSON.parse(xhr.response);
    } else {
      console.error(`Erro ao carregar os produtos. Status: ${xhr.status}`);
    }
  };
  xhr.onerror = () => {
    console.error(`Erro ao carregar os produtos. Status: ${xhr.status}`);
  };
  xhr.send();
}

searchProducts();

window.addEventListener("pageshow", () => {
  inputPesquisa.value = ""; // Limpa o valor do campo de pesquisa
});

function getStars(rating) {
  let starHtml = "";

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starHtml += '<i class="fa fa-star"></i>';
    } else {
      starHtml += '<i class="fa fa-star-o"></i>';
    }
  }
  return starHtml;
}
