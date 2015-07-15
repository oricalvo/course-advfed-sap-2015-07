function inherit(derived, base) {
    function F() {
    }

    F.prototype = base.prototype;

    derived.prototype = new F();
    derived.prototype.constructor = derived;
}

var namespaces = {};

function namespace(name, func) {
    var ns = namespaces[name];
    if (!ns) {
        ns = namespaces[name] = {};
        window[name] = ns;
    }

    func(ns);
}
