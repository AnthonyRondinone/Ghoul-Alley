import Sprite from './sprite';

class Ghoul extends Sprite {
  constructor(options) {
    super(options);
    this.wobble = "up";
    this.startSide = options.startSide;
  }

  move() {
    if (this.startSide === -20) {
      this.dx += 5;
    } else if (this.startSide === 1000) {
      this.dx -= 5;
    }

  }



}


export default Ghoul;
