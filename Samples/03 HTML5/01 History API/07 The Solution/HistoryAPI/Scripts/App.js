(function () {
    function App() {
        var me = this;

        me.currentView = null;

        //
        //  Register to URL changed event
        //
        window.addEventListener("popstate", function (e) {
            me.onPopState(e);
        });
    }

    App.prototype.run = function () {
        var me = this;
    }

    App.prototype.onPopState = function (e) {
        var me = this;

        var state = e.state;
        if (state == null) {
            //
            //  Probably this is the first popstate event (just after onload). Firefox does not fire popstate after onload (Chrome and Safari does)
            //
            me.switchView("[data-main-view]");
        }
        else {
            me.switchView(state.selector);
        }
    }

    App.prototype.navigate = function (url, selector) {
        var me = this;

        var state = {
            selector: selector
        };
        var title = "";

        history.pushState(state, title, url);

        //
        //  pushState does not trigger popstate
        //  popstate event is triggered only when the end user pushes back/forward
        //
        me.onPopState({ state: history.state });
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
