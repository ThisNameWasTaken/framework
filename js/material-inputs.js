let materialForms = {
    lastClickPos: { x: 0, y: 0 }
};

function UpdateInputEvents() {
    let inputs = document.getElementsByClassName("material-input");

    // each time the user clicks outside the form
    for (let i = 0; i < inputs.length; i++) {
        // toggle the active state
        inputs[i].addEventListener("blur", ToggleActive);
    }

    let selfResizingTextAreas = document.getElementsByClassName("self-resize");
    // resize each textarea when the user types something
    for (let i = 0; i < selfResizingTextAreas.length; i++) {
        selfResizingTextAreas[i].addEventListener("keydown", function (event) { Resize(this, event); });
        selfResizingTextAreas[i].addEventListener("keyup", function (event) { Resize(this, event); });
        selfResizingTextAreas[i].addEventListener("cut", function (event) { Resize(this, event); });
        selfResizingTextAreas[i].addEventListener("click", function (event) { SetLastClickPos(this, event); });
    }
}

/**
 * resizes a 'selfresizing element' when an event is triggered
 * @param {object} element - the element that should be resized
 * @param {object} event - the event that triggered this function
 */
function Resize(element, event) {
    if (!event || !element)
        return;

    if (event.type === "cut" || event.key === "Backspace" || event.key === "Delete") {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
        window.scrollTo(0, materialForms.lastClickPos.y);
    }

    if (element.scrollTop) {
        element.style.height = element.scrollHeight + "px";
    }
}

/**
 * sets the lastClickPos global variable 
 * lastClickPos - stores the last click (on a selfresizing element) position
 * @param {object} element - the element which was clicked
 * @param {object} event - the event that triggered this function
 * https://www.youtube.com/
 */
function SetLastClickPos(element, event) {
    // if the form is not empty that means the user wants to edit a specific area so we should scroll to that 
    if (element.value)
        materialForms.lastClickPos.y = event.clientY - element.getBoundingClientRect().top;
    // otherwise we can simply keep scrolling to the bottom of the textarea
    else
        materialForms.lastClickPos.y = element.getBoundingClientRect().bottom;
}

function ToggleActive() {
    if (this.value) // if the form is not empty that means it's active
        this.classList.add("active");
    else
        this.classList.remove("active");
}

UpdateInputEvents();

function ResizeAllTextAreas() {
    let selfResizingTextAreas = document.getElementsByClassName("self-resize");

    for (let i = 0; i < selfResizingTextAreas.length; i++) {
        Resize(selfResizingTextAreas[i]);
    }
}

window.addEventListener("resize", ResizeAllTextAreas);

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
        return;
    }

    // for every other browser
    for (let i = 0; i < sliders.length; i++) {
        HandleSliderProgress(sliders[i]);

        sliders[i].addEventListener('input', function () { HandleSliderProgress(this); });
    }

    function HandleSliderProgress(slider) {
        let progressBar = slider.parentElement.getElementsByClassName('material-range-progress')[0];
        let percentage = (slider.value - slider.min) / (slider.max - slider.min);

        progressBar.style.width = (percentage * 100 + '%');
    }
})();   