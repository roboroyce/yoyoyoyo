const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
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
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

function handleInput(event) {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0; dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0; dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1; dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
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
        if (snake[0].x < 0 || snake[0].x >= canvas.width / gridSize ||
            snake[0].y < 0 || snake[0].y >= canvas.height / gridSize) {
            alert('Game Over! Score: ' + score);
            snake = [{ x: 10, y: 10 }];
            score = 0;
        }

        // Check for self-collision (omit head)
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                alert('Game Over! Score: ' + score);
                snake = [{ x: 10, y: 10 }];
                score = 0;
            }
        }
    }, 100);
}

main();
