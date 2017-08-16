(function () {
    'use strict';

    // get all the elements with a 'ripple-effect'
    let elements = document.getElementsByClassName('ripple-effect');
    let ignoreMouseDown = false, ignoreMouseUp = false;

    for (let i = 0; i < elements.length; i++) {
        let rippleContainer = SetupRippleEffect(elements[i]);

        elements[i].addEventListener('mousedown', function () { DisplayRipple(event, this, rippleContainer); });
        elements[i].addEventListener('mouseup', function () { FadeRipple(event, this, rippleContainer); });
        elements[i].addEventListener('mouseleave', function () { FadeRipple(event, this, rippleContainer); });

        elements[i].addEventListener('touchstart', function () { DisplayRipple(event, this, rippleContainer); });
        elements[i].addEventListener('touchend', function () { FadeRipple(event, this, rippleContainer); });
    }

    function DisplayRipple(event, element, rippleContainer) {
        if (event.type === 'mousedown') {
            if (ignoreMouseDown) {
                ignoreMouseDown = false;
                return;
            }
        } else if (event.type === 'touchstart') {
            ignoreMouseDown = ignoreMouseUp = true;
        }

        let ripple = rippleContainer.lastElementChild;
        ripple.classList.add('is-visible');

        // Display the ripple 
        SetRipplePos(event, element, rippleContainer);
    }

    function FadeRipple(event, element, rippleContainer) {
        if (event.type === 'mouseup')
            if (ignoreMouseUp) {
                ignoreMouseUp = false;
                return;
            }

        let ripple = rippleContainer.lastElementChild;

        if (!ripple.classList.contains('is-visible'))
            return;

        ripple.classList.remove('is-visible');
        // Fade the ripple 
        ripple.classList.add('is-fading');

        setTimeout(function () { rippleContainer.removeChild(ripple); }, 600);

        // Create a new ripple
        AddRippleToElement(element, rippleContainer);
    }

    /**
     * Sets up the ripple effect and returns the ripple container
     * @param {HTMLElement} element - the element which should have the ripple effect
     * @return {HTMLElement} rippleContainer
     */
    function SetupRippleEffect(element) {
        let rippleContainer = document.createElement('div');
        rippleContainer.classList.add('ripple-container');

        element.appendChild(rippleContainer);

        AddRippleToElement(element, rippleContainer);

        return rippleContainer;
    }

    function AddRippleToElement(element, rippleContainer) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');

        ripple.style.width = ripple.style.height = Math.max(element.clientHeight, element.clientWidth) + 'px';

        rippleContainer.appendChild(ripple);
    }

    function SetRipplePos(event, element, rippleContainer) {
        // get element offset
        let offset = element.getBoundingClientRect();
        // get click coords
        let x = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
        let y = event.clientY !== undefined ? event.clientY : event.touches[0].clientY;

        x = (x - offset.left) + 'px';
        y = (y - offset.top) + 'px';

        let ripple = rippleContainer.lastElementChild;
        ripple.style.top = y;
        ripple.style.left = x;
    }
})();