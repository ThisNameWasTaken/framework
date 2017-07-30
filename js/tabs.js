(function () {
    'use strict';

    let tabGroups = document.getElementsByClassName('tab-group');

    for (let i = 0; i < tabGroups.length; i++) {
        let tabItems = tabGroups[i].getElementsByClassName('tab-item');
        let lasActiveTab = undefined;

        for (let i = 0; i < tabItems.length; i++) {
            let tabToggle = document.getElementById(tabItems[i].getAttribute('for'));
            let tabContent = tabToggle.nextElementSibling;

            if (tabContent) {
                let tabBar = document.createElement('span');
                tabBar.classList.add('tab-bar');
                tabBar.classList.add('primary');
                tabItems[i].appendChild(tabBar);
            }

            tabItems[i].addEventListener('click', SetTabActive);

            console.log(tabToggle);
            if (tabToggle.checked)
                tabItems[i].click();
        }

        function SetTabActive() {
            if (lasActiveTab === this)
                return;

            if (lasActiveTab)
                lasActiveTab.classList.remove('is-active');

            this.classList.add('is-active');
            lasActiveTab = this;
        }
    }
})();