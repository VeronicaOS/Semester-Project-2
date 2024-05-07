export const BASE_URL = "https://v2.api.noroff.dev";
export const API_KEY_URL = "/auth/create-api-key";

export function load(key) {
    return JSON.parse(localStorage.getItem(key));
}

export const API_KEY = "031ca611-66c3-403a-b6c3-164fc8a29260"

// export async function getAPIKey() {
//     const response = await fetch(BASE_URL + API_KEY_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${load("token")}`,
//         },
//         body: JSON.stringify({
//             name: "Test key",
//         }),
//     });

//     if (response.ok) {
//         return await response.json();
//     }

//     console.error(await response.json());
//     throw new Error("Could not register for an API key");
// }

// getAPIKey().then(console.log);
