const gameBoard = document.querySelector('.game-board');
const allCells = document.querySelectorAll('[data-cell]');

const crossPlayer = 'X';
const circlePlayer = 'O';
let currentPlayer = crossPlayer;

const winningCombinations = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// let currentBoard = [];

// Event: cell clicked on game board
gameBoard.addEventListener('click', (e) => {
  clickAction(e.target);
});

// Action when cell is clicked
function clickAction(target) {
  if (
    target.classList.contains('circle') ||
    target.classList.contains('cross')
  ) {
    return;
  } else {
    updateGameBoard(target);
    checkWinner();
    changePlayer();
  }
}

// Update game board
function updateGameBoard(target) {
  // Update HTML & UI
  target.classList.add(`${currentPlayer}`);
  target.textContent = `${currentPlayer}`;

  // Update current board array
  for (let i = 0; i < allCells.length; i++) {
    if (allCells[i].textContent === 'X') {
      currentBoard[i] = 'X';
    } else if (allCells[i].textContent === 'O') {
      currentBoard[i] = 'O';
    } else {
      currentBoard[i] = i;
    }
  }
}

// Check if there is a winner
function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      (currentBoard[winningCombinations[i][0]] === 'X' &&
        currentBoard[winningCombinations[i][1]] === 'X' &&
        currentBoard[winningCombinations[i][2]] === 'X') ||
      (currentBoard[winningCombinations[i][0]] === 'O' &&
        currentBoard[winningCombinations[i][1]] === 'O' &&
        currentBoard[winningCombinations[i][2]] === 'O')
    ) {
      console.log(`The winner is ${currentPlayer}, congratulations!`);
    }
  }
}

// Change the current player
function changePlayer() {
  return currentPlayer === crossPlayer
    ? (currentPlayer = circlePlayer)
    : (currentPlayer = crossPlayer);
}
