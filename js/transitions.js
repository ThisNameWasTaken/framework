(function () {
    'use strict';

    let transitions = document.getElementsByClassName('transition');

    if (!transitions)
        return;

    for (let i = 0; i < transitions.length; i++) {
        // check if it should do a radial transition
        if (transitions[i].classList.contains('radial-transform'))
            AddRadialTransform(transitions[i]);

        // add the idle state to every transition element
        transitions[i].classList.add('is-idle');

        let trigger = document.getElementById(transitions[i].getAttribute('trigger'));
        if (trigger)
            trigger.addEventListener('click', function () { transitions[i].classList.remove('is-idle'); });

        let idle = document.getElementById(transitions[i].getAttribute('idle'));
        if (idle)
            idle.addEventListener('click', function () { setTimeout(function () { transitions[i].classList.add('is-idle'); }, 0); });

        let toggle = document.getElementById(transitions[i].getAttribute('toggle'));
        if (toggle)
            toggle.addEventListener('click', function () { transitions[i].classList.toggle('is-idle'); });

        // Debug only
        if (!trigger && !toggle) {
            console.warn(transitions[i]);
            console.warn('does not have a toggle or trigger');
        }

        if (!idle && !toggle) {
            console.warn(transitions[i]);
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