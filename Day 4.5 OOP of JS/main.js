const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");


class Circle {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;

        this.radius = radius || 40;
        this.color = color || "red";
        this.x_speed = 1;
        this.y_speed = 1;

    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 360);
        c.fill();
    }

    move() {
        this.x = this.x + this.x_speed;
        this.y = this.y + this.y_speed;
    }

    checkCollision() {
        if (this.x + this.radius > canvas.width) {
            // check collision on right side
            this.x_speed = -1; // return to left
        } else if (this.x -this.radius< 0) {
            // check collision on left side
            this.x_speed = 1; // return to right
        }

        if (this.y + this.radius > canvas.height) {
            // check collision on right side
            this.y_speed = -1; // return to left
          } else if (this.y -this.radius< 0) {
            // check collision on right side
            this.y_speed = 1; // return to right
          }

    }

    update() {
        this.draw();
        this.checkCollision();
        this.move();
    }
}

const circle = new Circle(150, 250, "blue", 50);
const circle2 = new Circle(40, 40, "black");
const circle3 = new Circle(200, 140, "plum");
function animate() {
    // context.arc(x, y, 40, 0, 360);
    c.clearRect(0, 0, canvas.width, canvas.height);

    circle2.update();
    circle.update();
    circle3.update();

    requestAnimationFrame(animate);
}

animate();