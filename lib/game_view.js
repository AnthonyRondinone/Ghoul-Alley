
class GameView{
  constructor(game, ctx, playingMusic, deadAudio) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.ghoulsOnParade();
    this.willRender = true;
    this.playingMusic = playingMusic;
    this.deadAudio = deadAudio;
  }

  start() {
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
    console.log(e.keyCode);
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
    }
  }





}

export default GameView;
