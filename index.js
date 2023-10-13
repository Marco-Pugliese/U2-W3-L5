const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNmMjEzOWM0MzAwMTg4MTQ1NWUiLCJpYXQiOjE2OTcxODA5MTQsImV4cCI6MTY5ODM5MDUxNH0.kY5FnzXZgtD2s5Fb3YE44l7K-mQqJPDPwyQ61LjIcLU";

const myList = [];
const addStorage = (e) => {
  const newTitle =
    e.target.parentElement.parentElement.querySelector(
      "h6.card-title"
    ).innerText;
  myList.push(newTitle);
  let storageKey = "Key";
  localStorage.setItem(storageKey, JSON.stringify(myList));
  const myListUl = document.getElementById("myList");
  myListUl.innerHTML = ``;
  for (let i = 0; i < myList.length; i++) {
    const newLi = document.createElement("li");
    newLi.innerHTML = `<li><a class="dropdown-item" href="#">${myList[i]}</a></li>`;
    myListUl.appendChild(newLi);
  }
};

const readLocalStorage = () => {
  let storageKey = "Key";
  for (let i = 0; i < localStorage.length; i++) {
    let item = JSON.parse(localStorage.getItem(storageKey));
    for (let y = 0; y < item.length; y++) {
      const newLi = document.createElement("li");
      newLi.innerHTML = `<li><a class="dropdown-item" href="#">${item[y]}</a></li>`;
      const myListUl = document.getElementById("myList");
      myListUl.appendChild(newLi);
    }
  }

  // for (let i = 0; i < item.length; i++)
  {
  }
};
readLocalStorage();

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
    .then((product) => {
      for (let i = 0; i < product.length; i++) {
        const myRow = document.getElementById("myRow");

        const newDiv = document.createElement("div");
        newDiv.classList.add(
          "col-4",
          "col-xl-3",
          "col-xxl-2",
          "my-2",
          "d-flex"
        );
        const spinner = document.getElementById("spinner");
        spinner.classList.add("d-none");
        newDiv.innerHTML = `
        <div class="card">
         <div>
          <a href="./details.html?productId=${product[i]._id}"> <img src="${
          product[i].imageUrl
        }"
          class="card-img-top" alt="${product[i].name}"></a>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
          <h6 class="card-title text-center fw-bold">${product[i].name}</h6>
          <div><p class="card-text text-end mb-2 text-secondary">
          ${product[i].price + " $"}
          </p>
          <a href="#" class="btn btn-primary w-100" onclick="addStorage(event)">Add to Chart</a></div>
        </div>
      </div>`;
        myRow.appendChild(newDiv);
      }
    })

    .catch((err) => console.log("ERROR: ", err));
};
loadStorage();
