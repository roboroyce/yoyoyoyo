const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Game variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;
let gravity = 1.5;

let score = 0;

// On key down
document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw images
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pipes
    for (let i = 0; i < pipe.length; i++) {
        constant = 100 + gap; // fixed pipe height + gap
        context.fillStyle = "#228B22"; // green
        context.fillRect(pipe[i].x, pipe[i].y, 50, 100); // upper pipe
        context.fillRect(pipe[i].x, pipe[i].y + constant, 50, canvas.height); // lower pipe

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * 100) - 100
            });
        }

        // Detect collision
        if (bX + 25 >= pipe[i].x && bX <= pipe[i].x + 50 &&
            (bY <= pipe[i].y + 100 || bY + 25 >= pipe[i].y + constant) || bY + 25 >= canvas.height) {
            location.reload(); // Reload the page
        }

        if (pipe[i].x == 5) {
            score++;
        }
    }

    // Draw bird
    context.fillStyle = "#FFD700"; // yellow
    context.fillRect(bX, bY, 25, 25);

    bY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
