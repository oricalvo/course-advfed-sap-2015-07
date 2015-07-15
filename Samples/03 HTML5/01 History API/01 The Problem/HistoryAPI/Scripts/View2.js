(function () {
    $(function () {
        var el = $(".view2");

        el.find("a").click(function () {
            App.switchView(".view1");

            return false;
        });
    });
})();
