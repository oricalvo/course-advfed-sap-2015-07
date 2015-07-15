var storage = {
    setItem: function (name, value) {
        this[name] = value;
    },

    getItem: function (name) {
        return this[name];
    }
};

//var storage = sessionStorage;
//var storage = localStorage;

var contacts = null;

function IndexView() {
    var me = this;

    me.name = "";

    me.contacts = ko.observableArray(contacts);

    me.add = function () {
        if (!me.name) {
            return;
        }

        var contact = new Contact(me.name);
        me.contacts.push(contact);
    }
}

try {
    contacts = JSON.parse(storage.getItem("contacts"));
    if (contacts == null) {
        throw "No contacts";
    }
}
catch (err) {
    contacts = [
        new Contact("Ori"),
        new Contact("Roni"),
    ];
}

$(window).bind("unload", function () {
    storage.setItem("contacts", JSON.stringify(contacts));
});

$(function () {
    ko.applyBindings(new IndexView());
});
