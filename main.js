var gameState;
var errorSound = new Audio("error.mp3");
var okSound = new Audio("ok.mp3");
var cssClass = {
  ok: "ok",
  error: "error"
};

$(document).ready(startGame);

function startGame() {
  gameState = getInitialState();
  addEvents();
  // Y ahora? muajajajaja 😈
}

function getInitialState() {
  return {
    masterGrid: [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    successfulMovements: 0,
    successfulMovementsNeeded: 3,
    checkHit: function(coords) {
      if (this.masterGrid[coords.row][coords.column] === 1) {
        return true;
      }
      return false;
    },
    incrementScore: function() {
      this.successfulMovements++;
    },
    checkWinner: function() {
      if (this.successfulMovements >= this.successfulMovementsNeeded) {
        return true;
      }
      return false;
    }
  };
}

function playErrorSound() {
  errorSound.play();
}

function playOkSound() {
  okSound.play();
}

function addEvents() {
  $("#game-grid")
    .children("div")
    .click(clickHandler);
}

function clickHandler($event) {
  var domData = $event.currentTarget.dataset;
  var domElement = $($event.currentTarget);
  if (gameState.checkHit(domData)) {
    addClassToDom(domElement, cssClass.ok);
    gameState.incrementScore();
    removeEvent(domElement);
    playOkSound();
    if (gameState.checkWinner()) {
      removeAll();
      alert("You win!");
    }
  } else {
    addClassToDom(domElement, cssClass.error);
    removeEvent(domElement);
    playErrorSound();
  }
}

function addClassToDom(domElement, ccsClass) {
  domElement.addClass(ccsClass);
}
function removeEvent(element) {
  element.off("click", clickHandler);
}
function removeAll() {
  $("#game-grid")
    .children("div")
    .off("click", clickHandler);
}
