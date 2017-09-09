
class GameView{
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    // this.game.ghoulsOnParade();
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
        // case 83: //s punch
        //   this.player.action = "punch";
        //   break;
    }
  });

  document.addEventListener('keypress', (e) => {
      switch(e.keyCode) {
        case 115: // punch
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
        // case 83: //s punch
        // this.player.action = null;
        //   break;
      }
    });

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }



}

export default GameView;
