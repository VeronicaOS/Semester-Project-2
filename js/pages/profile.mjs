import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";

const profileAvatar = document.getElementById("profile-avatar");

document.addEventListener("DOMContentLoaded", function () {
    header();
});

const user = load("profile");

let params = new URLSearchParams(window.location.search);
let name = params.get("name");

if (!name) {
    window.location.href = "/pages/profile/?name=" + user.name;
}

const endpoint = "/auction/profiles/" + name;

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

const profileData = data.data;

document.getElementById("profile-name").textContent = profileData.name;

profileAvatar.src = profileData.avatar.url;
profileAvatar.alt = profileData.avatar.alt;

document.getElementById("profile-credit").textContent = profileData.credits;

document.getElementById("profile-bio").textContent = profileData.bio;

document.getElementById("profile-email").textContent = profileData.email;

// CHANGE AVATAR

async function changeAvatar(mediaUrl) {
    const endpoint = `/auction/profiles/${name}`;
    const url = BASE_URL + endpoint;
    const method = "put";
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
                avatar: {
                    url: mediaUrl,
                    alt: "",
                },
            }),
        });

        if (response.status === 500) {
            return alert(
                "There is a problem on our end. Please try again later."
            );
        }

        if (response.status === 400) {
            return alert(
                "Please make sure the image URL is working and publicly accessible."
            );
        }

        const json = await response.json();
        document.getElementById("avatar-form").reset();
        return json;
    } catch (error) {
        console.error(error);
        showMsg("An unexpected error occurred. Please try again later.");
    }
}

const publish = document.getElementById("save-avatar");
publish.addEventListener("click", async function (event) {
    const mediaUrl = document.getElementById("avatar-input").value;
    await changeAvatar(mediaUrl);

    const profileData = localStorage.getItem("profile");
    const profile = JSON.parse(profileData);
    profile.avatar.url = mediaUrl;
    localStorage.setItem("profile", JSON.stringify(profile));
    profileAvatar.src = mediaUrl;
    document.getElementById("nav-img").src = mediaUrl;

    // Lukke modal
    document.querySelector("#AvatarModal").classList.add("d-none");
});
