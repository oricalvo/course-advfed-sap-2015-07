(function () {
    $(function () {
        var el = $(".view2");

        el.find("a").click(function () {
            App.navigate("view1");

            return false;
        });
    });
})();
