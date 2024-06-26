import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";
document.addEventListener("DOMContentLoaded", function () {
    header();
});

const user = load("profile");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const listingId = urlParams.get("id");

let isLoading = true;

export async function getListing() {
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
    isLoading = false;

    return data.data;
}

export function renderListing(listing) {
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
    if (listing.media.length === 0) {
        const img = document.createElement("img");
        img.src = "../../../img/placeholder.jpg";
        img.setAttribute("class", "d-block w-100 object-fit-cover");
        img.alt =
            "Placeholder image - a blank piece of paper on a leafy ground";
        media = img;
    }
    if (listing.media.length > 0) {
        if (listing.media.length > 1) {
            const carouselContainer = document.createElement("div");
            carouselContainer.id = "carouselExampleCaptions";
            carouselContainer.classList.add("carousel", "slide");

            const carouselBtns = document.createElement("div");
            carouselBtns.classList.add("carousel-indicators");

            const carouselInner = document.createElement("div");
            carouselInner.classList.add("carousel-inner");
            listing.media.forEach((img, i) => {
                const button = document.createElement("button");
                button.classList.add("bg-none");

                button.setAttribute("data-bs-slide-to", i);

                button.setAttribute("aria-label", `Slide ${i + 1}`);
                carouselBtns.appendChild(button);

                const imgContainer = document.createElement("div");
                imgContainer.classList.add("carousel-item");

                if (i === 0) {
                    button.classList.add("active");
                    button.setAttribute("aria-current", "true");
                    imgContainer.classList.add("active");
                }

                const curImg = document.createElement("img");
                curImg.src = img.url;
                curImg.setAttribute(
                    "class",
                    "d-block w-100 h-100 object-fit-cover"
                );

                imgContainer.appendChild(curImg);
                carouselInner.appendChild(imgContainer);
            });

            let prevButton = document.createElement("button");
            prevButton.className = "carousel-control-prev";
            prevButton.setAttribute("type", "button");
            prevButton.setAttribute(
                "data-bs-target",
                "#carouselExampleCaptions"
            );
            prevButton.setAttribute("data-bs-slide", "prev");

            let prevIcon = document.createElement("span");
            prevIcon.className = "carousel-control-prev-icon";
            prevIcon.setAttribute("aria-hidden", "true");
            prevButton.appendChild(prevIcon);

            let prevText = document.createElement("span");
            prevText.className = "visually-hidden";
            prevText.textContent = "Previous";
            prevButton.appendChild(prevText);

            let nextButton = document.createElement("button");
            nextButton.className = "carousel-control-next";
            nextButton.setAttribute("type", "button");
            nextButton.setAttribute(
                "data-bs-target",
                "#carouselExampleCaptions"
            );
            nextButton.setAttribute("data-bs-slide", "next");

            let nextIcon = document.createElement("span");
            nextIcon.className = "carousel-control-next-icon";
            nextIcon.setAttribute("aria-hidden", "true");
            nextButton.appendChild(nextIcon);

            let nextText = document.createElement("span");
            nextText.className = "visually-hidden";
            nextText.textContent = "Next";
            nextButton.appendChild(nextText);

            carouselContainer.append(
                carouselBtns,
                carouselInner,
                prevButton,
                nextButton
            );

            media = carouselContainer;
        } else {
            const img = document.createElement("img");
            img.src = listing.media[0].url;
            media = img;
            img.setAttribute("class", "d-block w-100 object-fit-cover");
        }
    }

    let bidPrice = 0;
    if (listing.bids.length > 0) {
        bidPrice = listing.bids[listing.bids.length - 1].amount;
    }

    let mainContainer = document.createElement("div");
    mainContainer.className = "row gx-4 gx-lg-5 align-items-center";

    let listingContainer = document.createElement("div");
    if (media !== "") {
        listingContainer.className = "listing-container col-md-6";
        listingContainer.appendChild(media);
        mainContainer.appendChild(listingContainer);
    }
    let contentContainer = document.createElement("div");
    contentContainer.className = "col-md-6";

    let header = document.createElement("h1");
    header.className = "display-5 fw-bolder pt-4 pt-md-0";
    header.textContent = listing.title;

    let pLead = document.createElement("p");
    pLead.className = "lead";
    pLead.textContent = listing.description;

    let smallDiv = document.createElement("div");
    smallDiv.className = "small mb-1";
    smallDiv.textContent = `Ends: ${curDate}`;

    let pBid = document.createElement("p");
    pBid.className = "bid small mt-3";
    pBid.textContent = `Current bid: ${bidPrice}`;

    let viewBidsDiv = document.createElement("div");
    viewBidsDiv.id = "viewBids";

    let paragraph = document.createElement("p");
    viewBidsDiv.appendChild(paragraph);

    let anchor = document.createElement("a");
    anchor.className = "text-decoration-none text-dark small";
    anchor.setAttribute("data-bs-toggle", "collapse");
    anchor.setAttribute("href", "#collapseBids");
    anchor.setAttribute("role", "button");
    anchor.setAttribute("aria-expanded", "false");
    anchor.setAttribute("aria-controls", "collapseBids");
    anchor.innerHTML =
        'View all bids <i class="fa fa-caret-down" aria-hidden="true"></i>';
    paragraph.appendChild(anchor);

    let collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse";
    collapseDiv.id = "collapseBids";
    viewBidsDiv.appendChild(collapseDiv);

    let cardDiv = document.createElement("div");
    cardDiv.className = "card card-body bg-secondary w-75 mb-4";
    collapseDiv.appendChild(cardDiv);

    let bidList = document.createElement("ul");
    bidList.id = "bidList";
    bidList.className = "ps-0 mb-0 d-flex flex-column";
    cardDiv.appendChild(bidList);

    let dFlexDiv = document.createElement("div");
    dFlexDiv.className = "d-flex";

    let form = document.createElement("form");
    form.id = "bidForm";
    form.setAttribute("class", "w-25 me-3");

    let input = document.createElement("input");
    input.id = "amount-input";
    input.type = "number";
    input.className = "form-control text-center me-3 ";
    form.appendChild(input);

    let button = document.createElement("button");
    button.id = "bid-btn";
    button.className = "btn btn-outline-primary flex-shrink-0";
    button.type = "button";

    let i = document.createElement("i");
    i.className = "bi-cart-fill me-1";
    button.appendChild(i);

    let buttonText = document.createTextNode("Enter bid");

    contentContainer.append(header, pLead, smallDiv, pBid, viewBidsDiv);
    button.appendChild(buttonText);
    dFlexDiv.append(form, button);
    contentContainer.appendChild(dFlexDiv);
    mainContainer.appendChild(contentContainer);
    return mainContainer;
}

