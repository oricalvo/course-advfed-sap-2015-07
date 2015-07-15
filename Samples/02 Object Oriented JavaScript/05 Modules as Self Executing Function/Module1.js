var Module1 = {
};

(function () {
    var lastModified = null;

    Module1.commit = function () {
        if (lastModified != null) {
            console.log("Module 1: Already modified");
            return;
        }

        console.log("Module 1");

        lastModified = new Date();
    }
})();
