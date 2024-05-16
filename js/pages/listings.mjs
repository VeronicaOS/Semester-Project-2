import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";

document.addEventListener("DOMContentLoaded", function () {
    header();
});

const user = load("profile");
console.log(user);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchTerm = urlParams.get("search");

async function getListings() {
    const endpoint = "/auction/listings/?_seller=true&_bids=true";

    const url = BASE_URL + endpoint;

    const method = "get";

    const headers = {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
    };

    const response = await fetch(url, {
        headers: headers,
        method: method,
    });

    const data = await response.json();

    console.log(data);

    if (searchTerm) {
        return data.data.filter(
            (item) =>
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.body?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        return data.data;
    }
}

function renderListing(listing) {
    const listingDate = listing.endsAt.slice(0, 10);
    const currentDate = new Date(listingDate);
    const currentDay = currentDate.getDate();
    const curDay = currentDay < 10 ? "0" + currentDay : currentDay;
    const currentMonth = currentDate.toLocaleString(`default`, {
        month: "long",
    });
    const currentYear = currentDate.getFullYear();
    const curDate = `${curDay}. ${currentMonth} ${currentYear}`;
    let media = "";
    if (listing.media.length > 0) {
        media = `<img class="card-img-top img-fluid" src=${listing.media[0].url} alt=${listing.media[0].alt}/>`;
    }
    if (listing.media.length === 0) {
        media = `<img class="card-img-top img-fluid" src="../../img/placeholder.jpg" alt="Placeholder image - a blank piece of paper on a leafy ground"/>`;
    }
    let footer = "";
    if (user) {
        footer = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center "><a data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-md btn-block" href="./singleListing/index.html?id=${listing.id}">Make a bid</a></div>
    </div>`;
    }
    const template = `<div class="col-9 mb-5">
        <div class="card d-flex">
        <div class="img-height">${media}</div>
            <div class="text-center">
                <h5 class="fw-bolder pt-4">${listing.title}</h5>
                <p>Ends: ${curDate}</p>
            </div>
        ${footer}
    </div>
  </div>`;
    return template;
}

const listings = await getListings();

const listingsContainer = document.getElementById("listings-container");
listings.forEach((listing) => {
    listingsContainer.innerHTML += renderListing(listing);
});

const dropdown = document.querySelector(".dropdown-menu");

dropdown.addEventListener("click", function (event) {
    const selectedOption = event.target.textContent.trim();
    listingsContainer.innerHTML = "";
    let sortedListings;

    if (selectedOption === "Newest") {
        sortedListings = listings.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
        });
    } else if (selectedOption === "Oldest") {
        sortedListings = listings.sort(function (a, b) {
            return new Date(a.created) - new Date(b.created);
        });
    } else if (selectedOption === "A-Z") {
        sortedListings = listings.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
    } else if (selectedOption === "Z-A") {
        sortedListings = listings.sort(function (a, b) {
            return b.title.localeCompare(a.title);
        });
    }

    sortedListings.forEach(function (listing) {
        listingsContainer.innerHTML += renderListing(listing);
    });
});
