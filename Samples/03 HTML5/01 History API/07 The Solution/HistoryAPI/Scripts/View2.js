(function () {
    $(function () {
        var el = $(".view2");

        el.find("a").click(function () {
            //App.switchView(".view1");

            App.navigate("view1", ".view1");

            return false;
        });
    });
})();
