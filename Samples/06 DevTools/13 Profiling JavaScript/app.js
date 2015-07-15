angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    $scope.run = function () {
        setInterval(function onInterval() {
            var arr = [];

            for (var i = 0; i < 5000; i++) {
                arr.push(Math.random());
            }

            arr.sort();

            f();
        }, 100);
    }

    function f() {
        var arr = [];

        for (var i = 0; i < 5000; i++) {
            arr.push(Math.random());
        }

        arr.sort();

        g();


    }

    function g() {
        var arr = [];

        for (var i = 0; i < 5000; i++) {
            arr.push(Math.random());
        }

        arr.sort();
    }

});

