const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

//loading image
const spaceShip = new Image();
spaceShip.src = "./images/ship.png"

//loading sound
const backgroundMusic = new Audio();
const gunSound = new Audio();
backgroundMusic.src = "./sounds/bgmusic.wav";

function play() {
    backgroundMusic.play();
    backgroundMusic.loop = true;
}

canvas.addEventListener("click", () => {
    gunSound.src = "./sounds/shoot.mp3";
    gunSound.play();
    gunSound.volume = 0.2;
    console.log("Shoot!");
  });


let y = 0;
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(spaceShip, 0, y, 50, 50);
    y++;
    requestAnimationFrame(animate);
}
animate();