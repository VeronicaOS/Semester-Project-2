import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";
console.log("test");
document.addEventListener("DOMContentLoaded", function () {
    header();
});

const user = load("profile");
console.log(user);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

async function getListing() {
    const endpoint = `/auction/listings/${listingId}?_seller=true&_bids=true`;

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

    return data.data;
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
        media = `<img class="card-img-top mb-5 mb-md-0" src=${listing.media[0].url} alt=${listing.media[0].alt}/>`;
    }
    let bidPrice = 0;
    if (listing.bids.length > 0) {
        bidPrice = listing.bids[listing.bids.length - 1].amount;
    }
    const template = `<div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6">${media}</div>
    <div class="col-md-6">
        <h1 class="display-5 fw-bolder">${listing.title}</h1>
        <p class="lead">${listing.description}</p>
        <div class="small mb-1">Ends: ${curDate}</div>
        <p class="bid">${bidPrice}</p>
        <div class="d-flex">
            <form id="bidForm"><input id="amount-input" type="number" class="form-control text-center me-3 w-25" id="inputQuantity" /></form>
            <button id="bid-btn" class="btn btn-outline-primary flex-shrink-0" type="button">
                <i class="bi-cart-fill me-1"></i>
                Enter bid
            </button>
        </div>
    </div>
</div>`;
    return template;
}

const listing = await getListing();
const listingContainer = document.getElementById("listing-container");
listingContainer.innerHTML = renderListing(listing);

// BID

async function bidOnListing(amount) {
    const endpoint = `/auction/listings/${listingId}/bids`;
    const url = BASE_URL + endpoint;
    const method = "post";
    const headers = {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
    };

    await fetch(url, {
        headers: headers,
        method: method,
        body: JSON.stringify({
            amount: Number(amount),
        }),
    })
        .then((response) => response.json())
        .then(async (json) => {
            console.log(json);
            const listing = await getListing();
            const listingContainer =
                document.getElementById("listing-container");
            listingContainer.innerHTML = renderListing(listing);
            document.getElementById("bidForm").reset();
        });
}

const bid = document.getElementById("bid-btn");
bid.addEventListener("click", function (event) {
    const amount = document.getElementById("amount-input");
    bidOnListing(amount.value);
});
