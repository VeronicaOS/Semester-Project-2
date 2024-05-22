export const BASE_URL = "https://v2.api.noroff.dev";
export const API_KEY_URL = "/auth/create-api-key";

export function load(key) {
    return JSON.parse(localStorage.getItem(key));
}

export const API_KEY = "031ca611-66c3-403a-b6c3-164fc8a29260"