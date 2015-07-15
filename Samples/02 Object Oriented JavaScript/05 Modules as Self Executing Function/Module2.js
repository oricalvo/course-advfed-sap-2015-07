var Module2 = {
};

(function () {
    var lastModified = null;

    Module2.modify = function () {
        if (lastModified != null) {
            console.log("Module 2: Already modified");
            return;
        }

        console.log("Module 2");

        lastModified = new Date();
    }
})();
