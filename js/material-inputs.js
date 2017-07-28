// Input fields and autoresizing text areas
(function () {
    'use strict';

    (function UpdateInputEvents() {
        let inputs = document.getElementsByClassName('material-input');

        // each time the user clicks outside the form
        for (let i = 0; i < inputs.length; i++) {
            // toggle the active state of the input
            inputs[i].addEventListener('blur', ToggleActive);

            AddLabel(inputs[i]);

            // check if it should resize automatically
            if (inputs[i].classList.contains('auto-resize')) {
                // remove user's ability to manually rise it
                inputs[i].classList.add('is-upgraded');
                // resize on input
                inputs[i].addEventListener('input', function () { Resize(inputs[i], event); });
                // resize on window resize
                window.addEventListener('resize', function () { Resize(inputs[i], event); })
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
    function Resize(textArea, event) {
        // resize the input so that it won't take more space that it should
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';

        if (event.type === 'resize')
            return;

        /*  when the weired scroll happens because the screen is no longer big enough
            scroll back to the input */
        textArea.scrollTop = textArea.scrollHeight;
        window.scrollTo(window.scrollLeft, textArea.scrollHeight + textArea.scrollTop);
    }

    /**
     * Adds a material label to the input element
     * @param {HTMLInputElement} input - the input which needs the label
     */
    function AddLabel(input) {
        if (!input.placeholder)
            return;

        // create the label
        let label = document.createElement('label');
        label.classList.add('material-label');
        label.innerHTML = input.placeholder;
        // clear the placeholder
        input.placeholder = '';
        // attach the label to the input group
        input.parentElement.appendChild(label);
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