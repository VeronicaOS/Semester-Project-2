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
    let footer = "";
    if (user) {
        footer = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center "><a data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-primary btn-md btn-block" href="./singleListing/index.html?id=${listing.id}">Make a bid</a></div>
    </div>`;
    }
    const template = `<div class="col mb-5">
        <div class="card">
        <div class="img-height">${media}</div>
        <div class="card-body p-4">
            <div class="text-center">
                <h5 class="fw-bolder">${listing.title}</h5>
                <p>Ends: ${curDate}</p>
            </div>
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



// const sorting = document.getElementById("sort-by");
// sorting.addEventListener("change", function (event) {
//     const value = event.target.value;
//     postsContainer.innerHTML = "";
//     let sortedPosts;
//     if (value === "newest") {
//         sortedPosts = posts.sort(function (a, b) {
//             return new Date(b.created) - new Date(a.created);
//         });
//     } else if (value === "oldest") {
//         sortedPosts = posts.sort(function (a, b) {
//             return new Date(a.created) - new Date(b.created);
//         });
//     } else if (value === "popularity") {
//         sortedPosts = posts.sort(function (a, b) {
//             return b._count.reactions - a._count.reactions;
//         });
//     }
//     sortedPosts.forEach((post) => {
//         postsContainer.innerHTML += renderPost(post);
//     });
// });
