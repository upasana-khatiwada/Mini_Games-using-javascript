const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

class Box {
    constructor() {
        this.position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        };
        this.size = {
            width: 25,
            height: 25,
        };
        this.velocity = {
            x: Math.random() * (1 - -1) + -1,
            y: 0,
        }

    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        c.fill();
    }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }


    // otherBoxes: This is an array of other boxes with which you want to check for collisions.
    //ind: This is the index of the current box within the otherBoxes array. 
    //It is used to exclude self-collision checks.
    checkCollision(otherBoxes, ind) {

        //The forEach loop iterates over each element (box) in the otherBoxes array.
        //Inside the loop, it checks if the ind (index of the current box) is equal to the index of the current element being checked. 
        //If they are equal, it means it's the same box, so it returns and skips the rest of the code within the loop to prevent self-collision detection
        otherBoxes.forEach((element, index) => {
            if (ind === index) return;// Skip self-comparison

            // Check for collisions between 'this' (current box) and 'element' (other box)
            if (this.position.x + this.size.width >= element.position.x &&
                this.position.x <= element.position.x + element.size.width &&
                this.position.y + this.size.height >= element.position.y &&
                this.position.y <= element.position.y + element.size.height) {
                this.color = "red";
                element.color = "red";
            } else {
                this.color = "blue";
            }


        })

    }
    update() {
        this.draw();
        this.move();

    }
}

let boxArr = [];
for (let i = 0; i < 10; i++) {
    boxArr.push(new Box());
}


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    boxArr.forEach((item, index) => {
        item.update();
        item.checkCollision(boxArr, index);
    });
    requestAnimationFrame(animate);
}
animate();





