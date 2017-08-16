(function () {
    'use strict';

    let tabGroups = document.getElementsByClassName('tab__group');

    for (let i = 0; i < tabGroups.length; i++) {
        let tabItems = tabGroups[i].getElementsByClassName('tab__item');
        let lastActiveTab = undefined;

        for (let i = 0; i < tabItems.length; i++) {
            let tabToggle = document.getElementById(tabItems[i].getAttribute('for'));
            let tabContent = tabToggle.nextElementSibling;
            // add the bottom bar
            if (tabContent) {
                let tabBar = document.createElement('span');
                tabBar.classList.add('tab__bar');
                tabBar.classList.add('primary');
                tabItems[i].appendChild(tabBar);
            }

            // when a tab item is clicked add a bar to the bottom
            tabItems[i].addEventListener('click', SetTabActive);
            // add the bottom-bar to the active element of the group
            if (tabToggle.checked)
                tabItems[i].click();
        }

        function SetTabActive() {
            if (lastActiveTab === this)
                return;

            if (lastActiveTab)
                lastActiveTab.classList.remove('is-active');

            this.classList.add('is-active');
            lastActiveTab = this;
        }
    }
})();