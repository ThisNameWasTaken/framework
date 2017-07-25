(function () {
    'use strict';

    let menuBtn = document.getElementById('menu-btn');
    let overlay = document.getElementById('overlay');
    let html = document.getElementsByTagName('html')[0];

    menuBtn.addEventListener('click', OpenSidenav);

    function OpenSidenav() {
        // disable scroll
        document.body.classList.add('no-scroll');
        html.classList.add('no-scroll');

        // display the sidenav
        overlay.classList.remove('hide');
    }

    overlay.addEventListener('click', CloseSidenav);

    function CloseSidenav() {
        // enable scroll
        document.body.classList.remove('no-scroll');
        html.classList.remove('no-scroll');

        // hide the sidenav
        overlay.classList.add('hide');
    }
})();