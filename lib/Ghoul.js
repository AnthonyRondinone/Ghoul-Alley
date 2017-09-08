import Sprite from './sprite';
import * as Util from './util';


class Ghoul extends Sprite {
  constructor(options) {
    super(options);
    this.wobble = "up";
    this.startSide = options.startSide;
    this.speed = options.speed;
  }

  move() {
    if (this.startSide === -20) {
      this.dx += this.speed * 4;
    } else if (this.startSide === 1000) {
      this.dx -= this.speed * 4;
    }
  }

  isCollidedWith(player) {
    if (Util.distance(player.dx, this.dx) > 0 && Util.distance(player.dx, this.dx) < 20) {
      return true;
    }
    return false;
  }


}


export default Ghoul;
