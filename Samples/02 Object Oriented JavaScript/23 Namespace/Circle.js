var PaintApp = PaintApp || {};

PaintApp.Circle = (function () {
    var Shape = PaintApp.Shape;

    function Circle(x, y, radius) {
        Shape.call(this, x, y);

        this.radius = radius;
    }

    inherit(Circle, Shape);

    Circle.prototype.dump = function () {
        console.log(this.x + ", " + this.y + ", " + this.radius);
    }

    return Circle;
})();
