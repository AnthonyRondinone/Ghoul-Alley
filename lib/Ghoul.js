import Sprite from './sprite';
import * as Util from './util';


class Ghoul extends Sprite {
  constructor(options) {
    super(options);
    this.altImage = options.altImage;
    this.wobble = "up";
    this.startSide = options.startSide;
    this.speed = options.speed;
  }



  move() {
    if (this.startSide === -20) {
      this.dx += this.speed * 5;
    } else if (this.startSide === 1000) {
      this.dx -= this.speed * 5;
    }
  }



  isCollidedWith(player) {
    if (Util.distance(player.dx, this) > 20 && Util.distance(player.dx, this) < 40) {
      return true;
    }
    return false;
  }

  remove() {
    this.game.remove();
  }

}


export default Ghoul;
