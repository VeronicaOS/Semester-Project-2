import { changeHeader } from "./changeHeader.mjs";
import { handleLogout } from "./Logout.mjs";
import { navSearch } from "./search.mjs";

export function header() {
    changeHeader();
    handleLogout();
    navSearch();
}
