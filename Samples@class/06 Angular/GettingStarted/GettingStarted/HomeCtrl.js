(function () {
    "use strict";

    function HomeCtrl(contactService, confirmBox, $q) {
        var me = this;

        me.confirmBox = confirmBox;
        me.contactService = contactService;

        this.onInit = contactService.getAll().then(function (contacts) {
            me.contacts = contacts;
        });
    }

    HomeCtrl.prototype.remove = function (contact, index) {
        var me = this;

        return me.confirmBox.show("Delete contact " + contact.name + " ?")
            .then(function () {

                return me.contactService.removeById(contact.id)
                    .then(function () {
                    }).catch(function (err) {
                        alert("Failed to delete contact: " + contact.name);
                    });

            }).catch(function () {
            });
    }

    angular.module("MyApp").controller("HomeCtrl", HomeCtrl);
})();
