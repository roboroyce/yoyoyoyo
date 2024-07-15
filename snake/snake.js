const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;

function drawSnake() {
    ctx.fillStyle = '#333';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Ensure the food doesn't spawn on the snake
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            spawnFood();
        }
    });
}

function handleInput(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0; dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0; dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -1; dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = 1; dy = 0;
            }
            break;
    }
}

function main() {
    document.addEventListener('keydown', handleInput);

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();

        // Collision detection (simplified)
        if (snake[0].x < 0 || snake[0].x >= tileCount ||
            snake[0].y < 0 || snake[0].y >= tileCount) {
            alert('Game Over! Score: ' + score);
            resetGame();
        }

        // Check for self-collision (omit head)
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                alert('Game Over! Score: ' + score);
                resetGame();
            }
        }
    }, 100);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    spawnFood();
}

main();
