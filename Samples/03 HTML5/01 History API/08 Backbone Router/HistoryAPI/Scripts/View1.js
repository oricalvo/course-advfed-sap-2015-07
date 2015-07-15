(function () {
    $(function () {
        var el = $(".view1");

        el.find("a.view2").click(function () {
            App.navigate("view2");

            return false;
        });

        el.find("a.second").click(function () {
            App.navigate("second");

            return false;
        });
    });
})();
