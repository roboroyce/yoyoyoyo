document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 4;
    let squares = [];
    let score = 0;

    // Create a playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.innerHTML = '';
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // Generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML === '') {
            squares[randomNumber].innerHTML = Math.random() > 0.5 ? '2' : '4'; // '2' or '4' randomly
            squares[randomNumber].className = `grid-cell num${squares[randomNumber].innerHTML}`;
            checkForGameOver();
        } else generate();
    }

    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0] === '' ? '' : newRow[0];
                squares[i + 1].innerHTML = newRow[1] === '' ? '' : newRow[1];
                squares[i + 2].innerHTML = newRow[2] === '' ? '' : newRow[2];
                squares[i + 3].innerHTML = newRow[3] === '' ? '' : newRow[3];
            }
        }
        applyStyling();
        generate();
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0] === '' ? '' : newRow[0];
                squares[i + 1].innerHTML = newRow[1] === '' ? '' : newRow[1];
                squares[i + 2].innerHTML = newRow[2] === '' ? '' : newRow[2];
                squares[i + 3].innerHTML = newRow[3] === '' ? '' : newRow[3];
            }
        }
        applyStyling();
        generate();
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0] === '' ? '' : newColumn[0];
            squares[i + width].innerHTML = newColumn[1] === '' ? '' : newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2] === '' ? '' : newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3] === '' ? '' : newColumn[3];
        }
        applyStyling();
        generate();
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0] === '' ? '' : newColumn[0];
            squares[i + width].innerHTML = newColumn[1] === '' ? '' : newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2] === '' ? '' : newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3] === '' ? '' : newColumn[3];
        }
        applyStyling();
        generate();
    }

    // Apply styling after each move
    function applyStyling() {
        squares.forEach(square => {
            square.className = 'grid-cell'; // reset class name
            if (square.innerHTML !== '') {
                square.className = `grid-cell num${square.innerHTML}`;
            }
        });
    }

    // Combine rows
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        applyStyling();
        checkForWin();
    }

    // Combine columns
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        applyStyling();
        checkForWin();
    }

    // Assign keycodes for movements
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    // Key right
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    // Key left
    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    // Key down
    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    // Key up
    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    // Check for win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '2048') {
                alert('You win!');
            }
        }
    }

    // Check for game over
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML === '') {
                zeros++;
            }
        }
        if (zeros === 0) {
            alert('Game Over!');
        }
    }

});
