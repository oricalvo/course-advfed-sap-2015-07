angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    var arr = [];

    for (var i = 0; i < 1000000; i++) {
        arr.push(Math.random());
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    $scope.run = function () {
        //arr.sort();
    }

});

