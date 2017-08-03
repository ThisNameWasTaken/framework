(function () {
    'use strict';

    let openBtns = document.getElementsByClassName('opens-overlay');
    let overlays = document.getElementsByClassName('overlay');
    let html = document.getElementsByTagName('html')[0];

    let transitionDelay = 270;

    for (let i = 0; i < openBtns.length; i++) {
        openBtns[i].addEventListener('click', ToggleViewportLock);

        overlays[i].classList.add('is-upgraded');

        let closeBtns = overlays[i].getElementsByClassName('closes-overlay');
        for (let i = 0; i < closeBtns.length; i++) {
            closeBtns[i].addEventListener('click', function () {
                setTimeout(function () {
                    ToggleViewportLock();
                }, transitionDelay);
            });
        }
    }

    function ToggleViewportLock() {
        document.body.classList.toggle('no-scroll');
        html.classList.toggle('no-scroll');
    }
})();