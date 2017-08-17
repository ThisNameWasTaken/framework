(function () {
    'use strict';

    let tabBars = document.getElementsByClassName('tab__bar');

    for (let i = 0; i < tabBars.length; i++) {
        let tabItems = tabBars[i].getElementsByClassName('tab__item');
        let lastActiveTab = undefined;

        for (let i = 0; i < tabItems.length; i++) {
            tabItems[i].addEventListener('click', SetTabActive);

            let tabToggle = document.getElementById(tabItems[i].getAttribute('for'));
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