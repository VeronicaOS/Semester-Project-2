const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

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
    } else {
        if (loginButton) {
            loginButton.style.display = "block";
        }
        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
});

logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    checkLocalStorage();

    // const confirmed = window.confirm("You have now successfully logged out");
    // if (!confirmed) {
    //     return;
    // }
});
