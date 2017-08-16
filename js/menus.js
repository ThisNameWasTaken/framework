(function () {
    'use strict';

    let clickableMenus = document.getElementsByClassName('menu');
    for (let i = 0; i < clickableMenus.length; i++) {
        UpgradeDropdown(clickableMenus[i]);
    }

    let hoverableMenu = document.getElementsByClassName('menu-hover');
    for (let i = 0; i < hoverableMenu.length; i++) {
        UpgradeDropdown(hoverableMenu[i]);
    }

    let lastActiveDropdownContent;
    let isDropdownActive = false;

    if (clickableMenus)
        window.addEventListener('click', function () {
            if (!isDropdownActive)
                return;

            lastActiveDropdownContent.classList.add('inactive');
            isDropdownActive = false;
        });

    function UpgradeDropdown(dropdown) {
        let dropdownContent = dropdown.getElementsByClassName('menu__content')[0];
        // make sure the position of the dropdown is set to static so that we can get the correct width and height
        dropdown.classList.add('js-pos-static');
        // set the width and height
        dropdownContent.style.width = ((dropdownContent.scrollWidth + 1) + 'px');
        dropdownContent.style.height = (dropdownContent.scrollHeight + 'px');

        // the dropdowns must be absolute so we remove the static class
        dropdown.classList.remove('js-pos-static');
        dropdown.classList.add('is-upgraded');

        // handle clicks if the dropdown is clickable
        if (dropdown.classList.contains('menu')) {
            dropdownContent.classList.add('inactive');

            let button = dropdown.getElementsByClassName('menu__button')[0];

            button.addEventListener('click', function () {
                if (lastActiveDropdownContent === dropdownContent && !dropdownContent.classList.contains('inactive'))
                    return;

                setTimeout(function () {
                    dropdownContent.classList.remove('inactive');
                    isDropdownActive = true;
                    lastActiveDropdownContent = dropdownContent;
                }, 0);
            });
        }

        // add the ripple effect to each dropdownitem
        let dropdownItems = dropdown.getElementsByClassName('menu__item');
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].classList.add('ripple-effect');
        }
    }
})();