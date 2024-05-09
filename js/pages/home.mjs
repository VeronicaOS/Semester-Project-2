const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const navProfile = document.getElementById("navProfile");

function checkLocalStorage() {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");

    if (token && profile) {
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
            loginButton.style.display = "block";
        }
        if (logoutButton) {
            logoutButton.style.display = "none";
        }
        if (navProfile) {
            navProfile.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
});

logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) {
        return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    checkLocalStorage();

    window.location.href = "/";
});
