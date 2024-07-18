const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
let mazeWidth;
let mazeHeight;
const cellSize = 25;

let maze;
let player;
let exit;

function generateMaze(width, height) {
    const maze = Array(height).fill().map(() => Array(width).fill(0));
    const directions = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function carve(x, y) {
        maze[y][x] = 1;
        shuffle(directions);
        for (const { dx, dy } of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 0) {
                maze[ny - dy][nx - dx] = 1;
                carve(nx, ny);
            }
        }
    }

    carve(0, 0);
    return maze;
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? 'white' : 'black';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(exit.x * cellSize, exit.y * cellSize, cellSize, cellSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function getRandomExitPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * mazeWidth);
        y = Math.floor(Math.random() * mazeHeight);
    } while (maze[y][x] === 0 || (x === 0 && y === 0));
    return { x, y };
}

function startGame(difficulty) {
    switch (difficulty) {
        case 'easy':
            mazeWidth = 10;
            mazeHeight = 10;
            break;
        case 'medium':
            mazeWidth = 20;
            mazeHeight = 20;
            break;
        case 'hard':
            mazeWidth = 30;
            mazeHeight = 30;
            break;
    }

    canvas.width = mazeWidth * cellSize;
    canvas.height = mazeHeight * cellSize;

    maze = generateMaze(mazeWidth, mazeHeight);
    player = { x: 0, y: 0 };
    exit = getRandomExitPosition();

    drawMaze();
}

document.addEventListener('keydown', (e) => {
    let { x, y } = player;
    if (e.key === 'ArrowUp') y--;
    if (e.key === 'ArrowDown') y++;
    if (e.key === 'ArrowLeft') x--;
    if (e.key === 'ArrowRight') x++;
    if (x >= 0 && x < mazeWidth && y >= 0 && y < mazeHeight && maze[y][x] === 1) {
        player = { x, y };
        if (player.x === exit.x && player.y === exit.y) {
            alert("Congratulations! You reached the exit!");
        }
    }
    drawMaze();
});
