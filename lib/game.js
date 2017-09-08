import Player from './player';
import Ghoul from './ghoul';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  const ghoulImg = new Image();
  ghoulImg.src = 'assets/gool.png';




    const ghoulOptions = {
      context: ctx,
      image: ghoulImg,
      sx: 0,
      sy: 0,
      sWidth: 265,
      sHeight: 263,
      // dx: [-20, 1000][Math.floor(Math.random() * 2)],
      dx: 500,
      dy: Math.floor(Math.random() * (420 - 400) + 400),
      dWidth: 265 / 1.5,
      dHeight: 263 / 1.5
      };

    const newGool = new Ghoul (ghoulOptions);
    newGool.render();




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
    spriteAnimationRows: 8
  };



  const anthony = new Player (anthonyCharOptions);
  anthony.render();



function loopFrames() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  newGool.draw();
  anthony.move();
  anthony.draw();

  window.requestAnimationFrame(loopFrames);
}

  window.requestAnimationFrame(loopFrames);



  document.addEventListener('keydown', (e) => {

    switch(e.keyCode) {
      case 37:  // left
        anthony.moveBool.left = true;
        anthony.direction = "left";
        anthony.animationSelector = 4;
        break;
      case 39: // right
        anthony.moveBool.right = true;
        anthony.direction = "right";
        anthony.animationSelector = 0;
        break;
      case 83: //s punch
        anthony.setPunchDirection(anthony.direction);
        break;
  }
});


  document.addEventListener('keyup', (e) => {

    switch(e.keyCode) {
      case 37:  // left
        anthony.moveBool.left = false;
        break;
      case 39: // right
        anthony.moveBool.right = false;
        break;
      case 83: //s punch
        break;
    }
  });

});
