const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.dataset.index;
        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 10);
                resetGame();
            } else if (board.every(cell => cell !== '')) {
                setTimeout(() => alert('It\'s a tie!'), 10);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

document.getElementById('resetButton').addEventListener('click', resetGame);

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}
