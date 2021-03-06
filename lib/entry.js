import Game from './game';
import GameView from './game_view';
import Sound from './sound';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');


  const sound = new Sound();
  const game = new Game(sound);
  const gameView = new GameView(game, ctx, sound);

  gameView.sound.fx.modalMusic.loop = true;
  gameView.sound.fx.modalMusic.volume = 0.4;
  gameView.sound.fx.modalMusic.play();

   window.startGame = (e) => {
     if (e.keyCode === 13) {
       const newGame = new Game(sound);
       gameView.game = newGame;
       gameView.closeStartModal();
       gameView.start();
       document.removeEventListener('keypress', window.startGame);
     }
   };

   window.reStartGame = (e) => {
     if (e.keyCode === 13) {
       const newGame = new Game(sound);
       gameView.game = newGame;
       gameView.closeScoreListModal();
       gameView.start();
       document.removeEventListener('keypress', window.reStartGame);
     }
   };

   window.skipHighScoreStart = (e) => {
     if (e.keyCode === 32) {
       gameView.sound.fx.modalMusic.pause();
       gameView.sound.fx.deadAudio.pause();
       const newGame = new Game(sound);
       gameView.game = newGame;
       gameView.closeInitialModal();
       gameView.start();
       document.removeEventListener('keypress', window.skipHighScoreStart);
     }
   };

   document.addEventListener('keypress', window.startGame);





});
