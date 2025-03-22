const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
    cells.push('');
  }
  updateStatus();
}

function cellClick(index) {
  if (!gameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    statusText.textContent = `It's a draw. 🤝`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo =>
    combo.every(index => cells[index] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();
