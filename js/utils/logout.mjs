export function handleLogout() {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to log out?");
        if (!confirmed) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("profile");

        window.location.href = "/";
    });
}
