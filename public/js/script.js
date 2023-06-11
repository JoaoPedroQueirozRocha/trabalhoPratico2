const container = document.getElementById("products");
const filter = document.getElementById("filter");

const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "/src/pages/pesquisa";
});

//fetch da api
fetch("https://diwserver.vps.webdock.cloud/products")
  .then((res) => res.json())
  .then((json) => {
    const data = json.products;

    let selected = "all";
    //EventListener para verificar a categoria selecioanda
    filter.addEventListener("change", () => {
      selected = $(filter).val();
      constructor(selected);
    });

    //
    //Pegando as categorias da api
    let categorias = [];
    categorias = data.map((value) => {
      return value.category;
    });

    //Removendo as categorias duplicadas
    categorias = [...new Set(categorias)];
    categorias.forEach((value) => {
      //Criando uma opção no select para cada categoria
      let option = document.createElement("option");
      option.textContent = value;
      option.value = value;
      filter.add(option);
    });

    //primeira construção dos elementos da página
    data.forEach((element) => {
      $(container).append(`
        <div class="item ${element.category}">
            <div class="name">${element.title}</div>
            <div class="image"><img class="img" src="${element.image}"></div>
            <div class="price">R$${element.price}</div>
            <div class="description"><p>${element.description}</p></div>
            <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
        </div>
      `);
      //Adicionando o event listener em cada elemento para redirecionar para a tela de descrição passando o id
      const maisDetalhes = document.querySelectorAll(".maisDetalhes");
      maisDetalhes.forEach((divItem) => {
        divItem.addEventListener("click", () => {
          const itemId = divItem.id;
          window.location.href = `../pages/item?id=${itemId}`;
        });
      });
      const description = document.querySelectorAll(".description");
      description.forEach((element) => {
        element.addEventListener("click", (event) => {
          console.log(event.target.parentNode.id);
        });
      });
    });

    //Função para reenderizar os produtos de acordo com a categoria
    function constructor(selected) {
      //Reenderização para a categoria default
      if (selected === "all") {
        $(container).html("");
        data.forEach((element) => {
          $(container).append(`
            <div class="item ${element.category}">
                <div class="name">${element.title}</div>
                <div class="image"><img class="img" src="${element.image}"></div>
                <div class="price">R$${element.price}</div>
                <div class="description" id="${element.id}">${element.description}</div>
                <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
            </div>
        `);
          //Adicionando o event listener em cada elemento para redirecionar para a tela de descrição passando o id
          const maisDetalhes = document.querySelectorAll(".maisDetalhes");
          maisDetalhes.forEach((divItem) => {
            divItem.addEventListener("click", () => {
              const itemId = divItem.id;
              window.location.href = `../pages/item?id=${itemId}`;
            });
          });
        });
      } else {
        //Filtrando os produtos para retornar apenas os da classe selecionada
        const productsByClass = data.filter((element) => {
          return element.category === selected;
        });
        $(container).html("");
        //Reenderização para a categoria selecionada
        productsByClass.forEach((element) => {
          $(container).append(`
            <div class="item ${element.category}">
                <div class="name">${element.title}</div>
                <div class="image"><img class="img" src="${element.image}"></div>
                <div class="price">R$${element.price}</div>
                <div class="description">${element.description}</div>
                <button class="maisDetalhes" id="${element.id}">Mais detalhes</button>
            </div>
        `);
          //Adicionando o event listener em cada elemento para redirecionar para a tela de descrição passando o id
          const maisDetalhes = document.querySelectorAll(".maisDetalhes");
          maisDetalhes.forEach((divItem) => {
            divItem.addEventListener("click", () => {
              const itemId = divItem.id;
              window.location.href = `../pages/item?id=${itemId}`;
            });
          });
        });
      }
    }
  });
