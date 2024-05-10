import { changeHeader } from "./changeHeader.mjs";
import { handleLogout } from "./Logout.mjs";

export function header() {
    changeHeader();
    handleLogout();
}
