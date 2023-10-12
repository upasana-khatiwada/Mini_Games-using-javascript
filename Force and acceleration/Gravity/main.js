const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

// class Box{
// constructor(){
//     this.position={
//         x: 100,
//         y: 100, 
//     };
//     this.size={
//         width: 50,
//         height: 50,
//     };
//     this.velocity = {
//         x_velocity :1,
//         y_velocity :1,

//     };
//     this.acceleration = 0.2;
// }
//  draw(){
//     c.beginPath();
//     c.fillStyle = "red";
//     c.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);


//  }
//  move(){
//     this.velocity.y_velocity+=this.acceleration;
//     this.position.y += this.velocity.y_velocity;
//  }
//  checkCollision(){
//     if(this.position.y+this.size.height>canvas.height){
//         this.position.y =canvas.height- this.size.height;
//         this.velocity.y_velocity *= -0.8;
//     }
//  }

//  update(){
//     this.draw();
//     this.move();
//     this.checkCollision();
//  }
// }

// const box = new Box();

// function animate(){
//     c.clearRect(0,0,canvas.width,canvas.height);
//     box.update();
//     requestAnimationFrame(animate);
// }

// animate();


//for 10 boxes
class Box{
    constructor(){
        this.size={
            width:  50,
            height: 50,
        }
        this.position ={
            x: Math.random()*(canvas.width - 50),
            y: Math.random()*(canvas.height - 50),
        }
        this.velocity={
            x: 1,
            y: 1,
        }
        this.acceleration= 0.2;
        this.color = getRandomColor();
    }
    draw(){
       c.beginPath();
       c.fillStyle = this.color; ;
       c.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
    }
    move(){
        this.velocity.y+= this.acceleration;
        this.position.y += this.velocity.y;

    }
    checkCollision(){
        if(this.position.y+this.size.height>canvas.height){
            this.position.y = canvas.height- this.size.height;
            this.velocity.y *= -0.8;
        }

    }
    update(){
        this.draw();
        this.move();
        this.checkCollision();
    }
}
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const boxes = [];
for (let i = 0; i < 5; i++) {
    boxes.push(new Box());
}
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(box => {
        box.update();
    });
    requestAnimationFrame(animate);
}
animate();
