var DAL = (function () {
    var db = null;

    function openDb(autoId) {
        console.log("Openning DB");

        var request = indexedDB.open("MyDB");

        request.onsuccess = function (e) {
            console.log("    open db success");

            db = e.target.result;

            console.log("        current version: " + db.version);
        }

        request.onerror = function (e) {
            console.log("    open db error: " + e.target.error.message);
        }

        request.onupgradeneeded = function (e) {
            console.log("    DB Upgrade is needed");
            console.log("        old version: " + e.oldVersion);
            console.log("        new version: " + e.newVersion);

            var db = e.target.result;

            if (e.newVersion == 1) {
                console.log("        Creating object store: contacts");

                if (autoId) {
                    var objectStore = db.createObjectStore("contacts", { autoIncrement: false });
                }
                else {
                    var objectStore = db.createObjectStore("contacts", { keyPath: "id" });
                }

                console.log("        Creating index: name");
                objectStore.createIndex("name", "name", { unique: false });

                console.log("        Creating index: email");
                objectStore.createIndex("email", "email", { unique: true });
            }
        }
    }

    function closeDb() {
        console.log("Closing DB");

        if (db == null) {
            console.log("    db was not opened");
            return;
        }

        if (db != null) {
            db.close();
            console.log("    Done");
        }
    }

    function deleteDb () {
        console.log("Deleting DB");

        var request = indexedDB.deleteDatabase("MyDB");

        //
        //  delete request is not completed until all opened connections are closed
        //
        request.onsuccess = function () {
            console.log("    delete DB onsuccess");
        }

        request.onerror = function () {
            console.log("    delete DB onerror");
        }
    }

    function addRecord(contacts, id, name, success) {
        console.log("    Adding " + name);

        var deferred = Q.defer();

        var request = contacts.add({
            id: id,
            name: name,
            email: name + "@gmail.com",
        });

        request.onsuccess = function () {
            console.log("        add success " + name);

            if (success) {
                success();
            }

            deferred.resolve();
        };

        request.onerror = function (e) {
            console.error("        add error " + name + ": " + e.target.error.message);

            deferred.reject(e);
        };

        return deferred.promise;
    }

    function openTran(mode) {
        if (db == null) {
            throw new Error("db is not opened");
        }

        console.log("    tran");

        var tran = db.transaction(["contacts"], mode);

        tran.oncomplete = function () {
            console.log("    tran complete");
        }

        tran.onerror = function (e) {
            console.error("    tran error: " + e.target.error.message);
        }

        tran.onabort = function () {
            console.error("    tran abort");
        }

        return tran;
    }

    function addData () {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        addRecord(contacts, 1001, "Ori");
        addRecord(contacts, 1002, "Roni");
    }

    function addDataAndWait() {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        addRecord(contacts, 1001, "Ori");
        addRecord(contacts, 1002, "Roni");

        suspend(5000);
    }

    function suspend(timeSpan) {
        var before = new Date();

        while (true) {
            var now = new Date();

            if (now - before > timeSpan) {
                break;
            }
        }
    }

    function addSlidingData() {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        //
        //  Can't do that, why ?
        //
        //addRecord(contacts, 1, "Ori")
        //    .then(function () {
        //        addRecord(contacts, 2, "Roni");
        //    })
        //    .fail(function (e) {
        //        console.error("    error: " + e);
        //    });

        addRecord(contacts, 1001, "Ori", function () {
            addRecord(contacts, 1002, "Roni");
        });
    }

    function addDataAndAbort() {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        addRecord(contacts, 1001, "Ori");

        addRecord(contacts, 1002, "Roni");

        addRecord(contacts, 1003, "Udi", function () {
            console.log("            Aborting tran");
            tran.abort();
        });
    }

    function addDataAndThrowOnSuccess() {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        addRecord(contacts, 1001, "Ori");

        addRecord(contacts, 1002, "Roni");

        addRecord(contacts, 1003, "Udi", function () {
            console.log("            Throwing error");
            throw new Error("Internal error");
        });
    }

    function addDataAndThrow() {
        console.log("Adding data");

        var tran = openTran("readwrite");

        var contacts = tran.objectStore("contacts");

        addRecord(contacts, 1001, "Ori");

        addRecord(contacts, 1002, "Roni");

        addRecord(contacts, 1003, "Udi");

        throw new Error("Internal error");
    }

    function getAllIds() {
        if (db == null) {
            console.log("    db was not opened");
            return;
        }

        var deferred = Q.defer();
        var ids = [];

        var tran = db.transaction(["contacts"]);

        tran.onerror = function () {
            console.log("        tran error");
        }

        var contacts = tran.objectStore("contacts");

        var request = contacts.openCursor();

        request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                ids.push(cursor.key);

                cursor.continue();
            }
            else {
                deferred.resolve(ids);
            }
        }

        request.onerror = function (e) {
            console.log("        openCursor error");

            deferred.reject(e);
        }

        return deferred.promise;
    }

    function deleteById(contacts, id) {
        console.log("    Deleting " + id);

        var request = contacts.delete(id);

        request.onsuccess = function () {
            console.log("        delete success " + id);
        };

        request.onerror = function () {
            console.log("        delete error " + id);
        };
    }

    function deleteAll() {
        console.log("Deleting all records");

        getAllIds()
            .then(function (ids) {
                console.log("    IDs: " + ids.length);

                var tran = db.transaction(["contacts"], "readwrite");

                tran.oncomplete = function () {
                }

                tran.onerror = function (e) {
                    console.log("    Error: " + e);
                }

                var contacts = tran.objectStore("contacts");

                for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];

                    deleteById(contacts, id);
                }
            })
            .fail(function (e) {
                console.log("    Error: " + e);
            });
    }

    function readSingle () {
        console.log("Reading single data");

        var tran = openTran("readonly");

        var contacts = tran.objectStore("contacts");

        var key = 1001;
        var request = contacts.get(key);

        request.onsuccess = function (e) {
            console.log("        get success");

            var item = e.target.result;
            if (item) {
                console.log("            " + item.name + ", " + item.email);
            }
            else {
                console.log("            Item with key " + key + " was not found");
            }
        }

        request.onerror = function () {
            console.error("        get error");
        }
    }

    function readAll () {
        console.log("Reading all data");

        if (db == null) {
            console.log("    db was not opened");
            return;
        }

        console.log("    Creating read transaction");
        var tran = db.transaction(["contacts"]);

        tran.oncomplete = function () {
            console.log("        tran completed");
        }

        tran.onerror = function () {
            console.log("        tran error");
        }

        var contacts = tran.objectStore("contacts");

        console.log("    Openning cursor");
        var request = contacts.openCursor();
        request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                var key = cursor.key;
                var value = cursor.value;
                console.log("            " + key + ": " + value.id + ", " + value.name + ", " + value.email);

                cursor.continue();
            }
            else {
                console.log("            No more entries");
            }
        }

        request.onerror = function () {
            console.log("        error");
        }
    }

    function readRange () {
        console.log("Reading records using an index");

        if (db == null) {
            console.log("    db was not opened");
            return;
        }

        console.log("    Creating read transaction");
        var tran = db.transaction(["contacts"]);

        tran.oncomplete = function () {
            console.log("        tran completed");
        }

        tran.onerror = function () {
            console.log("        tran error");
        }

        var contacts = tran.objectStore("contacts");

        var index = contacts.index("name");

        console.log("    Look for all records with name between Ori and Roni in reverse order");

        //
        //  true means exclude
        //  fales means include
        //  default is false
        //
        var range = IDBKeyRange.bound("Ori", "Roni", false, false);
        //var range = IDBKeyRange.lowerBound("Ori", false);
        //var range = IDBKeyRange.upperBound("Roni", true);

        var request = index.openCursor(range, "prev");
        request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                var key = cursor.key;
                var value = cursor.value;
                console.log("        " + key + ": " + value.name + ", " + value.email);

                cursor.continue();
            }
            else {
                console.log("        No more entries");
            }
        }

        request.onerror = function () {
            console.log("        error");
        }
    }

    return {
        openDb: openDb,
        closeDb: closeDb,
        deleteDb: deleteDb,
        addData: addData,
        addDataAndAbort: addDataAndAbort,
        addSlidingData: addSlidingData,
        addDataAndWait: addDataAndWait,
        addDataAndThrow: addDataAndThrow,
        addDataAndThrowOnSuccess: addDataAndThrowOnSuccess,
        deleteAll: deleteAll,
        readSingle: readSingle,
        readAll: readAll,
        readRange: readRange,
    };
})();
