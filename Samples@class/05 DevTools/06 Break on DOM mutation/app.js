angular.module("MyApp", []).controller("HomeCtrl", function ($scope) {

    $scope.showSection = false;

    $scope.toggle = function () {
        console.log("run");

        $scope.showSection = !$scope.showSection;
    }
});
