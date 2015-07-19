angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    $scope.run = function () {

        console.log("f");

        console.log("g");

        console.log("h");

        console.trace();
    }
});