const listingContainer = document.getElementById("listing-container");
if (isLoading) {
    listingContainer.innerHTML = "Loading auction item...";
}
const listing = await getListing();
if (!isLoading) {
    listingContainer.innerHTML = "";
}
listingContainer.append(renderListing(listing));

// View all bids

listing.bids.forEach((bid) => {
    let bidderDiv = document.createElement("div");
    bidderDiv.id = "bidderDiv";
    bidderDiv.className = "d-flex justify-content-between";
    bidList.appendChild(bidderDiv);

    let bidName = document.createElement("li");
    bidName.id = "bidName";
    bidName.className = "list-group-item";
    bidderDiv.appendChild(bidName);

    let bidAmount = document.createElement("span");
    bidAmount.id = "bidAmount";
    bidAmount.className = "badge bg-white text-dark rounded-pill pt-1 mt-1";
    bidderDiv.appendChild(bidAmount);

    bidName.innerText = `${bid.bidder.name}: `;
    bidAmount.innerText = `${bid.amount}`;

    bidderDiv.appendChild(bidName);
    bidderDiv.appendChild(bidAmount);

    bidList.appendChild(bidderDiv);
});

// BID

export async function bidOnListing(amount) {
    const endpoint = `/auction/listings/${listingId}/bids`;
    const url = BASE_URL + endpoint;
    const method = "post";
    const headers = {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
    };

    try {
        const response = await fetch(url, {
            headers: headers,
            method: method,
            body: JSON.stringify({
                amount: Number(amount),
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const listing = await getListing();
            const listingContainer =
                document.getElementById("listing-container");
            listingContainer.innerHTML = "";
            listingContainer.append(renderListing(listing));
            document.getElementById("bidForm").reset();
            return data;
        } else if (data.statusCode === 400) {
            alert("Bid must be higher than current bid");
            document.getElementById("amount-input").value = "";
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}

const bid = document.getElementById("bid-btn");
bid.addEventListener("click", function (event) {
    const amount = document.getElementById("amount-input");
    bidOnListing(amount.value);
});
