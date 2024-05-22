import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";
import { scrollToTop } from "../tools/scrollToTop.mjs";

document.addEventListener("DOMContentLoaded", function () {
    header();
});

scrollToTop("btn-back-to-top", 700);

const user = load("profile");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchTerm = urlParams.get("search");

let isLoading = true;

async function getListings() {
    let page = 1;
    let listings = [];
    let data;

    const endpoint = `/auction/listings/?_seller=true&_bids=true`;

    const url = BASE_URL + endpoint;

    const method = "get";

    const headers = {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
    };

    const response = await fetch(`${url}&page=${page}`, {
        headers: headers,
        method: method,
    });

    data = await response.json();
    listings = [...listings, ...data.data];

    while (!data.meta.isLastPage) {
        page++;
        const pageResponse = await fetch(`${url}&page=${page}`, {
            headers: headers,
            method: method,
        });

        data = await pageResponse.json();
        listings = [...listings, ...data.data];
    }
    if (data.meta.isLastPage) {
        isLoading = false;
    }

    if (searchTerm) {
        return listings.filter(
            (item) =>
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.body?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        return data.data;
    }
}

function renderListing(listing) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const curDay = currentDay < 10 ? "0" + currentDay : currentDay;
    const currentMonth = currentDate.toLocaleString(`default`, {
        month: "long",
    });
    const currentYear = currentDate.getFullYear();
    const curDate = `${curDay}. ${currentMonth} ${currentYear}`;
    const listingDate = listing.endsAt.slice(0, 10);
    const endsAtDate = new Date(listingDate);
    const endsAtDay = endsAtDate.getDate();
    const endDay = endsAtDay < 10 ? "0" + endsAtDay : endsAtDay;
    const endMonth = endsAtDate.toLocaleString(`default`, {
        month: "long",
    });
    const endYear = currentDate.getFullYear();
    const endsAt = `${endDay}. ${endMonth} ${endYear}`;
    let media = "";
    if (listing.media.length > 0) {
        const mediaAlt = !listing.media[0].alt
            ? `${listing.title} - image`
            : listing.media[0].alt;
        media = `<img class="card-img-top img-fluid" src=${listing.media[0].url} alt="${mediaAlt}"/>`;
    }
    if (listing.media.length === 0) {
        media = `<img class="card-img-top img-fluid" src="../../img/placeholder.jpg" alt="Placeholder image - a blank piece of paper on a leafy ground"/>`;
    }
    let endsAtP = "";
    if (currentDate > new Date(listing.endsAt)) {
        endsAtP = `<p><span class="fw-bold">Ends:</span> Bidding has ended</p>`;
    } else {
        endsAtP = `<p><span class="fw-bold">Ends:</span> ${endsAt}</p>`;
    }

    let footer = "";
    if (user) {
        footer = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center "><a data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-md btn-block" href="./singleListing/index.html?id=${listing.id}">Make a bid</a></div>
    </div>`;
    }
    if (currentDate > new Date(listing.endsAt)) {
        footer = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent invisible">
        <div class="text-center "><a data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-md btn-block" href="./singleListing/index.html?id=${listing.id}">Make a bid</a></div>
    </div>`;
    }
    if (!user) {
        footer = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent invisible">
        <div class="text-center "><a data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-md btn-block" href="./singleListing/index.html?id=${listing.id}">Make a bid</a></div>
    </div>`;
    }
    const template = `<div class="col-9 mb-5">
        <div class="card d-flex">
        <div class="img-height">${media}</div>
            <div class="text-center mx-2">
                <h5 class="listing-title fw-bolder pt-4">${listing.title}</h5>
                ${endsAtP}
            </div>
        ${footer}
    </div>
  </div>`;
    return template;
}

const listingsContainer = document.getElementById("listings-container");
if (isLoading) {
    listingsContainer.innerHTML = "Loading auctions...";
}
const listings = await getListings();
if (!isLoading) {
    listingsContainer.innerHTML = "";
}
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
    } else if (selectedOption === "Ending soon") {
        const now = new Date();
        sortedListings = listings
            .filter(function (listing) {
                return new Date(listing.endsAt) > now;
            })
            .sort(function (a, b) {
                return new Date(a.endsAt) - new Date(b.endsAt);
            });
    }

    sortedListings.forEach(function (listing) {
        listingsContainer.innerHTML += renderListing(listing);
    });
});
