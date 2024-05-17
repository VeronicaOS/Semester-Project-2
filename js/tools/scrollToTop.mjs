export function scrollToTop(buttonId, scrollThreshold = 700) {
    const mybutton = document.getElementById(buttonId);

    if (!mybutton) {
        console.error(`Button with id "${buttonId}" not found`);
        return;
    }

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > scrollThreshold ||
            document.documentElement.scrollTop > scrollThreshold
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    mybutton.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
