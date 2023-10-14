class Enemy {
    constructor() {
        this.position = {
            x: Math.random() * canvas.width - 40,
            y: -80,
        };
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.isCrossedBorder = false;
        this.size = Math.random() * (80 - 30) + 30//which goes max to 80 and min to 30
        this.isDead = false;
        // this.image = new Image();
        // this.image.src = "./enemy-1.png";
        const images = ["./enemy-1.png", "./enemy-2.png"];
        this.image = new Image();
        this.image.src = images[Math.floor(Math.random() * 2)];

    }
    draw() {
        c.beginPath();
        c.fillStyle = "red";
        if (this.isDead) this.image.src = "./explosion.png";
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }
    move() {
        this.position.y += this.velocity.y;
    }
    checkBottomCollision() {
        if (this.position.y + this.size >= canvas.height) {
          this.isCrossedBorder = true;
        }
      }
      dead(){
        this.velocity.y = 0;
        this.isDead = true;
        setTimeout(()=>{
            this.velocity.y = 0;
      this.position.y = -200;
      this.position.x = -200;
      this.isDead = true;
      score++;
        },100);
      }
    collisionWithBullet(bullets) {
        for (let i = 0; i < bullets.length; i++) {
            if (
                this.position.x + this.size >= bullets[i].position.x &&
                this.position.x <= bullets[i].position.x + bullets[i].size &&
                this.position.y + this.size >= bullets[i].position.y &&
                this.position.y <= bullets[i].position.y + bullets[i].size
            ) {
                bullets[i].isDestroyed = true;
                this.dead();
            }
        }
    }

    collision(player) {
        if (this.position.x + this.size >= player.position.x &&
            this.position.x <= player.position.x + player.size &&
            this.position.y + this.size >= player.position.y &&
            this.position.y <= player.position.y + player.size
        ) {
            player.velocity.y = 0;
            player.velocity.x =0;
            console.log("collide");
            player.isDead = true;
        }
    }
    update(playerDead) {
        this.draw();
        if (!playerDead) {
            this.move();
            this.checkBottomCollision();
          }
    }
}