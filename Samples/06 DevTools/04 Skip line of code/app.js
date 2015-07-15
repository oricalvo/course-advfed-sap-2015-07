angular.module("MyApp", []).controller("HomeCtrl", function ($scope) {

    $scope.run = function () {
        f();

        g();

        console.log("xxx");
    }

    function f() {
        console.log("f");
    }

    function g() {
        console.log("g");
    }

});
