class Sprite {
  constructor(options) {
    this.ctx = options.ctx;
    this.image = options.image;
    this.sx = options.sx;
    this.sy = options.sy;
    this.sWidth = options.sWidth;
    this.sHeight = options.sHeight;
    this.dx = options.dx;
    this.dy = options.dy;
    this.dWidth = options.dWidth;
    this.dHeight = options.dHeight;
    this.game = options.game;
  }


  collideWith(otherObject) {
    
  }

  draw(ctx) {

    ctx.drawImage(
      this.image,
      this.sx, // source x
      this.sy, //source y
      this.sWidth, //source width
      this.sHeight, // source height
      this.dx, // destination x
      this.dy, // destination y
      this.dWidth, // destination width
      this.dHeight // destination height
    );
  }

  render() {
    this.image.onload = () => {
      this.context.drawImage(
        this.image,
        this.sx, // source x
        this.sy, //source y
        this.sWidth, //source width
        this.sHeight, // source height
        this.dx, // destination x
        this.dy, // destination y
        this.dWidth, // destination width
        this.dHeight // destination height
      );
    };
  }

}

export default Sprite;
