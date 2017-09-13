import Game from './game';


class GameView{
  constructor(game, ctx, sound) {
    this.ctx = ctx;
    this.game = game;
    this.modal = "open";
    this.sound = sound;
    this.addHandlers();
  }

  start() {
    this.player = this.game.addPlayer();
    this.game.ghoulsOnParade();

    this.sound.fx.BackgroundMusic.volume = 0.6;
    this.sound.fx.BackgroundMusic.play();
    this.sound.fx.BackgroundMusic.loop = true;
    requestAnimationFrame(this.animate.bind(this));
  }


  addHandlers() {
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
          case 77:
          if (this.game.mute === false) {
            this.sound.mute();
            this.game.mute = true;
          } else if (this.game.mute === true) {
            this.sound.unMute();
            this.game.mute = false;
          }
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
        case 32:
          this.sound.fx.nonHit.currentTime = 0;
          break;
      }
    });

  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    if (this.player.alive) {

      requestAnimationFrame(this.animate.bind(this));
    }
    if (!this.player.alive) {
      this.sound.fx.splatMan.play();
      this.sound.fx.deadAudio.volume = 0.4;
      this.sound.fx.deadAudio.play();
      this.sound.fx.BackgroundMusic.pause();
      this.sound.fx.BackgroundMusic.currentTime = 0;
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
    scope.sound.fx.modalMusic.currentTime = 0;
    scope.sound.fx.modalMusic.volume = 0.4;
    scope.sound.fx.modalMusic.play();
  }

  closeStartModal() {
    this.modal = "close";
    let startModal = document.getElementsByClassName('start-modal');
    [].forEach.call(startModal, function(el) {
      el.className = el.className.replace('show', 'hidden');
    });
    this.sound.fx.modalMusic.pause();
  }


}

export default GameView;
