(function () {
    function App() {
        var me = this;

        me.currentView = null;
    }

    App.prototype.run = function () {
        var me = this;

        var mainView = $("[data-main-view]");
        if (!mainView.length) {
            return;
        }

        me.activateView(mainView);
    }

    App.prototype.switchView = function (selector) {
        var me = this;

        var newView = $(selector);
        if (!newView.length) {
            return;
        }

        if (me.currentView) {
            me.deactivateView(me.currentView);
        }

        me.currentView = newView;

        me.activateView(me.currentView);
    }

    App.prototype.activateView = function (el) {
        var me = this;

        el.addClass("active");

        me.currentView = el;
    }

    App.prototype.deactivateView = function (el) {
        var me = this;

        el.removeClass("active");

        me.currentView = null;
    }

    window.App = new App();

    $(function () {
        window.App.run();
    });
})();
