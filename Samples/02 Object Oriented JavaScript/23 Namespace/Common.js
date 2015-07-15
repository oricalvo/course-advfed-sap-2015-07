function inherit(derived, base) {
    function F() {
    }

    F.prototype = base.prototype;

    derived.prototype = new F();
    derived.prototype.constructor = derived;
}
