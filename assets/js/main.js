import { startGame } from './tic-tac-toe.js';

const MODE_OPTIONS = document.querySelectorAll('.modes__mode');
let isComputerMode = false;

function chooseMode() {
  isComputerMode = this.id.includes('computer');

  document.querySelector('.choose-mode').style.display = 'none';

  startGame();
}

MODE_OPTIONS.forEach((MODE_OPTION) => {
  MODE_OPTION.addEventListener('click', chooseMode);
});

export { isComputerMode };
