'use strict';

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

let requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * 
 * @param {number} to 
 * @param {number} duration - time in miliseconds
 * @param {function} callback 
 */
function scrollTo(to, duration, callback) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }

    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }

    let start = position();
    let change = to - start;
    let currentTime = 0;
    let increment = 20;
    duration = (typeof (duration) === 'undefined') ? 500 : duration;

    let animateScroll = function () {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        // move the document.body
        move(val);
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        }
    };
    animateScroll();
}