var lastModified = null;

function modify () {
    if (lastModified != null) {
        console.log("Module 2: Already modified");
        return;
    }

    console.log("Module 2");

    lastModified = new Date();
}
