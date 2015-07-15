var lastModified = null;

function commit() {
    if (lastModified != null) {
        console.log("Module 1: Already modified");
        return;
    }

    console.log("Module 1");

    lastModified = new Date();
}
