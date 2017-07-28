// Input fields and autoresizing text areas
(function () {
    'use strict';

    (function UpdateInputEvents() {
        let inputs = document.getElementsByClassName('material-input');

        // each time the user clicks outside the form
        for (let i = 0; i < inputs.length; i++) {
            // toggle the active state of the input
            inputs[i].addEventListener('blur', ToggleActive);

            // check if it should resize automatically
            if (inputs[i].classList.contains('auto-resize')) {
                inputs[i].addEventListener('input', function () { Resize(this); });
                window.addEventListener('resize', function () { Resize(this); })
            }
        }
    })();

    /**
     * Toggles the active state of material inputs
     */
    function ToggleActive() {
        if (this.value) // if the form is not empty that means it's active
            this.classList.add('active');
        else
            this.classList.remove('active');
    }

    /**
     * Resizes a text area when an input event is triggered
     * @param {HTMLInputElement} textArea - text area input element
     */
    function Resize(textArea) {
        // resize the input so that it won't take more space that it should
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
        /*  when the weired scroll happens because the screen is no longer big enough
            scroll back to the input */
        textArea.scrollTop = textArea.scrollHeight;
        window.scrollTo(window.scrollLeft, textArea.scrollHeight + textArea.scrollTop);
    }
})();

// Material sliders
(function () {
    'use strict';

    let sliders = document.getElementsByClassName('material-range');
    let isIE = navigator.userAgent.match(/Trident/g) || navigator.userAgent.match(/MSIE/g);

    // for IE 
    if (isIE) {
        let isActive = false;

        for (let i = 0; i < sliders.length; i++) {
            HandleSliderProgress(sliders[i]);
            // IE 'input' alternative for range input elements
            sliders[i].addEventListener('mousedown', function () { isActive = true; let self = this; setTimeout(function () { HandleSliderProgress(self); }, 0); });
            sliders[i].addEventListener('mouseup', function () { isActive = false; HandleSliderProgress(this); });
            sliders[i].addEventListener('mousemove', function () { if (!isActive) return; HandleSliderProgress(this); });
        }
    } else {
        // for every other browser
        for (let i = 0; i < sliders.length; i++) {
            HandleSliderProgress(sliders[i]);

            sliders[i].addEventListener('input', function () { HandleSliderProgress(this); });
        }
    }

    /**
     * Moves the progress bar for the slider element so that it matches the slider-thumb position
     * @param {HTMLInputElement} slider - range input
     */
    function HandleSliderProgress(slider) {
        let progressBar = slider.parentElement.getElementsByClassName('material-range-progressbar')[0];
        let percentage = (slider.value - slider.min) / (slider.max - slider.min);

        progressBar.style.width = (percentage * 100 + '%');
    }
})();   