namespace("PaintApp", function (PaintApp) {
    var Shape = PaintApp.Shape;

    PaintApp.Circle = Circle = function(x, y, radius) {
        Shape.call(this, x, y);

        this.radius = radius;
    }

    inherit(Circle, Shape);

    Circle.prototype.dump = function () {
        console.log(this.x + ", " + this.y + ", " + this.radius);
    }
});
