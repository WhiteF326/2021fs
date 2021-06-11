'use strict'

class Sprite {
  constructor(img) {
    this.img = new Image();
    this.img.src = img;
    this.x = this.y = 0;
  }

  update(canvas, x, y) {
    this.render(canvas, x, y);
  }

  render(canvas, w, h) {
    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      0, 0,
      this.img.naturalWidth, this.img.naturalHeight,
      this.x, this.y,
      w, h
    );
  }

  move(x, y){
    this.x += x;
    this.y += y;
  }
}