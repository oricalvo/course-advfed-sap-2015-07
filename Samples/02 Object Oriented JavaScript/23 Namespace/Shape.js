var PaintApp = PaintApp || {};

PaintApp.Shape = (function () {
    function Shape(x, y) {
        this.x = x;
        this.y = y;
    }

    Shape.prototype.move = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    Shape.prototype.dump = function () {
        console.log(this.x + ", " + this.y);
    }

    return Shape;
})();

