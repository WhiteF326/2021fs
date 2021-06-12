'use strict'

class Sprite {
  constructor(img, type) {
    this.img = new Image();
    this.img.src = img;
    this.x = this.y = 0;
    this.type = type;
  }

  render(canvas, wh) {
    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      0, 0,
      this.img.naturalWidth, this.img.naturalHeight,
      this.x, this.y,
      wh, wh
    );
  }

  move(x, y){
    this.x += x;
    this.y += y;
  }

  gettype(){
    return this.type;
  }
}