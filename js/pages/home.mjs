import { header } from "../utils/index.mjs";
import { scrollToTop } from "../tools/scrollToTop.mjs";

document.addEventListener("DOMContentLoaded", function () {
    header();
});

scrollToTop("btn-back-to-top", 700);
