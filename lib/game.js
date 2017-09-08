import Player from './player';
import Ghoul from './ghoul';



class Game {
  constructor() {
    this.players = [];
    this.ghouls = [];
  }


  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Ghoul) {
      this.ghouls.push(object);
    }
  }

  allObjects() {
    return [].concat(this.players, this.ghouls);
  }

  isOutOfBounds(dx) {
    return(dx < DIM_X - 20 || dx > DIM_X + 50);
  }

  addPlayer() {
    const anthonyCharImg = new Image();
    anthonyCharImg.src = 'assets/rondsprite.png';

    const anthonyCharOptions = {
      context: ctx,
      width: 3197,
      height: 2656,
      image: anthonyCharImg,
      dx: ctx.canvas.width - 1000,
      dy: ctx.canvas.height / 2,
      numberOfFrames: 8,
      spriteAnimationRows: 8,
      game: this
    };

    const anthony = new Player (anthonyCharOptions);

    this.add(anthony);
  }

  addGhouls() {

    const ghoulImg = new Image();
    ghoulImg.src = 'assets/gool.png';


    let ghoulStartDx = [-20, 1000][Math.floor(Math.random() * 2)];
    const ghoulOptions = {
      context: ctx,
      image: ghoulImg,
      sx: 0,
      sy: 0,
      sWidth: 265,
      sHeight: 263,
      dx: ghoulStartDx,
      startSide: ghoulStartDx,
      dy: Math.floor(Math.random() * (420 - 400) + 400),
      dWidth: 265 / 1.5,
      dHeight: 263 / 1.5,
      game: this
      };

    const newGhoul = new Ghoul (ghoulOptions);

    this.add(newGhoul);

  }


  remove(object) {
    if (object instanceof Ghoul) {
      this.ghouls.splice(this.ghouls.indexOf(object), 1);
    }
  }




}

Game.DIM_X = 1035;
Game.DIM_Y = 700;
