'use strict';

class BasicSprite{
  constructor(img){
    this.img = new Image();
    this.img.src = img;
    // position on the canvas
    this.positionX = this.positionY = 0;
    // texture Number
    this.textureNo = 0;
    // texture Size
    this.textureSize = 16;
    
    // preCalculate texture Amount
    this.texturePointX = this.textureNo % (this.img.naturalWidth / this.textureSize);
    this.texturePointY = this.textureNo / (this.img.naturalWidth / this.textureSize);
  }

  render(canvas, size){
    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      this.texturePointX * this.textureSize, this.texturePointY * this.textureSize,
      this.textureSize, this.textureSize,
      this.positionX, this.positionY,
      size, size
    );
  }

  move(x, y){
    this.positionX += x;
    this.positionY += y;
  }
}