import Player from './player';
import Ghoul from './ghoul';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

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




window.setInterval(() => {
  anthony.spriteAnimationCounter += 1;
  if (Object.values(anthony.move).every((bool) => bool === false)) {
    anthony.setIdleDirection(anthony.direction);
    anthony.direction = "idle";
  }
  anthony.draw(anthony.direction);
}, 50);



  document.addEventListener('keydown', (e) => {

    switch(e.keyCode) {
      case 37:  // left
        anthony.move.left = true;
        anthony.direction = "left";
        anthony.animationSelector = 4;
        break;
      case 39: // right
        anthony.move.right = true;
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
      anthony.move.left = false;
      break;
    case 39: // right
      anthony.move.right = false;
      break;
    case 83: //s punch
      break;
  }
});

});
