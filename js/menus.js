(function () {
    'use strict';

    let clickableMenus = document.getElementsByClassName('menu');
    for (let i = 0; i < clickableMenus.length; i++) {
        UpgradeMenu(clickableMenus[i]);
    }

    let hoverableMenu = document.getElementsByClassName('menu-hover');
    for (let i = 0; i < hoverableMenu.length; i++) {
        UpgradeMenu(hoverableMenu[i]);
    }

    let lastActiveMenuContent;
    let isMenuActive = false;

    if (clickableMenus)
        window.addEventListener('click', function () {
            if (!isMenuActive)
                return;

            lastActiveMenuContent.classList.add('inactive');
            isMenuActive = false;
        });

    /**
     * Upgrades the specified menu
     * @param {HTMLElement} menu 
     */
    function UpgradeMenu(menu) {
        let menuContent = menu.getElementsByClassName('menu__content')[0];
        // make sure the position of the dropdown is set to static so that we can get the correct width and height
        menu.classList.add('js-pos-static');
        // set the width and height
        menuContent.style.width = ((menuContent.scrollWidth + 1) + 'px');
        menuContent.style.height = (menuContent.scrollHeight + 'px');

        // the dropdowns must be absolute so we remove the static class
        menu.classList.remove('js-pos-static');
        menu.classList.add('is-upgraded');

        // handle clicks if the dropdown is clickable
        if (menu.classList.contains('menu')) {
            menuContent.classList.add('inactive');

            let menuButton = menu.getElementsByClassName('menu__button')[0];

            menuButton.addEventListener('click', function () {
                if (lastActiveMenuContent === menuContent && !menuContent.classList.contains('inactive'))
                    return;

                setTimeout(function () {
                    menuContent.classList.remove('inactive');
                    isMenuActive = true;
                    lastActiveMenuContent = menuContent;
                }, 0);
            });
        }

        // add the ripple effect to each dropdownitem
        let menuItems = menu.getElementsByClassName('menu__item');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.add('ripple-effect');
        }
    }
})();