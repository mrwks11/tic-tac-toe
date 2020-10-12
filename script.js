// Global variables
const gameBoard = document.getElementById('game-board');
const allCells = document.querySelectorAll('[data-cell]');
const crossPlayer = 'X';
const circlePlayer = 'O';
currentPlayer = crossPlayer;
gameRound = 0;
let currentBoard = ['', '', '', '', '', '', '', ''];

// Player names
const playerOneName = document.getElementById('playerOne');
const playerTwoName = document.getElementById('playerTwo');

// Player Scores
const playerOneScore = document.getElementById('playerOneScore');
const playerTwoScore = document.getElementById('playerTwoScore');

// Game buttons
const startGame = document.getElementById('startNewGame');
startGame.addEventListener('click', (e) => {
  startNewGame();
})

// Start a new game
function startNewGame() {
  const div = document.querySelector('.winner-screen');
  div.remove(); 
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].classList.remove('X', 'O');
    allCells[i].textContent = '';
  }
  currentBoard = ['', '', '', '', '', '', '', ''];
  currentPlayer = crossPlayer;
  gameRound = 0;
}

// Winning combinations
const winningCombinations = [
  // Horizontal
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // Vertical
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // Diagonal
  [0, 4, 8], [2, 4, 6],
];

// Event: when cell is clicked on gameBoard
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

// Update gameBoard
function updateGameBoard(target) {
  // Update HTML & UI
  target.classList.add(`${currentPlayer}`);
  target.textContent = `${currentPlayer}`;
  gameRound++;

  // Update currentBoard array
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
  if (gameRound < 9) {
    for (let i = 0; i < winningCombinations.length; i++) {
      if (
        (currentBoard[winningCombinations[i][0]] === 'X' &&
          currentBoard[winningCombinations[i][1]] === 'X' &&
          currentBoard[winningCombinations[i][2]] === 'X') ||
        (currentBoard[winningCombinations[i][0]] === 'O' &&
          currentBoard[winningCombinations[i][1]] === 'O' &&
          currentBoard[winningCombinations[i][2]] === 'O')
      ) {
        let endGame = 'winner';
        showWinnerScreen(endGame);
      } 
    }
  } else {
    showWinnerScreen();
  }
}

// Change the current player
function changePlayer() {
  return currentPlayer === crossPlayer
    ? (currentPlayer = circlePlayer)
    : (currentPlayer = crossPlayer);
}

// Display winner screen
function showWinnerScreen(endGame) {
  const div = document.createElement('div');
  const container = document.querySelector('.container');
  const winnerScreen = container.insertBefore(div, gameBoard);
  winnerScreen.classList.add('winner-screen');
  
  if (endGame === 'winner') {
  winnerScreen.innerHTML = `
        "${currentPlayer}" is the winner!
        <button class="btn-restart">Play a new game</button>
        `;
  } else {
  winnerScreen.innerHTML = `
        It is a draw!
        <button class="btn-restart">Play a new game</button>
        `;
  }
  // Event: click button, start new game
  let button = document.querySelector('.btn-restart');
  button.addEventListener('click', (e) => startNewGame());
}
