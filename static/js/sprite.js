'use strict'

class Sprite {
  constructor(img, type, vector) {
    this.img = new Image();
    this.img.src = null;
    this.x = this.y = 0;
    this.type = type;
    if(type == "Player"){
      console.log(img);
      this.imglist = img;
      this.img.src = img[vector];
      this.vector = vector;
    }else{
      this.img.src = img;
    }
  }

  render(canvas, wh) {
    const _ctx = canvas.getContext('2d');
    if(this.type == "Player"){
      // update vector
      this.img.src = this.imglist[this.vector];
    }
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

  setvector(vector){
    this.vector = vector;
  }
}