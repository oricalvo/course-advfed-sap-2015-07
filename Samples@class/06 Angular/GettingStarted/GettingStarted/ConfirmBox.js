(function () {

    function ConfirmBox($q) {
        this.$q = $q;
    }

    ConfirmBox.prototype.show = function (message) {

        var deferred = this.$q.defer();

        if (confirm(message)) {
            deferred.resolve();
        }
        else {
            deferred.reject();
        }

        return deferred.promise;
    }

    angular.module("MyApp").service("confirmBox", ConfirmBox);

})();
