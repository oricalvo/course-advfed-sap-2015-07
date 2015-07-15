var storage = localStorage;
var appCache = window.applicationCache;

function IndexView(el) {
    var me = this;

    me.el = el;

    me.name = "";
    me.contacts = ko.observableArray([]);
    me.checkingUpdate = false;

    me.add = function () {
        if (!me.name) {
            return;
        }

        var contact = new Contact(me.name);
        me.contacts.push(contact);
    }

    me.checkUpdate = function () {
        me.checkingUpdate = true;

        appCache.update();
    }

    me.onAppCacheEvent = function (status) {
        var me = this;

        if (status == "updateready") {
            alert("New version exist");
        }
        else if (status == "noupdate") {
            if (me.checkingUpdate) {
                console.log("No update exist");
            }
        }
        else if (status == "error") {
            console.log("Error while checking for update");
        }

        me.checkingUpdate = false;
    }

    me.loadContacts = function () {
        var me = this;

        var contacts = JSON.parse(storage.getItem("contacts"));
        if (contacts == null) {
            contacts = [
                new Contact("Ori"),
                new Contact("Roni"),
            ];
        }

        me.contacts(contacts);
    }

    me.saveContacts = function () {
        var me = this;

        storage.setItem("contacts", JSON.stringify(me.contacts()));
    }

    appCache.addEventListener("updateready", function () {
        me.onAppCacheEvent("updateready");
    });
    appCache.addEventListener("noupdate", function () {
        me.onAppCacheEvent("noupdate");
    });
    appCache.addEventListener("error", function () {
        me.onAppCacheEvent("error");
    });

    $(window).bind("unload", function () {
        me.saveContacts();
    });

    ko.applyBindings(me, me.el.get(0));

    me.loadContacts();
}

$(function () {
    new IndexView($(".contacts-view"));
});
