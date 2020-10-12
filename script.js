const gameBoard = document.querySelector('.game-board');
const allCells = document.querySelectorAll('[data-cell]');

const crossPlayer = 'X';
const circlePlayer = 'O';
let currentPlayer = crossPlayer;

let currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

// Event: cell clicked on game board
gameBoard.addEventListener('click', (e) => {
  clickAction(e.target);
});

// Action when cell is clicked
function clickAction(target) {
  if (
    target.classList.contains('O') ||
    target.classList.contains('X') ||
    target.classList.contains('game-board')
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
      showWinnerScreen();
    } 
  }
}

// Change the current player
function changePlayer() {
  return currentPlayer === crossPlayer
    ? (currentPlayer = circlePlayer)
    : (currentPlayer = crossPlayer);
}

// Display winner screen
function showWinnerScreen() {
  const div = document.createElement('div');
  const body = document.querySelector('body');
  const winnerScreen = body.insertBefore(div, gameBoard);
  winnerScreen.classList.add('winner-screen');
  winnerScreen.innerHTML = `
        "${currentPlayer}" is the winner!
        <button class="btn">Play a new game</button>
        `;
  // Event: click button, start new game
  button = document.querySelector('.btn');
  button.addEventListener('click', (e) => startNewGame());
}

// Start a new game
function startNewGame() {
  const div = document.querySelector('.winner-screen');
  div.remove();
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].classList.remove('X', 'O');
    allCells[i].textContent = '';
  }
  currentBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  currentPlayer = crossPlayer;
}
