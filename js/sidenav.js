(function () {
    'use strict';

    let menuBtn = document.getElementById('menu-btn');
    let overlayRest = document.getElementById('overlay-rest');
    let html = document.getElementsByTagName('html')[0];

    menuBtn.addEventListener('click', ToggleSidenav);
    overlayRest.addEventListener('click', ToggleSidenav);

    function ToggleSidenav() {
        document.body.classList.toggle('no-scroll');
        html.classList.toggle('no-scroll');
    }
})();