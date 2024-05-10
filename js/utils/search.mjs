const searchBar = document.getElementById("search");

export function navSearch() {
    searchBar.addEventListener("search", () => {
        if (searchBar.value.length > 0) {
            window.location.href = `/pages/listings/?search=${searchBar.value}`;
        }
    });
}
