// Input fields and self resizing text areas
(function () {
    'use strict';

    (function UpdateInputEvents() {
        let inputs = document.getElementsByClassName("material-input");

        // each time the user clicks outside the form
        for (let i = 0; i < inputs.length; i++) {
            // toggle the active state of the input
            inputs[i].addEventListener("blur", ToggleActive);

            // check if it should be self resizable
            if (inputs[i].classList.contains('self-resize'))
                inputs[i].addEventListener("input", Resize);
        }
    })();

    /**
     * Toggles the active state of material inputs
     */
    function ToggleActive() {
        if (this.value) // if the form is not empty that means it's active
            this.classList.add("active");
        else
            this.classList.remove("active");
    }

    /**
     * Resizes a 'selfresizing element' when an input event is triggered
     */
    function Resize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        this.scrollTop = this.scrollHeight;
        window.scrollTo(window.scrollLeft, this.scrollHeight + this.scrollTop);
    }

    /**
     * Resizes all text areas on window resize
     */
    function ResizeAllTextAreas() {
        let selfResizingTextAreas = document.getElementsByClassName("self-resize");

        for (let i = 0; i < selfResizingTextAreas.length; i++) {
            Resize(selfResizingTextAreas[i]);
        }
    }

    window.addEventListener("resize", ResizeAllTextAreas);
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

    function HandleSliderProgress(slider) {
        let progressBar = slider.parentElement.getElementsByClassName('material-range-progressbar')[0];
        let percentage = (slider.value - slider.min) / (slider.max - slider.min);

        progressBar.style.width = (percentage * 100 + '%');
    }
})();   