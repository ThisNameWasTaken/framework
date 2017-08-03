(function () {
    'use strict';


    let elements = document.getElementsByClassName('check-in-view');

    for (let i = 0; i < elements.length; i++) {
        let ellement = elements[i];
        window.addEventListener('scroll', function () { console.log(CheckInView(ellement)); });
    }

    function CheckInView(element) {
        let elementRect = element.getBoundingClientRect();

        return (
            elementRect.top >= 0 &&
            elementRect.left >= 0 &&
            elementRect.bottom <= window.innerHeight &&
            elementRect.right <= window.innerWidth);
    }
})();