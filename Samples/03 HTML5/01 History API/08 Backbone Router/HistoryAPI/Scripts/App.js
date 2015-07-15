/// <reference path="backbone.js" />

(function () {
    function App() {
        var me = this;

        me.currentView = null;
    }

    App.prototype.run = function () {
        var me = this;

        Backbone.history.start({ pushState: true, trigger: true });
    }

    App.prototype.home = function () {
        var me = this;

        var mainView = $("[data-main-view]");
        if (!mainView.length) {
            return;
        }

        me.switchView(mainView);
    }

    App.prototype.navigate = function (url) {
        var me = this;

        Backbone.history.navigate(url, { trigger: true });
    }

    App.prototype.switchView = function (el) {
        var me = this;

        if (!el.length) {
            return;
        }

        if (me.currentView) {
            me.deactivateView(me.currentView);
        }

        me.currentView = el;

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
