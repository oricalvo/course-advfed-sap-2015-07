Module.define("DAL", ["Server"], function (Server) {
    var contacts = [
        { id: 1, name: "Ori" },
        { id: 2, name: "Roni" },
    ];

    function saveChanges () {
        console.log("DAL: Saving all contacts");

        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];

            Server.saveContact(contact);
        }
    }

    return {
        saveChanges: saveChanges,
    };
});
