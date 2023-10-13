const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
const deleteBtn = document.getElementById("deleteBtn");

const editBtn = document.getElementById("editBtn");
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWNmMjEzOWM0MzAwMTg4MTQ1NWUiLCJpYXQiOjE2OTcxODA5MTQsImV4cCI6MTY5ODM5MDUxNH0.kY5FnzXZgtD2s5Fb3YE44l7K-mQqJPDPwyQ61LjIcLU";

const getDetails = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error while getting the datas");
      }
    })
    .then((info) => {
      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const imageUrl = document.getElementById("imageUrl");
      const price = document.getElementById("price");
      name.value = info.name;
      description.value = info.description;
      brand.value = info.brand;
      imageUrl.value = info.imageUrl;
      price.value = info.price;
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};
getDetails();

const deleteProduct = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Product deleted correctly");

        alert("Problema con l'eliminazione dell'evento");
        throw new Error("Errore nella DELETE");
      }
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
  location.assign("./backoffice.html");
};
deleteBtn.addEventListener("click", deleteProduct);

const change = () => {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("imageUrl");
  const price = document.getElementById("price");
  const newProduct = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value,
  };

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization: myKey,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(newProduct),
  })
    .then((res) => {
      if (res.ok) {
        alert("Content changed properly");
      } else {
        throw new Error("Error while posting the data");
      }
    })
    .catch((err) => console.log("ERROR: ", err));

  location.assign("./backoffice.html");
};
editBtn.addEventListener("click", change);
