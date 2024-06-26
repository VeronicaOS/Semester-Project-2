const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const navProfile = document.getElementById("navProfile");
const navName = document.getElementById("nav-name");
const navImage = document.getElementById("nav-img");
const sellButton = document.getElementById("sell-btn");
const sellNav = document.getElementById("sell-nav");
const navSell = document.getElementById("nav-sell");

export async function changeHeader() {
    const token = localStorage.getItem("token");
    const profileData = localStorage.getItem("profile");
    const profile = JSON.parse(profileData);
    if (token && profile) {
        navName.textContent = profile.name;
        navImage.src = profile.avatar.url;
        if (loginButton) {
            loginButton.style.display = "none";
        }
        if (logoutButton) {
            logoutButton.style.display = "block";
        }
        if (navProfile) {
            navProfile.style.display = "block";
        }
    } else {
        if (loginButton) {
            loginButton.classList.remove("d-none");
        }
        if (logoutButton) {
            logoutButton.style.display = "none";
        }
        if (sellButton) {
            sellButton.style.display = "none";
        }
        if (sellNav) {
            sellNav.style.display = "none";
        }
        if (navSell) {
            navSell.style.display = "none";
        }
        if (navProfile) {
            navProfile.style.display = "none";
        }
    }
}
