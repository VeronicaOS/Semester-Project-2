const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const navProfile = document.getElementById("navProfile");
const navName = document.getElementById("nav-name");
const navImage = document.getElementById("nav-img");
const sellButton = document.getElementById("sell-btn");
const sellNav = document.getElementById("sell-nav");

export async function changeHeader() {
    const token = await localStorage.getItem("token");
    const profileData = await localStorage.getItem("profile");
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
        console.log(sellButton);
        if (loginButton) {
            loginButton.style.display = "block";
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
        if (navProfile) {
            navProfile.style.display = "none";
        }
    }
}
