// Input fields and autoresizing text areas
(function () {
    'use strict';

    let textfieldInputs = document.getElementsByClassName('textfield__input');

    // each time the user clicks outside the form
    for (let i = 0; i < textfieldInputs.length; i++) {
        // toggle the active state of the input
        textfieldInputs[i].addEventListener('blur', ToggleActive);

        AddLabel(textfieldInputs[i]);
        // check if it should resize automatically
        if (textfieldInputs[i].classList.contains('auto-resize')) {
            console.log(textfieldInputs[i]);
            console.log('autoresizes');
            // remove user's ability to manually rise it
            textfieldInputs[i].classList.add('is-upgraded');

            // attach the mirrored text area
            let mirroredTextarea = document.createElement('div');
            mirroredTextarea.classList.add('textfield__mirrored-textarea');
            textfieldInputs[i].parentElement.appendChild(mirroredTextarea);

            // resize on input or window resize
            textfieldInputs[i].addEventListener('input', function () { Resize(this, mirroredTextarea); });
            window.addEventListener('resize', function () { Resize(textfieldInputs[i], mirroredTextarea); });
        }
    }

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
     * Resizes a text area when an input or window resize event is triggered
     * @param {HTMLInputElement} textarea - textarea input element
     * @param {HTMLElement} mirroredTextarea - the mirrored element for the textarea
     */
    function Resize(textarea, mirroredTextarea) {
        mirroredTextarea.textContent = textarea.value;

        textarea.style.height = mirroredTextarea.scrollHeight + 'px';
    }

    /**
     * Adds a material label to the textfield input element
     * @param {HTMLInputElement} textfieldInput - the textfield input which needs the label
     */
    function AddLabel(textfieldInput) {
        if (!textfieldInput.placeholder)
            return;

        // create the label
        let label = document.createElement('label');
        label.classList.add('textfield__label');
        label.innerHTML = textfieldInput.placeholder;
        // clear the placeholder
        textfieldInput.placeholder = '';
        // attach the label to the input group
        textfieldInput.parentElement.appendChild(label);
    }
})();

// Material sliders
(function () {
    'use strict';

    let sliderInputs = document.getElementsByClassName('slider__input');
    let isIE = navigator.userAgent.match(/Trident/g) || navigator.userAgent.match(/MSIE/g);

    // for IE 
    if (isIE) {
        let isActive = false;

        for (let i = 0; i < sliderInputs.length; i++) {
            HandleSliderProgress(sliderInputs[i]);
            // IE 'input' alternative for range input elements
            sliderInputs[i].addEventListener('mousedown', function () { isActive = true; let self = this; setTimeout(function () { HandleSliderProgress(self); }, 0); });
            sliderInputs[i].addEventListener('mouseup', function () { isActive = false; HandleSliderProgress(this); });
            sliderInputs[i].addEventListener('mousemove', function () { if (!isActive) return; HandleSliderProgress(this); });
        }
    } else {
        // for every other browser
        for (let i = 0; i < sliderInputs.length; i++) {
            HandleSliderProgress(sliderInputs[i]);

            sliderInputs[i].addEventListener('input', function () { HandleSliderProgress(this); });
        }
    }

    /**
     * Moves the progress bar for the slider element so that it matches the slider-thumb position
     * @param {HTMLInputElement} sliderInput - range input
     */
    function HandleSliderProgress(sliderInput) {
        let progressBar = sliderInput.parentElement.getElementsByClassName('slider__progressbar')[0];
        let percentage = (sliderInput.value - sliderInput.min) / (sliderInput.max - sliderInput.min);

        progressBar.style.width = (percentage * 100 + '%');
    }
})();   