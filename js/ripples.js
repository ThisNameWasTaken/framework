(function () {
    // get all the elements with a 'ripple-effect'
    let elements = document.getElementsByClassName('ripple-effect');

    for (let i = 0; i < elements.length; i++) {
        AttachRipple(elements[i]);

        elements[i].addEventListener('mousedown', DisplayRipple);
        elements[i].addEventListener('mouseup', FadeRipple);

        elements[i].addEventListener('touchstart', DisplayRipple);
        elements[i].addEventListener('touchend', FadeRipple);
    }

    let ignoreMouse = false;

    function DisplayRipple() {
        if (event.type === 'mousedown') {
            if (ignoreMouse) {
                ignoreMouse = false;
                return;
            }
        } else if (event.type === 'touchstart') {
            ignoreMouse = true;
        }

        this.classList.remove('is-fading');
        SetRipplePos(event, this);
        let self = this;
        setTimeout(function () { self.classList.add('is-visible'); }, 0);
    }

    function FadeRipple() {
        this.classList.remove('is-visible');
        this.classList.add('is-fading');
    }

    function AttachRipple(element) {
        let rippleContainer = document.createElement('div');
        rippleContainer.classList.add('ripple-container');

        let ripple = document.createElement('span');
        ripple.classList.add('ripple');

        AddRippleShade(ripple, element);

        ripple.style.width = ripple.style.height = Math.max(element.clientHeight, element.clientWidth) + 'px';

        rippleContainer.appendChild(ripple);
        element.appendChild(rippleContainer);
    }

    function SetRipplePos(event, element) {
        if (element.classList.contains('check'))
            return;

        // get element offset
        let offset = element.getBoundingClientRect();
        // get click coords
        let x = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
        let y = event.clientY !== undefined ? event.clientY : event.touches[0].clientY;

        x = (x - offset.left) + 'px';
        y = (y - offset.top) + 'px';

        let ripple = element.getElementsByClassName('ripple')[0];
        ripple.style.top = y;
        ripple.style.left = x;
    }

    function AddRippleShade(ripple, element) {
        if (element.classList.contains('check'))
            return;

        // we choose ripple's color based on element's background color
        let bgColor = window.getComputedStyle(element).backgroundColor;
        // get each color value
        let rgba = bgColor.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

        // if the color is whitish add a black ripple
        if (rgba[0] >= 210 && rgba[1] >= 210 && rgba[2] >= 210)
            ripple.classList.add('black');
        else if (rgba[3] <= 0.35)
            ripple.classList.add('black');
        else // otherwhise add a white ripple
            ripple.classList.add('white');
    }
})();