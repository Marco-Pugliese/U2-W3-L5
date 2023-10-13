const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNmMjEzOWM0MzAwMTg4MTQ1NWUiLCJpYXQiOjE2OTcxODA5MTQsImV4cCI6MTY5ODM5MDUxNH0.kY5FnzXZgtD2s5Fb3YE44l7K-mQqJPDPwyQ61LjIcLU";
const loadProduct = document.getElementById("saveBtn");

loadProduct.addEventListener("click", () => {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("imageUrl");
  const price = document.getElementById("price");
  const newEvent = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value,
  };
  const addressBarContent = new URLSearchParams(location.search);
  const productId = addressBarContent.get("productId");
  let methodToUse = "POST";
  // let urlToUse = "https://striveschool-api.herokuapp.com/api/product/";
  // if (productId) {
  //   methodToUse = "PUT";
  //   urlToUse = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
  // }
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization: myKey,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newEvent),
  })
    .then((res) => {
      if (res.ok) {
        alert("Contend saved properly");
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
          headers: {
            Authorization: myKey,
          },
          method: "GET",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Error while getting the data");
            }
          })
          .then((element) => {
            console.log(element);
            const myList = document.getElementById("myList");
            const newLi = document.createElement("li");
            newLi.innerHTML = `
            <li class="list-group-item mt-3 btn btn-secondary d-flex justify-content-between align-items-center bg-secondary border-2 border-black">
            <div class="fw-bold">
            <p class="mb-1"> ${element.name}</p>
            <span> Product Code : </span>
            <span class="h6 mt-0 elementId"> ${element._id}</span>
            </div>
            <div class="d-flex">
        <a href="./detailsBackoffice.html?productId=${element._id}" class="btn btn-warning">EDIT</a>
        </div>
            </li>`;
            const editButton = document.getElementById("editBtn");
            editButton.addEventListener("click", editBtn);
            myList.appendChild(newLi);
            const btnID = document.getElementById(`${element._id}`);
          })
          .catch((err) => console.log("ERROR: ", err));
      } else {
        throw new Error("Error while posting the data");
      }
    })
    .catch((err) => console.log("ERROR: ", err));

  name.value = ``;
  description.value = ``;
  brand.value = ``;
  imageUrl.value = ``;
  price.value = ``;
  location.assign("./backoffice.html");
});

const loadStorage = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error while getting the data");
      }
    })
    .then((listOfProducts) => {
      for (let i = 0; i < listOfProducts.length; i++) {
        const myList = document.getElementById("myList");
        const newLi = document.createElement("li");
        newLi.classList.add("list-group-item", "bg-secondary", "border-0");
        newLi.innerHTML = `
        <li class="list-group-item mt-3 btn btn-secondary d-flex justify-content-between align-items-center bg-secondary border-2 border-black">
        <div class="fw-bold">
        <p class="mb-1"> ${listOfProducts[i].name}</p>
        <span> Product Code : </span>
        <span class="h6 mt-0 elementId"> ${listOfProducts[i]._id}</span>
        </div>
        <div class="d-flex">
        <a href="./detailsBackoffice.html?productId=${listOfProducts[i]._id}" class="btn btn-warning">EDIT</a>
        </div>
        </li>`;
        myList.appendChild(newLi);
      }
      const editButton = document.querySelectorAll(".editBtn");
      for (let i = 0; i < editButton.length; i++) {
        editButton[i].addEventListener("click", editBtn);
      }
    })

    .catch((err) => console.log("ERROR: ", err));
};
loadStorage();
