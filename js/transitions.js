(function () {
    'use strict';

    let transitions = document.getElementsByClassName('transition');

    if (!transitions)
        return;

    for (let i = 0; i < transitions.length; i++) {
        let element = transitions[i];
        // check if it should do a radial transition
        if (element.classList.contains('radial-transform'))
            AddRadialTransform(element);

        // add the idle state to every transition element
        element.classList.add('is-idle');

        let trigger = document.getElementById(element.getAttribute('trigger'));
        if (trigger)
            trigger.addEventListener('click', function () { element.classList.remove('is-idle'); });

        let idle = document.getElementById(element.getAttribute('idle'));
        if (idle)
            idle.addEventListener('click', function () { setTimeout(function () { element.classList.add('is-idle'); }, 0); });

        let toggle = document.getElementById(element.getAttribute('toggle'));
        if (toggle)
            toggle.addEventListener('click', function () { element.classList.toggle('is-idle'); });

        // Debug only
        if (!trigger && !toggle) {
            console.warn(element);
            console.warn('does not have a toggle or trigger');
        }

        if (!idle && !toggle) {
            console.warn(element);
            console.warn(' does not have a toggle or idle');
        }
        // END Debug
    }

    function AddRadialTransform(element) {
        let parentRect = element.parentElement.getBoundingClientRect();
        let max = Math.max(parentRect.width, parentRect.height);
        element.style.width = element.style.height = (max * 1.5 + 'px');
    }
})();