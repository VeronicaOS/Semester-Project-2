import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";

document.addEventListener("DOMContentLoaded", function () {
    header();
});

async function createListing(title, description, mediaUrl, endDate) {
    const endpoint = "/auction/listings";
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
            title: title,
            description: description,
            media: [
                {
                    url: mediaUrl,
                    alt: `${title} - image`,
                },
            ],
            endsAt: new Date(endDate),
        }),
    })
        .then((response) => response.json())
        .then(async (json) => {
            console.log(json);
            document.getElementById("listingForm").reset();
        });
}

const publish = document.getElementById("publish-btn");
publish.addEventListener("click", function (event) {
    const title = document.getElementById("title-input");
    const description = document.getElementById("description-input");
    const media = document.getElementById("media-input");
    const endDate = document.getElementById("end-date");
    createListing(title.value, description.value, media.value, endDate.value);
});

// async function createListing(title, description, media, endDate) {
//     const endpoint = "/auction/listings";
//     const url = BASE_URL + endpoint;
//     const method = "post";
//     const headers = {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${load("token")}`,
//         "X-Noroff-API-Key": API_KEY,
//     };

//     await fetch(url, {
//         headers: headers,
//         method: method,
//         body: JSON.stringify({
//             title: title,
//             description: description,
//             media: media,
//             endsAt: new Date(endDate),
//         }),
//     })
//         .then((response) => response.json())
//         .then(async (json) => {
//             console.log(json);
//             document.getElementById("listingForm").reset();
//         });
// }

// const publish = document.getElementById("publish-btn");
// publish.addEventListener("click", function (event) {
//     const title = document.getElementById("title-input");
//     const description = document.getElementById("description-input");
//     const media = [];

//     const mediaUrl = document.getElementById("media-input");
//     media.push({ url: mediaUrl, alt: `${title} - image` });

//     const additionalMediaInputs =
//         document.querySelectorAll(".additional-media");

//     additionalMediaInputs.forEach((input) => {
//         const additionalUrl = document.getElementById(
//             "additional-media-input"
//         ).value;
//         const additionalAlt = `${title} - image`;

//         if (additionalUrl.length !== 0) {
//             media.push({ additionalUrl, additionalAlt });
//         }
//     });
//     const endDate = document.getElementById("end-date");
//     createListing(title.value, description.value, media.value, endDate.value);
//     console.log(media)
// });
