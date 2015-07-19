angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {
    var data = [];

    $scope.run = function () {
        setInterval(function onInterval() {
            var arr = [];

            arr.sort();

            f();
        }, 1000);
    }

    function f() {
        g();
    }

    function g() {
        h();
    }

    function h() {
        k();
    }

    function k() {
        var arr = [];

        for (var i = 0; i < 50000; i++) {
            data.push(Math.random());
        }
    }

});

