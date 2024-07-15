const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "https://i.imgur.com/c8gA3MD.png";
bg.src = "https://i.imgur.com/o8dq4Jf.png";
fg.src = "https://i.imgur.com/xOLsSOc.png";
pipeNorth.src = "https://i.imgur.com/q19upJm.png";
pipeSouth.src = "https://i.imgur.com/TjeEd4T.png";

// Variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;
let gravity = 1.5;

let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();

fly.src = "https://www.soundjay.com/button/beep-07.wav";
scor.src = "https://www.soundjay.com/button/beep-05.wav";

// On key down
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw images
function draw() {
    context.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detect collision
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= canvas.height - fg.height) {
            location.reload(); // Reload the page
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, bX, bY);

    bY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
