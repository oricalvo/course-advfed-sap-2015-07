(function () {

    function ClockController($scope, $interval) {
        $scope.time = new Date();

        $interval(function () {
            $scope.time = new Date();
        }, 1000);
    }

    angular.module("MyApp").directive("clock", function () {
        var ddo = {
            restrict: "E",
            controller: ClockController,
            templateUrl: "/clock.html",
        };

        return ddo;
    });

})();
