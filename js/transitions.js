(function () {
    'use strict';

    let transitions = document.getElementsByClassName('transition');

    if (!transitions)
        return;

    for (let i = 0; i < transitions.length; i++) {
        let element = transitions[i];

        // add the stopped state to every transition element
        element.classList.add('is-stopped');

        let triggers = element.getAttribute('trigger');
        if (triggers) {
            triggers = triggers.split(' ');
            for (let i = 0; i < triggers.length; i++) {
                let trigger = document.getElementById(triggers[i]);
                if (trigger)
                    trigger.addEventListener('click', function () { element.classList.remove('is-stopped'); });
                // DEBUG ONLY
                // else
                //     console.warn('wrong trigger id ' + trigger[i]);
            }
        }

        let stops = element.getAttribute('idle')
        if (stops) {
            stops = stops.split(' ');
            for (let i = 0; i < stops.length; i++) {
                let stop = document.getElementById(stops[i]);
                if (stop)
                    stop.addEventListener('click', function () { setTimeout(function () { element.classList.add('is-stopped'); }, 0); });
                // DEBUG ONLY
                // else
                //     console.warn('wrong stop id ' + stops[i]);
            }
        }

        let toggles = element.getAttribute('toggle');
        if (toggles) {
            toggles = toggles.split(' ');
            for (let i = 0; i < toggles.length; i++) {
                let toggle = document.getElementById(toggles[i]);
                if (toggle)
                    toggle.addEventListener('click', function () { element.classList.toggle('is-stopped'); });
                // DEBUG ONLY
                // else
                //     console.warn('wrong toggle id ' + toggle[i]);
            }
        }
    }
})();