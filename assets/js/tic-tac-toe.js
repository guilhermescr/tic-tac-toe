import { isComputerMode } from './main.js';

const SQUARES = document.querySelectorAll('.square');
const markX = 'x';
const markCircle = 'circle';

function startGame() {
  let currentMark = markX;
  let isPlayer1Turn = true;

  function changeTurn() {
    isPlayer1Turn = !isPlayer1Turn;
    currentMark = currentMark === markX ? markCircle : markX;
  }

  function isMarkCombination(mark) {
    const topHorizontalCombination =
      SQUARES[0].classList.contains(mark) &&
      SQUARES[1].classList.contains(mark) &&
      SQUARES[2].classList.contains(mark);

    const middleHorizontalCombination =
      SQUARES[3].classList.contains(mark) &&
      SQUARES[4].classList.contains(mark) &&
      SQUARES[5].classList.contains(mark);

    const bottomHorizontalCombination =
      SQUARES[6].classList.contains(mark) &&
      SQUARES[7].classList.contains(mark) &&
      SQUARES[8].classList.contains(mark);

    const leftVerticalCombination =
      SQUARES[0].classList.contains(mark) &&
      SQUARES[3].classList.contains(mark) &&
      SQUARES[6].classList.contains(mark);

    const middleVerticalCombination =
      SQUARES[1].classList.contains(mark) &&
      SQUARES[4].classList.contains(mark) &&
      SQUARES[7].classList.contains(mark);

    const rightVerticalCombination =
      SQUARES[2].classList.contains(mark) &&
      SQUARES[5].classList.contains(mark) &&
      SQUARES[8].classList.contains(mark);

    const leftDiagonalCombination =
      SQUARES[0].classList.contains(mark) &&
      SQUARES[4].classList.contains(mark) &&
      SQUARES[8].classList.contains(mark);

    const rightDiagonalCombination =
      SQUARES[2].classList.contains(mark) &&
      SQUARES[4].classList.contains(mark) &&
      SQUARES[6].classList.contains(mark);

    return (
      topHorizontalCombination ||
      middleHorizontalCombination ||
      bottomHorizontalCombination ||
      leftVerticalCombination ||
      middleVerticalCombination ||
      rightVerticalCombination ||
      leftDiagonalCombination ||
      rightDiagonalCombination
    );
  }

  function removeListenersFromSquares() {
    SQUARES.forEach((SQUARE) => {
      SQUARE.removeEventListener('click', markSquare);
    });
  }

  function winGame() {
    alert(isPlayer1Turn ? 'X won!' : 'Circle won!');
    removeListenersFromSquares();
  }

  function tieGame() {
    alert("It's a tie!");
    removeListenersFromSquares();
  }

  function hasCombinations() {
    if (isMarkCombination(markX) || isMarkCombination(markCircle)) {
      winGame();

      return true;
    } else if (isTie()) {
      tieGame();
    }

    return false;
  }

  function isTie() {
    const squaresLength = [...SQUARES].filter(
      (SQUARE) =>
        SQUARE.classList.contains(markX) ||
        SQUARE.classList.contains(markCircle)
    ).length;

    return (
      squaresLength === 9 &&
      !isMarkCombination(markX) &&
      !isMarkCombination(markCircle)
    );
  }

  function markSquareForComputer() {
    const notMarkedSquares = [...SQUARES].filter(
      (SQUARE) =>
        !SQUARE.classList.contains(markX) &&
        !SQUARE.classList.contains(markCircle)
    );

    const randomSquare =
      notMarkedSquares[Math.floor(Math.random() * notMarkedSquares.length)];

    if (randomSquare) {
      randomSquare.classList.add(currentMark);
      randomSquare.removeEventListener('click', markSquare);
    }

    if (hasCombinations()) return;

    changeTurn();
  }

  function markSquare() {
    this.classList.add(currentMark);

    if (hasCombinations()) return;

    changeTurn();

    if (isComputerMode) {
      markSquareForComputer();
    }
  }

  function resetGame() {
    SQUARES.forEach((SQUARE) => {
      SQUARE.classList.remove(markX);
      SQUARE.classList.remove(markCircle);

      SQUARE.removeEventListener('click', markSquare);
      SQUARE.addEventListener('click', markSquare, { once: true });
    });
  }

  resetGame();

  document.querySelector('.reset-game-button').addEventListener('click', () => {
    removeListenersFromSquares();
    document.querySelector('.choose-mode').style.display = 'flex';
  });
}

export { startGame };
