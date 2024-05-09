import { API_KEY, load, BASE_URL } from "../api/constants.mjs";
import { header } from "../utils/index.mjs";

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

const profileAvatar = document.getElementById("profile-avatar");
profileAvatar.src = profileData.avatar.url;
profileAvatar.alt = profileData.avatar.alt;

document.getElementById("profile-credit").textContent = profileData.credits;

document.getElementById("profile-bio").textContent = profileData.bio;

document.getElementById("profile-email").textContent = profileData.email;
