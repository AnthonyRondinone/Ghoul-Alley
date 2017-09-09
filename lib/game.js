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

  addPlayer() {
    const anthonyCharImg = new Image();
    anthonyCharImg.src = 'assets/rondsprite.png';

    const anthonyCharOptions = {
      width: 3197,
      height: 2656,
      image: anthonyCharImg,
      dx: 300,
      dy: 350,
      numberOfFrames: 8,
      spriteAnimationRows: 8,
      game: this
    };

    const anthony = new Player (anthonyCharOptions);

    this.add(anthony);

    return anthony;
  }

  addGhouls() {
    const ghoulImg = new Image();
    ghoulImg.src = 'assets/gool.png';
    const ghoulCollided = new Image();
    ghoulCollided.src = 'assets/goolCollided.png';

    let ghoulStartDx = [-20, 1000][Math.floor(Math.random() * 2)];
    // let ghoulStartDx = -20;
    const ghoulOptions = {
      image: ghoulImg,
      altImage: ghoulCollided,
      sx: 0,
      sy: 0,
      sWidth: 265,
      sHeight: 263,
      dx: ghoulStartDx,
      startSide: ghoulStartDx,
      dy: Math.floor(Math.random() * (420 - 400) + 400),
      dWidth: 265 / 1.5,
      dHeight: 263 / 1.5,
      speed: Math.floor(Math.random() * 2) + 1,
      game: this
      };

    const newGhoul = new Ghoul (ghoulOptions);

    this.add(newGhoul);
    return newGhoul;
  }

  ghoulsOnParade() {
    setInterval(() => {
      this.addGhouls();
    }, 1500);
  }

  checkCollision() {
    const player = this.players[0];
    const ghouls = this.ghouls;
    for (let i = 0; i < ghouls.length; i++) {
      let ghoul = ghouls[i];
      if (ghoul.isCollidedWith(player)) {
        player.collision(ghoul);
      }
    }
  }


  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  } 

  moveObjects() {
    this.allObjects().forEach((object) => {
      object.move();
    });
  }

  step() {
    this.moveObjects();
    this.checkCollision();
  }


  remove(ghoul) {
    this.ghouls.splice(this.ghouls.indexOf(ghoul), 1);
  }

  replace(ghoul) {
    ghoul.image = ghoul.altImage;

  }






}

Game.DIM_X = 1035;
Game.DIM_Y = 700;

export default Game;
