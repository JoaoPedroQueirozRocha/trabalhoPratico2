const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "../../src/pages/pesquisa.html";
});

fetch(`https://diwserver.vps.webdock.cloud/products/${itemId}`)
  .then((res) => res.json())
  .then((json) => {
    $("#produto").html(`
          <div class="item" id="${json.id}">
              <div id="titleImg">
                <div class="name"><h3>${json.title}</h3></div>
                <div class="image"><img class="img" src="${json.image}"></div>
              </div>
              <div id="details">
                <h2>Descrição</h2>
                <div class="description">${
                  json.description.charAt(0).toUpperCase() +
                  json.description.slice(1)
                }</div>               
                <div id="buy">
                  <button id="btnComprar">Comprar</button>
                  <div class="price">R$${json.price}</div>
                </div>
              </div>
          </div>
          `);
  });
