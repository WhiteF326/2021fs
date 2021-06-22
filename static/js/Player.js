'use strict';

function sign(x) {
  if (x > 0) return 1;
  else if (x < 0) return -1;
  else return 0;
}

class Player extends BasicSprite {
  constructor(img) {
    super(img);
    this.textureNo = 5;
  }

  render(canvas, size) {
    super.render(canvas, size);
  }

  move(x, y) {
    super.move(x, y);
    this.textureNo = (sign(y) + 1) * 3 + sign(x) + 1;
  }
}