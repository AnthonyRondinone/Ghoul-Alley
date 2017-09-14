import Game from './game';
import Sprite from './sprite';
import GameView from './game_view';

class Player extends Sprite {
  constructor(options) {
    super(options);
    this.alive = true;
    this.ctx = options.ctx;
    this.image = options.image;
    this.width = options.width;
    this.height = options.height;
    this.dx = options.dx;
    this.dy = options.dy;
    this.numberOfFrames = options.numberOfFrames;
    this.spriteAnimationRows = options.spriteAnimationRows;
    this.spriteAnimationCounter = 0;
    this.animationSelector = 1;
    this.frameIndex = 0;
    this.ticksPerFrame = 2;
    this.frameWidth = this.width / options.numberOfFrames;
    this.frameHeight = this.height / options.spriteAnimationRows;
    this.direction = "idle";
    this.prevAnimation = null;
    this.action = null;
    this.score = 0;
    this.moveBool = {
      left: false,
      right: false
    };
  }

  ghoulFall(ghoul) {
    if (ghoul.image.src === ghoul.altImage.src) {
      ghoul.dy = 150;
    }
  }

  collision(ghoul) {
    if (this.action === "punch") {
      if (ghoul.image !== ghoul.altImage) {
        this.score += 1;

          this.game.sound.fx.punch.volume = 0.5;
          this.game.sound.fx.punch.play();
          this.game.sound.fx.coin.volume = 0.5;
          this.game.sound.fx.coin.play();
          this.game.sound.fx.coin.currentTime = 0;
          this.game.sound.fx.punch.currentTime = 0;

      }
      this.game.replace(ghoul);
      this.ghoulFall(ghoul);
    } else if (this.action === null && ghoul.image !== ghoul.altImage) {
      this.dead();
    }
  }

  dead() {
    if (this.animationSelector === 0 || this.animationSelector === 1) {
      this.animationSelector = 3;
    } else if (this.animationSelector === 4 || this.animationSelector === 5) {
      this.animationSelector = 7;
    }
    this.frameIndex = 4;
    this.alive = false;
  }



  setIdleDirection(direction) {
    if(direction === "right") {
      this.animationSelector = 1;
    } else if (direction === "left") {
      this.animationSelector = 5;
    }
  }

  punch() {
      if (this.action === null) {
        this.action = "punch";
        if (this.animationSelector !== 2 && this.animationSelector !== 6) {

        }
        if(this.direction === "right" || this.animationSelector === 1) {
          this.animationSelector = 2;
        } else if (this.direction === "left" || this.animationSelector === 5) {
          this.animationSelector = 6;
        }
        this.spriteAnimationCounter = 0;
        this.frameIndex = 0;
      }
  }

  isOutOfBounds(dx) {
    return(dx < 0 || dx > Game.DIM_X);
  }

  repositionAfterPunch() {
    if (this.direction === "right" || this.direction === "left") {
      switch(this.animationSelector) {
        case 2:
          this.animationSelector = 0;
          break;
        case 6:
          this.animationSelector = 4;
          break;
      }
    }
    if (this.direction === "idle") {
      switch(this.animationSelector) {
        case 2:
          this.animationSelector = 1;
          break;
        case 6:
          this.animationSelector = 5;
          break;
      }
    }
  }


  move() {
    this.spriteAnimationCounter += 1;
    if (this.action === "punch" && this.frameIndex === 7) {
      this.spriteAnimationCounter = 0;
      this.frameIndex = 0;
      this.action = null;
      this.repositionAfterPunch();
    }

    if (Object.values(this.moveBool).every((bool) => bool === false)) {
      this.setIdleDirection(this.direction);
      this.direction = "idle";
    }

    switch(this.direction) {
      case "left":  // left
        if (this.dx > -150) {
          this.dx -= 5;
        }
        break;
      case "right": // right
        if (this.dx < 800) {
          this.dx += 5;
        }
        break;
      case "idle":
        this.dx = this.dx;
        break;
    }


    if(this.spriteAnimationCounter > this.ticksPerFrame) {
      this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
      this.spriteAnimationCounter = 0;
    }
  }


  draw(ctx) {
      ctx.drawImage(
      this.image,
      this.frameIndex * this.frameWidth, // source x
      this.animationSelector * this.frameHeight, //source y
      this.frameWidth, //source width
      this.frameHeight, // source height
      this.dx, // destination x
      this.dy, // destination y
      this.width / this.numberOfFrames, // destination width
      this.height / 8 // destination height
    );
  }

  render() {
    this.image.onload = () => {
      this.context.drawImage(
        this.image,
        this.width / this.numberOfFrames, // source x
        0, //source y
        this.width / this.numberOfFrames, //source width
        this.height / this.spriteAnimationRows, // source height
        this.dx, // destination x
        this.dy, // destination y
        this.width / this.numberOfFrames, // destination width
        this.height / this.spriteAnimationRows // destination height
      );
    };
  }

}


export default Player;
