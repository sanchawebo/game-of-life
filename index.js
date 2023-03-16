import GameOfLife from './game-of-life.js';

const canvas = document.querySelector('#gamefield');
// eslint-disable-next-line no-unused-vars
const ctx = canvas.getContext('2d');

const game = new GameOfLife(canvas);
game.gameSetUp();
window.onload = () => {
  document.querySelector('#start-random').addEventListener('click', () => {
    game.arrayRandomize();
    game.fillArray(ctx);
    window.setInterval(() => {
      game.runGame(ctx);
    }, 200);
  });
  document.querySelector('#stop').addEventListener('click', () => {
    game.gameSetUp();
  });
};
