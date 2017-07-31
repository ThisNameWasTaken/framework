(function () {
    'use strict';

    let openBtns = document.getElementsByClassName('opens-overlay');
    let overlays = document.getElementsByClassName('overlay');
    let html = document.getElementsByTagName('html')[0];

    for (let i = 0; i < openBtns.length; i++) {
        openBtns[i].addEventListener('click', LockViewport);

        let closeBtns = overlays[i].getElementsByClassName('closes-overlay');
        for (let i = 0; i < closeBtns.length; i++)
            closeBtns[i].addEventListener('click', UnlockViewport);
    }

    function LockViewport() {
        document.body.classList.add('no-scroll');
        html.classList.add('no-scroll');
    }

    function UnlockViewport() {
        document.body.classList.remove('no-scroll');
        html.classList.remove('no-scroll');
    }
})();