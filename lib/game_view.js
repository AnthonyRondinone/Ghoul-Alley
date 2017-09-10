
class GameView{
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.game.ghoulsOnParade();
    this.willRender = true;
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
      switch(e.keyCode) {
        case 32: // punch
        this.player.punch();
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

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    if (this.player.alive) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }



}

export default GameView;
