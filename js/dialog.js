(function () {
    'use strict';

    let dialogOverlay = document.getElementById('dialog-overlay');
    let openBtn = document.getElementById('open-dialog');
    let closeBtn = document.getElementById('close-dialog');
    let html = document.getElementsByTagName('html')[0];

    openBtn.addEventListener('click', DisplayOverlay);

    function DisplayOverlay() {
        dialogOverlay.classList.remove('hide');

        document.body.classList.add('no-scroll');
        html.classList.add('no-scroll');
    }

    closeBtn.addEventListener('click', HideOverlay);

    function HideOverlay() {
        dialogOverlay.classList.add('hide');

        document.body.classList.remove('no-scroll');
        html.classList.remove('no-scroll');
    }
})();