const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const bannerInput = document.getElementById("banner-input");
const avatarInput = document.getElementById("avatar-input");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const body = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    if (bannerInput.value) {
        body.banner = {
            url: bannerInput.value,
        };
    }

    if (avatarInput.value) {
        body.avatar = {
            url: avatarInput.value,
        };
    }

    const confirmed = window.confirm(
        "You have now made a user - continue to log in page"
    );
    if (!confirmed) {
        return;
    }

    registerForm.reset();

    registerRequest(body);
});

async function registerRequest(body) {
    body = JSON.stringify(body);
    const method = "post";
    const url = "https://v2.api.noroff.dev/auth/register";
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
        headers: headers,
        method: method,
        body: body,
    });

    const data = await response.json();
}
