(function () {

    function ContactService($q, $http) {
        this.contacts = [
            { id: 1, name: "Ori" },
            { id: 2, name: "Roni" },
        ];
        this.$q = $q;
        this.$http = $http;
    }

    ContactService.prototype.getAll = function () {
        return this.$http.get("/contacts.html").then(function (response) {
            return response.data;
        });

        //var promise = this.$q.when(this.contacts);
        //return promise;
    }

    ContactService.prototype.removeById = function (id) {
        var index = -1;

        for (var i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].id == id) {
                index = i;
            }
        }

        if (index != -1) {
            this.contacts.splice(index, 1);
        }

        return this.$q.when(id);
    }

    angular.module("MyApp").service("contactService", ContactService);

})();
