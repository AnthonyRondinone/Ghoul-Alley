import Game from './game';
import GameView from './game_view';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');


  const game = new Game();
  const gameView = new GameView(game, ctx, game.sound);

  gameView.sound.fx.modalMusic.loop = true;
  gameView.sound.fx.modalMusic.volume = 0.4;
  gameView.sound.fx.modalMusic.play();

   window.startGame = (e) => {
     if (e.keyCode === 13) {
       const newGame = new Game();
       gameView.game = newGame;
       gameView.closeStartModal();
       gameView.start();
       document.removeEventListener('keypress', window.startGame);
     }
   };

   document.addEventListener('keypress', window.startGame);





});
