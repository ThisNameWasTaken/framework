(function () {
    'use strict';

    let buttons = document.getElementsByClassName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('mouseup', BlurButton);
    }

    /**
     * Blurs the button so that the bigger shadow only shows on keyboard input
     */
    function BlurButton() {
        let self = this;
        setTimeout(function () { self.blur(); }, 0);
    }
})();