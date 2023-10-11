const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.style.background = "black";

class Breaker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.x_speed = 3;
        this.y_speed = 2;
    }

    draw() {
        c.beginPath();
        c.fillStyle = "white";
        c.rect(this.x, this.y, this.width, this.height);
        c.fill();
    }

    move() {
        this.x = this.x + this.x_speed;
        this.y = this.y + this.y_speed;
    }

    checkCollision() {

       // bounceBallOffPlayer(this,player);

    //    if(player){
    //     if(this.y+this.height>= player.y ){
    //         this.y_speed = -1;
    //        }
    //    }
    if (
        //ballx+ballLength>=playerx//left touch
        this.x + this.width >= player.x &&
        //ballx<=playerx +playerLength//right touch
        this.x <= player.x + player.playerWidth &&
        this.y + this.height >= player.y
    ) {
        this.y_speed = -Math.abs(this.y_speed); // Bounce back upwards
    }

        // if ball touches left or right of canvas
        if (this.x + this.width > canvas.width) {
            this.x_speed = -1;
        } else if (this.x< 0) {
            this.x_speed = 1;
        }

        if (this.y +this.height>=canvas.height) {
            this.y = canvas.height - this.height; 
            this.y_speed = 0;
            c.font = "20px sans-serif";
        c.fillText("Game Over: Press 'Space' to Restart", 80, 400);
       
        }else if (this.y < 0) {
            this.y_speed = 1;
        }


    }

    update() {
        this.draw();
        this.checkCollision();
        this.move();
    }
}

//player

class Player {
    constructor() {
        this.playerWidth = 80;
        this.playerHeight = 10;
        this.x = canvas.width / 2 - this.playerWidth / 2;
        this.y = canvas.height - this.playerHeight - 5;
        this.playerVelocityX = 15;
    }

    draw() {
        c.beginPath();
        // player
        c.fillStyle = "lightgreen";
        c.rect(this.x, this.y, this.playerWidth, this.playerHeight);
        c.fill();
    }


    update() {
        this.draw();
        document.addEventListener("keydown", movePlayer);
        

    }
}
//blocks


class Blocks{

    constructor(){
        this.blockArray = [];
        this.blockWidth = 50;
        this.blockHeight = 10;
        this.blockColumns = 8; 
        this.blockRows = 3; //add more as game goes on
        this.blockCount = 0;
        
        //starting block corners top left 
        this.blockX = 15;
        this.blockY = 45;

        this.createBlocks();
    }
    createBlocks() {
       // c.fillStyle = "skyblue";
      //  this.blockArray = []; //clear blockArray
        for (let c = 0; c < this.blockColumns; c++) {
            for (let r = 0; r < this.blockRows; r++) {
                let block = {
                    x : this.blockX + c*(this.blockWidth + 10), //c*10 space 10 pixels apart columns
                    y : this.blockY + r*(this.blockHeight + 10), //r*10 space 10 pixels apart rows
                    width : this.blockWidth,
                    height : this.blockHeight,
                    status: 1,
                }
                this.blockArray.push(block);
            }
        }
        this.blockCount = this.blockArray.length;
    }

    draw() {
        c.fillStyle = "skyblue";
        for (let i = 0; i < this.blockArray.length; i++) {
            let block = this.blockArray[i];
            if (block.status === 1) {
                c.beginPath();
                c.rect(block.x, block.y, block.width, block.height);
                c.fill();
            }
        }
    }

    collisionDetect(breaker) {
        for (let i = 0; i < this.blockArray.length; i++) {
            let block = this.blockArray[i];
            if (block.status === 1) {
                if (
                    breaker.x + breaker.width >= block.x &&
                    breaker.x <= block.x + block.width &&
                    breaker.y + breaker.height >= block.y &&
                    breaker.y <= block.y + block.height
                ) {
                    breaker.y_speed = -breaker.y_speed; // Bounce back upwards
                    block.status = 0; // Mark the block as broken
                    this.blockCount -= 1;
                    console.log("beaker touch the block");

                
                
                }
            }
        }
        
    }
    

    update(){
        this.draw();
        this.collisionDetect(breaker);
       // this.checkCollision(breaker);
    }
}
 

const breaker = new Breaker(100, 150);
const player = new Player();
 const blocks = new Blocks();


function movePlayer(e) {
    console.log("Left arrow key pressed");
    if (e.code == "ArrowLeft") {
        // player.x -= player.velocityX;
        let nextplayerX = player.x - player.playerVelocityX;
        if (!(nextplayerX < 0 || nextplayerX + player.playerWidth > canvas.width)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.playerVelocityX;
        if (!(nextplayerX < 0 || nextplayerX + player.playerWidth > canvas.width)) {
            player.x = nextplayerX;
        }
        // player.x += player.velocityX;    
    }
}

function animate() {
    //update logic here
    c.clearRect(0, 0, canvas.width, canvas.height);
    blocks.update();


    player.update();

    breaker.update(player);

    requestAnimationFrame(animate);

}

animate();
