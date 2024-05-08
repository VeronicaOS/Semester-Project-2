import { API_KEY, load, BASE_URL } from "../api/constants.mjs";

const user = load("profile");

console.log(user);

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

// Change avatar


// async function editAvatar(user, avatar) {
//     const endpoint = `/auction/profiles/${user}`;
//     const url = BASE_URL + endpoint;
//     const method = "put";
//     const headers = {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${load("token")}`,
//         "X-Noroff-API-Key": API_KEY,
//     };

//     const request = await fetch(url, {
//         headers: headers,
//         method: method,
//         body: JSON.stringify({
//             avatar: avatar,
//         }),
//     })
//         .then((response) => response.json())
//         .then(async (json) => {
//             window.location.href = `/pages/profile/?id=${user.avatar}`;
//         });
// }

// const save = document.getElementById("save-avatar");
// save.addEventListener("click", function (event) {
//     const avatar = document.getElementById("avatar-input");
//     editAvatar(user, avatar.value);
// });
