/// <reference path="backbone.js" />

(function () {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            ":viewName": "view",
        },

        home: function () {
            App.home();
        },

        view: function (viewName) {
            App.switchView($("." + viewName));
        }
    });
    new AppRouter();

    var SecondRouter = Backbone.Router.extend({
        routes: {
            "second": "run",
        },

        run: function () {
            alert("second router");
        },
    });
    new SecondRouter();
})();
