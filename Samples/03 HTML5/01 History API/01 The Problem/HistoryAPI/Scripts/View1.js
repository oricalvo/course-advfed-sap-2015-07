(function () {
    $(function () {
        var el = $(".view1");

        el.find("a").click(function () {
            App.switchView(".view2");

            return false;
        });
    });
})();
