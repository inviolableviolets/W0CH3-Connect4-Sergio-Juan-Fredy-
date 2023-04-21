let currentTurn = "";
let turnRed = "red";
let turnYellow = "yellow";
let column;
let checkTile = [[], [], [], [], [], []];
let totalColumns = 7;
let totalRows = 6;
let board = document.querySelector(".board");
let overlay = document.querySelector(".overlay");
let currentCoin = document.querySelector(".current-coin");
let tiles = [];

let generateFirstTurn = () => {
  let randomNumber = Math.floor(Math.random() * 10);
  console.log(randomNumber);
  if (randomNumber < 5) {
    currentTurn = turnRed;
    overlay.classList.add(turnRed);
    currentCoin.style.backgroundColor = turnRed;
    return;
  }

  if (randomNumber >= 5) {
    currentTurn = turnYellow;
    overlay.classList.add(turnYellow);
    currentCoin.style.backgroundColor = turnYellow;
    return;
  }

  return currentTurn;
};

const generateBoard = () => {
  for (let row = 1; row <= totalRows; row++) {
    for (let column = 1; column <= totalColumns; column++) {
      let tile = document.createElement("li");
      tile.classList.add("tile");
      tile.classList.add(`c${column}`);
      tile.classList.add(`r${row}`);
      board.append(tile);
    }
  }
};

const playNextTurn = (setTileEvent) => {
  overlay.classList.remove(turnYellow);
  overlay.classList.remove(turnRed);
  let selectedColumn = setTileEvent.target.className.charAt(11);
  column = document.querySelectorAll(`.c${selectedColumn}`);

  for (let row = 0; row < column.length; row++) {
    if (column[row].style.backgroundColor === "" && currentTurn === turnRed) {
      column[row].style.backgroundColor = turnRed;
      currentTurn = turnYellow;
      overlay.classList.add(turnYellow);
      currentCoin.style.backgroundColor = turnYellow;
      checkWinner();
      return;
    }

    if (
      column[row].style.backgroundColor === "" &&
      currentTurn === turnYellow
    ) {
      column[row].style.backgroundColor = turnYellow;
      currentTurn = turnRed;
      overlay.classList.add(turnRed);
      currentCoin.style.backgroundColor = turnRed;
      checkWinner();
      return;
    }
  }
};

const checkWinner = () => {
  checkVerticalWinner();
};

const checkVerticalWinner = () => {
  for (let checkedColumn = 0; checkedColumn < 4; checkedColumn++) {
    if (column[checkedColumn].style.backgroundColor !== "") {
      if (
        column[checkedColumn].style.backgroundColor ===
          column[checkedColumn + 1].style.backgroundColor &&
        column[checkedColumn + 1].style.backgroundColor &&
        column[checkedColumn + 2].style.backgroundColor &&
        column[checkedColumn + 2].style.backgroundColor ===
          column[checkedColumn + 3].style.backgroundColor
      ) {
        displayGameOver();
        return;
      }
    }
  }
};

const startConnectFourGame = () => {
  generateFirstTurn();
  generateBoard();
  document.addEventListener("click", playNextTurn);
};

startConnectFourGame();

const displayGameOver = () => {
  setTimeout(() => {
    overlay.classList.remove(turnYellow);
    overlay.classList.remove(turnRed);
    document.querySelector(".win-overlay").style.zIndex = 3;
    overlay.style.zIndex = 2;
  }, 1000);

  setTimeout(() => {
    location.reload();
  }, 5000);
};
