import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";

document.addEventListener("DOMContentLoaded", function () {
    header();
});

async function createListing(title, description, media, endDate) {
    const endpoint = "/auction/listings";
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
                title: title,
                description: description,
                media: media,
                endsAt: new Date(endDate),
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Your listing was successfully created.");
            document.getElementById("listingForm").reset();
            return;
        }

        if (response.status === 500) {
            return alert(
                "There is a problem on our end. Please try again later."
            );
        }

        if (response.status === 400) {
            return alert("Please fill out the form correctly");
        }
    } catch (error) {
        console.error(error);
        return alert("An unexpected error occurred. Please try again later.");
    }
}

const publish = document.getElementById("publish-btn");
publish.addEventListener("click", function (event) {
    const title = document.getElementById("title-input").value;
    const description = document.getElementById("description-input").value;
    const media = [];

    // Main media input
    const mediaUrl = document.getElementById("media-input").value;
    media.push({ url: mediaUrl, alt: `${title} - image` });

    // Additional media inputs
    const additionalMediaInputs = document.querySelectorAll(
        ".additional-media-input"
    );
    additionalMediaInputs.forEach((input) => {
        const additionalUrl = input.value;
        const additionalAlt = `${title} - image`;

        if (additionalUrl.length !== 0) {
            media.push({ url: additionalUrl, alt: additionalAlt });
        }
    });

    const endDate = document.getElementById("end-date").value;
    createListing(title, description, media, endDate);
});
