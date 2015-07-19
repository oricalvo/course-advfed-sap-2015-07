QUnit.test("Validate that HomeCtrl.remove removes the contact from the list", function (assert) {
    var done = assert.async();

    injector = angular.injector(['ng', 'MyApp', 'ngMock']);
    var $q = injector.get("$q");
    var $rootScope = injector.get("$rootScope");

    var confirmBoxMock = {
        show: function (message) {
            return $q.when(true);
        }
    };

    var contacts = [
        { id: 1, name: "Ori" },
        { id: 2, name: "Roni" },
    ];

    var contactServiceMock = {
        getAll: function () {
            return $q.when(contacts);
        },
        removeById: sinon.spy(function () {
            return $q.when(true);
        })
    };

    var $controller = injector.get("$controller");
    var ctrl = $controller("HomeCtrl", {
        contactService: contactServiceMock,
        confirmBox: confirmBoxMock,
        $q: $q,
    });

    ctrl.onInit.then(function () {
        var indexToDelete = 0;
        var contact = ctrl.contacts[indexToDelete];
        ctrl.remove(contact, indexToDelete).then(function () {
            assert.ok(contactServiceMock.removeById.calledWith(1));

            done();
        });
    });

    //
    //  Angular 
    //
    $rootScope.$apply();
});
