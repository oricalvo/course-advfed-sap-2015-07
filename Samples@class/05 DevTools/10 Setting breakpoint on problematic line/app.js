angular.module("MyApp", []).controller("HomeCtrl", function ($scope, $http) {

    g.metadata = [1, 2, 3];
    function g() {
        console.log("GG");
    }

    $scope.run = function () {

        console.group("G");

        console.group("G2");

        console.log("f");
        console.error("f");
        console.warn("f");
        console.debug("f");

        console.groupEnd();

        console.info("f");

        console.groupEnd();

        var arr = [
            { id: 1, name: "Ori" },
            { id: 2, name: "Roni" },
        ];

        debugger;
    }

});

