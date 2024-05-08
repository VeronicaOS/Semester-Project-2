// Define the login function
export async function login() {
    const body = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    // Make the login request
    await logInRequest(body);

    window.location.href = "/login";
}

// Define the logout function
export function logout() {
    // Remove user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
}

// Define the updateUI function
export function updateUI() {
    const isLoggedIn = localStorage.getItem("token");

    const loginButton = document.getElementById("loginButton");

    if (isLoggedIn) {
        // User is logged in
        loginButton.textContent = "Logout";
        loginButton.removeEventListener("click", login);
        loginButton.addEventListener("click", logout);
    } else {
        // User is logged out
        loginButton.textContent = "Login";
        loginButton.removeEventListener("click", logout);
        loginButton.addEventListener("click", login);
    }
}
