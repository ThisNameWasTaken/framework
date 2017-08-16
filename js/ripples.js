(function () {
    'use strict';

    // get all the elements with a 'ripple-effect'
    let elements = document.getElementsByClassName('ripple-effect');

    let ignoreMouseDown = false, ignoreMouseUp = false;

    for (let i = 0; i < elements.length; i++) {
        SetupRippleEffect(elements[i]);

        elements[i].addEventListener('mousedown', DisplayRipple);
        elements[i].addEventListener('mouseup', FadeRipple);
        elements[i].addEventListener('mouseleave', FadeRipple);

        elements[i].addEventListener('touchstart', DisplayRipple);
        elements[i].addEventListener('touchend', FadeRipple);
    }

    function DisplayRipple() {

        if (event.type === 'mousedown') {
            if (ignoreMouseDown) {
                ignoreMouseDown = false;
                return;
            }
        } else if (event.type === 'touchstart') {
            ignoreMouseDown = ignoreMouseUp = true;
        }

        let rippleContainer = this.getElementsByClassName('ripple-container')[0];
        let ripple = rippleContainer.lastElementChild;
        ripple.classList.add('is-visible');

        // Display the ripple 
        SetRipplePos(event, this);
    }

    function FadeRipple() {
        if (event.type === 'mouseup')
            if (ignoreMouseUp) {
                ignoreMouseUp = false;
                return;
            }

        let rippleContainer = this.getElementsByClassName('ripple-container')[0];
        let ripple = rippleContainer.lastElementChild;

        if (!ripple.classList.contains('is-visible'))
            return;

        ripple.classList.remove('is-visible');
        // Fade the ripple 
        ripple.classList.add('is-fading');

        setTimeout(function () { rippleContainer.removeChild(ripple); }, 600);

        // Create a new ripple
        AddRippleToElement(this);
    }

    function SetupRippleEffect(element) {
        let rippleContainer = document.createElement('div');
        rippleContainer.classList.add('ripple-container');

        element.appendChild(rippleContainer);

        AddRippleToElement(element);
    }

    function AddRippleToElement(element) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');

        ripple.style.width = ripple.style.height = Math.max(element.clientHeight, element.clientWidth) + 'px';

        let rippleContainer = element.getElementsByClassName('ripple-container')[0];
        rippleContainer.appendChild(ripple);
    }

    function SetRipplePos(event, element) {
        // get element offset
        let offset = element.getBoundingClientRect();
        // get click coords
        let x = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
        let y = event.clientY !== undefined ? event.clientY : event.touches[0].clientY;

        x = (x - offset.left) + 'px';
        y = (y - offset.top) + 'px';

        let rippleContainer = element.getElementsByClassName('ripple-container')[0];
        let ripple = rippleContainer.lastElementChild;
        ripple.style.top = y;
        ripple.style.left = x;
    }
})();