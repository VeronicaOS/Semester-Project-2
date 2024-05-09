import { changeHeader } from "./buttonProfile.mjs";
import { handleLogout } from "./Logout.mjs";

export function header() {
    changeHeader();
    handleLogout();
}
