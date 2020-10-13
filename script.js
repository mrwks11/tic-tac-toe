// GLOBAL VARIABLES
const gameBoard = document.getElementById('game-board');
const gameCells = document.querySelectorAll('[data-cell]');
let gameRound;
let currentBoard;
let currentPlayerMarker;

// UI BUTTON: START NEW GAME
const startGame = document.getElementById('startNewGame');
startGame.addEventListener('click', (e) => {
  startNewGame();
  resetScore();
});

// CROSS PLAYER
const crossPlayerMarker = 'X';
let crossPlayerName = `Player ${crossPlayerMarker}`;
const crossPlayerScoreUI = document.getElementById('crossPlayerScore');
let crossPlayerScore = 0;
// Edit cross player name
const crossPlayerNameUI = document.getElementById('crossPlayerName');
crossPlayerNameUI.addEventListener('click', (e) => {
  crossPlayerName = prompt('What is your name?', `${crossPlayerName}`);
  return crossPlayerName === null
    ? (crossPlayerNameUI.textContent = `Player "X"`)
    : (crossPlayerNameUI.textContent = `${crossPlayerName}`);
});

// CIRCLE PLAYER
const circlePlayerMarker = 'O';
let circlePlayerName = `Player ${circlePlayerMarker}`;
const circlePlayerScoreUI = document.getElementById('circlePlayerScore');
let circlePlayerScore = 0;
// Edit circle player name
const circlePlayerNameUI = document.getElementById('circlePlayerName');
circlePlayerNameUI.addEventListener('click', (e) => {
  circlePlayerName = prompt('What is your name?', `${circlePlayerName}`);
  return circlePlayerName === null
    ? (circlePlayerNameUI.textContent = `Player "O"`)
    : (circlePlayerNameUI.textContent = `${circlePlayerName}`);
});

startNewGame();

// CLICK GAMEBOARD
gameBoard.addEventListener('click', (e) => {
  clickAction(e.target);
});
// Action cell clicked
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

// UPDATE GAMEBOARD
function updateGameBoard(target) {
  // Update HTML & UI
  target.classList.add(`${currentPlayerMarker}`);
  target.textContent = `${currentPlayerMarker}`;
  gameRound++;

  // Update currentBoard array
  for (let i = 0; i < gameCells.length; i++) {
    if (gameCells[i].textContent === 'X') {
      currentBoard[i] = 'X';
    } else if (gameCells[i].textContent === 'O') {
      currentBoard[i] = 'O';
    } else {
      currentBoard[i] = i;
    }
  }
}

// CHECK WINNER
function checkWinner() {
  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check
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

// CHANGE CURRENT PLAYER
function changePlayer() {
  return currentPlayerMarker === crossPlayerMarker
    ? (currentPlayerMarker = circlePlayerMarker)
    : (currentPlayerMarker = crossPlayerMarker);
}

// DISPLAY WINNER SCREEN
function showWinnerScreen(endGame) {
  const div = document.createElement('div');
  const container = document.querySelector('.container');
  const winnerScreen = container.insertBefore(div, gameBoard);
  winnerScreen.classList.add('winner-screen');

  if (endGame === 'winner' && currentPlayerMarker === 'X') {
    winnerScreen.innerHTML = `
        "${crossPlayerName}" is the winner!
        <button class="btn-restart">Play a new game</button>
        `;
    updateScores();
  } else if (endGame === 'winner' && currentPlayerMarker === 'O') {
    winnerScreen.innerHTML = `
          "${circlePlayerName}" is the winner!
          <button class="btn-restart">Play a new game</button>
          `;
    updateScores();
  } else {
    winnerScreen.innerHTML = `
        It is a draw!
        <button class="btn-restart">Play a new game</button>
        `;
  }
  // Event: click button, start new game
  const button = document.querySelector('.btn-restart');
  button.addEventListener('click', (e) => startNewGame());
}

// UPDATE SCORES
function updateScores() {
  if (currentPlayerMarker === crossPlayerMarker) {
    crossPlayerScore++;
    crossPlayerScoreUI.textContent = `${crossPlayerScore}`;
  } else {
    circlePlayerScore++;
    circlePlayerScoreUI.textContent = `${circlePlayerScore}`;
  }
}

// START NEW GAME
function startNewGame() {
  // Reset player
  currentPlayerMarker = crossPlayerMarker;
  // Reset gameBoard
  for (let i = 0; i < gameCells.length; i++) {
    gameCells[i].classList.remove('X', 'O');
    gameCells[i].textContent = '';
  }
  currentBoard = ['', '', '', '', '', '', '', '', ''];
  gameRound = 0;
  // Remove winnerScreen
  const winnerScreen = document.querySelector('.winner-screen');
  if (winnerScreen) {
    winnerScreen.remove();
  }
}

// RESET SCORES
function resetScore() {
  crossPlayerScore = 0;
  crossPlayerScoreUI.textContent = `${crossPlayerScore}`;
  circlePlayerScore = 0;
  circlePlayerScoreUI.textContent = `${circlePlayerScore}`;
}
