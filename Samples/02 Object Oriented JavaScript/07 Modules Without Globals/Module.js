var Module = {
};

(function () {
    var modules = {};

    Module.define = function (name, dependencies, func) {
        if (func == undefined) {
            func = dependencies;
            modules = [];
        }

        modules[name] = func.apply(window, getModules(dependencies));
    }

    Module.require = function (dependencies, func) {
        func.apply(window, getModules(dependencies));
    }

    function getModules(names) {
        var res = [];

        for (var i = 0; i < names.length; i++) {
            var name = names[i];

            res.push(modules[name]);
        }

        return res;
    }
})();

