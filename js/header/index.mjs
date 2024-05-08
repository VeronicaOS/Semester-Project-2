import { login, logout, updateUI } from "./loginLogout.mjs";

export function header() {
    login();
    logout();
    updateUI();
    document.addEventListener("DOMContentLoaded", updateUI);
}
