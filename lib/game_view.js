import Game from './game';


class GameView{
  constructor(game, ctx, playingMusic, deadAudio, modalMusic) {
    this.ctx = ctx;
    this.game = game;
    // this.player = this.game.addPlayer();
    // this.game.ghoulsOnParade();
    // this.willRender = true;
    // this.playingMusic = playingMusic;
    // this.deadAudio = deadAudio;
    // this.modalMusic = modalMusic;
    this.modal = "open";
  }

  start() {
    this.player = this.game.addPlayer();
    this.game.ghoulsOnParade();
    this.playingMusic = playingMusic;
    this.deadAudio = deadAudio;
    this.modalMusic = modalMusic;


    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37:  // left
          this.player.moveBool.left = true;
          this.player.direction = "left";
          this.player.animationSelector = 4;
          break;
        case 39: // right
          this.player.moveBool.right = true;
          this.player.direction = "right";
          this.player.animationSelector = 0;
          break;
    }
  });

  document.addEventListener('keypress', (e) => {
      switch(e.keyCode) {
        case 32: // punch
          this.player.punch();
          break;
        case 115:
          this.player.alive = true;
          break;
      }
  });



    document.addEventListener('keyup', (e) => {

      switch(e.keyCode) {
        case 37:  // left
          this.player.moveBool.left = false;
          break;
        case 39: // right
          this.player.moveBool.right = false;
          break;
      }
    });
    this.playingMusic.play();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    if (this.player.alive) {
      requestAnimationFrame(this.animate.bind(this));
    }
    if (!this.player.alive) {

      this.deadAudio.play();
      this.playingMusic.pause();
      this.game.endDraw(this.ctx);
      const scope = this;
      window.setTimeout(() => {
        scope.callStartModal(scope);
        document.addEventListener('keypress', window.startGame);
      }, 3400);
    }
  }

  callStartModal(scope) {
    this.modal = "open";
    let startModal = document.getElementsByClassName('start-modal');
    [].forEach.call(startModal, function(el) {
      el.className = el.className.replace('hidden', 'show');
    });
    this.modalMusic.currentTime = 0;
    scope.modalMusic.play();
  }

  closeStartModal() {
    this.modal = "close";
    let startModal = document.getElementsByClassName('start-modal');
    [].forEach.call(startModal, function(el) {
      el.className = el.className.replace('show', 'hidden');
    });
    playingMusic.currentTime = 0;
    modalMusic.pause();
  }


}

export default GameView;
