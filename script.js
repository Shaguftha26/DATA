const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameOver = false;

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

// Function to check if there's a winner
function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightCells(combo);
            isGameOver = true;
            return true;
        }
    }
    if (!board.includes(null)) {
        alert("It's a tie!");
        isGameOver = true;
        return false;
    }
    return false;
}

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || isGameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to highlight winning cells
function highlightCells(combo) {
    combo.forEach(index => {
        cells[index].style.backgroundColor = '#90ee90';
    });
}

// Function to restart the game
function restartGame() {
    board.fill(null);
    isGameOver = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
