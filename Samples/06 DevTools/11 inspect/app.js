angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    $scope.run = function () {
        window.pt1 = new Point(5, 10);
    }

});

