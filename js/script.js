let cardCounter = 9;
let loader = false;
const showMoreBtn = document.getElementById("show-more-btn");
let inputValue;


const popup = async (id) => {
    let title = document.getElementById("pop-title");
    let details = document.getElementById("pop-details");
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url);
    const data = await response.json();
    title.innerText = `${data.data.brand}`
    details.innerHTML = `

    <img src="${data.data.image ? data.data.image : "img not found"}"/>
    <p>Phone Name: ${data.data.name ? data.data.name : "name not found"}</p>
    <p>Release Date: ${data.data.releaseDate ? data.data.releaseDate : "release Date not found"}</p>
    <p>display Size: ${data.data.mainFeatures ? data.data.mainFeatures.displaySize : "display Size Date not found"}</p>
    <p>Storage: ${data.data.mainFeatures ? data.data.mainFeatures.storage : "storage Date not found"}</p>
    <p>Sensors: ${data.data.mainFeatures ? data.data.mainFeatures.sensors : "sensors Date not found"}</p>
    `
}

const showData = async (searchText, cardCount) => {
    loader = true;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    
    let phones = data.data;
    const phoneContainer = document.getElementById("phones-container");
    if(phones.length !== cardCounter) {
        showMoreBtn.classList.remove("hidden");
        showMoreBtn.classList.add("block");
    } else {
        showMoreBtn.classList.add("hidden");
    }
    
    phones = phones.splice(0, cardCount)
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
        <!-- Button trigger modal -->
        <button
          type="button" onclick="popup('${phone.slug}')"
          class="inline-block rounded w-20  px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal "
          data-te-toggle="modal"
          data-te-target="#exampleModal"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          details
        </button>
    </div>`
    phoneContainer.appendChild(div)
    });
    loader = false;

    const loaderContainer = document.getElementById("loader");
    if(loader) {
        loaderContainer.classList.remove("hidden");
        loaderContainer.classList.add("flex");
    } else {
        loaderContainer.classList.add("hidden");
    }
    const resultStatus = document.getElementById("result-status")
    if(phones.length === 0) {
        resultStatus.classList.remove("hidden");
        showMoreBtn.classList.add("hidden");
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

popup()
