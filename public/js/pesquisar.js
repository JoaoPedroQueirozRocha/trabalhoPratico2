const btnPesquisa = document.querySelector("#btnPesquisar");
const inputPesquisa = document.querySelector("#inputPesquisa");
const products = document.querySelector("#produtos");

$(document).ready(() => {
  $("#btnPesquisar").click(() => {
    let pesquisado = $("#inputPesquisa").val();
    if (pesquisado !== "" && isNaN(pesquisado)) {
      search(pesquisado);
    } else {
      $(products).html(`
      <div id="error">
        <p>Valor inválido, insira um valor válido para a pesquisa</p>
        <img src="../../public/assets/img/forbidden.svg" id="searchError">
      </div>
      `);
    }
  });
  $(inputPesquisa).keypress((e) => {
    let keycode = e.keycode ? e.keycode : e.which;
    if (keycode === 13) {
      let pesquisado = $("#inputPesquisa").val();
      if (pesquisado !== "" && isNaN(pesquisado)) {
        search(pesquisado);
      } else {
        $(products).html(`
      <div id="error">
        <p>Valor inválido, insira um valor válido para a pesquisa</p>
        <img src="../../public/assets/img/forbidden.svg" id="searchError">
      </div>
      `);
      }
    }
  });
});

function search(pesquisado) {
  let api = `http://diwserver.vps.webdock.cloud:8765/products/search?query=${pesquisado}`;
  $.ajax({
    url: api,
    type: "GET",
    dataType: "json",
    success: (response) => {
      showResults(response);
    },
    erro: (xhr, status, error) => {
      console.log("Erro na requisição da api", error);
    },
  });
}

function showResults(response) {
  $(products).html("");
  response.forEach((element) => {
    $(products).append(`
                <div class="item ${element.category}"   >
                  <div class="name">${element.title}</div>
                  <div class="image"><img class="img" src="${element.image}"></div>
                  <div class="price">R$${element.price}</div>
                  <div class="description" id="${element.id}">${element.description}</div>
                  <button class="maisDetalhes" id="${element.id}">Mais detalhes</button> 
                </div>
                `);
    const maisDetalhes = document.querySelectorAll(".maisDetalhes");
    maisDetalhes.forEach((divItem) => {
      divItem.addEventListener("click", () => {
        const itemId = divItem.id;
        window.location.href = `../../src/pages/item?id=${itemId}`;
      });
    });
  });
}

function showError(error) {
  products.innerHTML += `erro ${error}`;
}
