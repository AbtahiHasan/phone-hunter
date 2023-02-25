let cardCounter = 9;
let loader = false;
const showMoreBtn = document.getElementById("show-more-btn");
let inputValue;


const showData = async (searchText) => {
    loader = true;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    
    let phones = data.data;
    const phoneContainer = document.getElementById("phones-container");
    console.log(phones.length, cardCounter)
    if(phones.length < 9) {
        cardCounter = phones.length;
    }
    if(cardCounter > phones.length) {
        cardCounter = phones.length;
    }
    if(phones.length !== cardCounter) {
        showMoreBtn.classList.remove("hidden");
    } else {
        showMoreBtn.classList.add("hidden");
    }
    phones = phones.splice(0, cardCounter)
    phoneContainer.innerHTML = "";
    phones.forEach(phone => {
        let div = document.createElement("div");
        div.className = "card card-compact bg-base-100 shadow-xl";

        div.innerHTML = `
        <figure>
        <img
            src="${phone.image}"
            alt="Shoes"
        />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.brand}</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>`
    phoneContainer.appendChild(div)
    });
    loader = false;

    const loaderContainer = document.getElementById("loader");
    if(loader) {
        loaderContainer.classList.remove("hidden");
    } else {
        loaderContainer.classList.add("hidden");
    }
    const resultStatus = document.getElementById("result-status")
    if(phones.length === 0) {
        resultStatus.classList.remove("hidden");
    }
    else {
        resultStatus.classList.add("hidden");
    }

    
};



const searcForm = document.getElementById("search-form");
searcForm.onsubmit = (e) => {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    inputValue = searchInput.value;
    showData(searchInput.value, cardCounter);
    searchInput.value = "";
}


showMoreBtn.onclick = () => {
    cardCounter = cardCounter + 3;
    showData(inputValue, cardCounter);
}