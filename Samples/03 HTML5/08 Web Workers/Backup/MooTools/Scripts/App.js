function fibonacci(n) {
    if (n == 1) {
        return 1;
    }

    if (n == 2) {
        return 2;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

$(function () {
    var input = $("input");
    var message = $("div");

    $("button").click(function () {
        var n = parseInt(input.val());

        var res = fibonacci(n);
        message.text("Result is: " + res);

        //var worker = new Worker("/Scripts/Task.js");
        //worker.addEventListener("message", function (e) {
        //    var cmd = e.data;

        //    if (cmd.type == "log") {
        //        console.log(cmd.message);
        //    }
        //    else if (cmd.type == "res") {
        //        message.text("Result is: " + cmd.result);
        //    }
        //});
        //worker.postMessage(n);
    });
});
