const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
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
      const myRow = document.getElementById("myRow");
      myRow.classList.add("justify-content-center");
      const newDiv = document.createElement("div");
      newDiv.classList.add("col-10", "col-xl-8", "col-xxl-6", "my-5");
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      newDiv.innerHTML = `<div class="card shadow">
      <img src="${info.imageUrl}" class="card-img-top" alt="${info.name}">
      <div class="card-body d-flex flex-column align-items-center justify-content-center">
        <h5 class="card-title text-center fw-bold my-4">${info.name}</h5>
        <p class="card-text fst-italic">${info.description}</p>
        
        <a href="#" class="btn btn-primary w-100">
        
        <span class="ms-4">Buy! (<span class="card-text text-light me-1">${info.price}$</span>)</span>
        </a>
      </div>
    </div>
        `;
      myRow.appendChild(newDiv);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};
getDetails();
