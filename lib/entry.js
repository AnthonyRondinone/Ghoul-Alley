import Game from './game';
import GameView from './game_view';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  let playingMusic = document.getElementById('playingMusic');
  let deadAudio = document.getElementById('deadAudio');



  const game = new Game();
  new GameView(game, ctx, playingMusic, deadAudio).start();

});
