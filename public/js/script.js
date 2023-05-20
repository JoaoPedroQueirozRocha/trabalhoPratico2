const btnPesquisa = document.querySelector("#pesquisa");
btnPesquisa.addEventListener("click", () => {
  window.location.href = "pesquisa.html";
});

// function request(url, success, error) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       success(xhr.response);
//     } else {
//       error(xhr.status);
//     }
//   };
//   xhr.onerror = function () {
//     error(xhr.status);
//   };
//   xhr.send();
// }

// request(
//   "https://fakestoreapi.com/products",
//   function (response) {
//     const json = JSON.parse(response);
//     const container = document.getElementById("products");
//     console.log(json);

//     json.forEach(function (element) {
//       container.innerHTML += `
//         <div class="item ${element.category}" id="${element.id}">
//             <div class="name">${element.title}</div>
//             <div class="image"><img class="img" src="${element.image}"></div>
//             <div class="price">R$${element.price}</div>
//             <div class="description">${element.description}</div>
//         </div>
//     `;

//       const itemDiv = document.querySelectorAll(".item");
//       itemDiv.forEach((divItem) => {
//         divItem.addEventListener("click", () => {
//           const itemId = divItem.id;
//           window.location.href = `item.html?id=${itemId}`;
//         });
//       });
//     });
//   },
//   function (errorStatus) {
//     console.error(`Erro ao fazer a requisição: ${errorStatus}`);
//   }
// );

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    const container = document.getElementById("products");
    console.log(json);

    json.forEach((element) => {
      container.innerHTML += `
        <div class="item ${element.category}" id="${element.id}">
            <div class="name">${element.title}</div>
            <div class="image"><img class="img" src="${element.image}"></div>
            <div class="price">R$${element.price}</div>
            <div class="description">${element.description}</div>
        </div>
    `;

      const itemDiv = document.querySelectorAll(".item");
      itemDiv.forEach((divItem) => {
        divItem.addEventListener("click", () => {
          const itemId = divItem.id;
          window.location.href = `item.html?id=${itemId}`;
        });
      });
    });
  });
