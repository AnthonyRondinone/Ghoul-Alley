import Player from './player';
import Ghoul from './ghoul';


document.addEventListener('DOMContentLoaded', () => {

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');





function loopFrames() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  anthony.move();
  anthony.draw();
  newGhoul.draw();
  newGhoul.move();

  window.requestAnimationFrame(loopFrames);
}

  loopFrames();



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
