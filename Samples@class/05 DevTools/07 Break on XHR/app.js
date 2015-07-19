angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    $scope.run = function () {
        $http.get("/api/contact").then(function () {
            console.log("OK");
        }).catch(function () {
            console.log("FAILED");
        });
    }
});
