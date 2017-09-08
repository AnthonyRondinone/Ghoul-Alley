import Game from './game';
import GameView from './game_view';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  const game = new Game();
  new GameView(game, ctx).start();


});
