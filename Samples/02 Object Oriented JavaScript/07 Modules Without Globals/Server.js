Module.define("Server", function () {
    function saveContact (contact) {
        //
        //  Do AJAX
        //

        console.log("Server: Saving a contact width id: " + contact.id);
    }

    return {
        saveContact: saveContact,
    };
});
