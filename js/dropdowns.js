(function () {
    'use strict';

    let clickableDropdowns = document.getElementsByClassName('dropdown');
    for (let i = 0; i < clickableDropdowns.length; i++) {
        UpgradeDropdown(clickableDropdowns[i]);
    }

    let hoverableDropdowns = document.getElementsByClassName('dropdown-hover');
    for (let i = 0; i < hoverableDropdowns.length; i++) {
        UpgradeDropdown(hoverableDropdowns[i]);
    }

    let lastActiveDropdownContent;
    let isDropdownActive = false;

    if (clickableDropdowns)
        window.addEventListener('click', function () {
            if (!isDropdownActive)
                return;
            if (event.target.classList.contains('dropdown-element'))
                return;

            lastActiveDropdownContent.classList.add('inactive');
            isDropdownActive = false;
        });

    function UpgradeDropdown(dropdown) {
        let dropdownContent = dropdown.getElementsByClassName('dropdown-content')[0];
        // make sure the position of the dropdown is set to static so that we can get the correct width and height
        dropdown.classList.add('js-pos-static');
        // set the width and height
        dropdownContent.style.width = ((dropdownContent.scrollWidth + 1) + 'px');
        dropdownContent.style.height = (dropdownContent.scrollHeight + 'px');

        // the dropdowns must be absolute so we remove the static class
        dropdown.classList.remove('js-pos-static');
        dropdown.classList.add('is-upgraded');

        // handle clicks if the dropdown is clickable
        if (dropdown.classList.contains('dropdown')) {
            dropdownContent.classList.add('inactive');

            let button = dropdown.getElementsByClassName('dropdown-button')[0];
            button.addEventListener('click', function () {
                if (lastActiveDropdownContent === dropdownContent && !dropdownContent.classList.contains('inactive'))
                    return;

                setTimeout(function () {
                    dropdownContent.classList.remove('inactive');
                    isDropdownActive = true;
                    lastActiveDropdownContent = dropdownContent;
                    console.log('click on btn');
                }, 0);
            });
        }

        // add the ripple effect to each dropdownitem
        let dropdownItems = dropdown.getElementsByClassName('dropdown-item');
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].classList.add('ripple-effect');
        }
    }
})();