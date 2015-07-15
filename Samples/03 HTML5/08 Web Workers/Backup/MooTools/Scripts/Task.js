function log(message) {
    postMessage({
        type: "log",
        message: message
    });
}

log("document: " + typeof document);
log("window: " + typeof window);
log("navigator: " + typeof navigator);
log("XMLHttpRequest: " + typeof XMLHttpRequest);
log("JSON: " + typeof JSON);

function fibonacci(n) {
    if (n == 1) {
        return 1;
    }

    if (n == 2) {
        return 2;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

addEventListener("message", function (e) {
    var seed = e.data;

    var res = fibonacci(seed);

    postMessage({
        type: "res",
        result: res
    });
});
