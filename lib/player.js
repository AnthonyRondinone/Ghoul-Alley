
class Player {
  constructor(options) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
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
    this.moveBool = {
      left: false,
      right: false
    };
  }

  setIdleDirection(direction) {

    if(direction === "right") {
      this.animationSelector = 1;
    } else if (direction === "left") {
      this.animationSelector = 5;
    }
  }

  setPunchDirection(direction) {
    this.prevAnimation = this.animationSelector;
    if(direction === "right" || this.animationSelector === 1) {
      this.animationSelector = 2;
    } else if (direction === "left" || this.animationSelector === 5) {
      this.animationSelector = 6;
    }
    this.spriteAnimationCounter = 0;
  }


  move() {
    this.spriteAnimationCounter += 1;
    if (Object.values(this.moveBool).every((bool) => bool === false)) {
      this.setIdleDirection(this.direction);
      this.direction = "idle";
    }
      switch(this.direction) {
        case "left":  // left
        this.dx -= 5;
        break;
        case "right": // right
        this.dx += 5;
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


  draw() {

    if (this.animationSelector !== 2 && this.animationSelector !== 6) {
      this.frameIndex = this.frameIndex % 8;

    } else {
      this.frameIndex = this.spriteAnimationCounter;
      if (this.spriteAnimationCounter >= 7) {
        this.animationSelector = this.prevAnimation;
      }
    }
    this.context.drawImage(
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