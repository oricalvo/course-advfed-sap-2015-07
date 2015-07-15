var DAL = {
};

(function () {
    var contacts = [
        { id: 1, name: "Ori" },
        { id: 2, name: "Roni" },
    ];

    DAL.saveChanges = function () {
        console.log("DAL: Saving all contacts");

        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];

            Server.saveContact(contact);
        }
    }
})();
