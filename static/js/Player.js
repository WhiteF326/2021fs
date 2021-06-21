'use strict';

class Player extends BasicSprite{
  constructor(img, textureNo){
    super(img);
    this.textureNo = textureNo;
  }

  render(canvas, size){
    super.render(canvas, size);
  }

  move(x, y){
    super.render(x, y);
  }
}