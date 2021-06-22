'use strict';

class MapChip extends BasicSprite {
  constructor(img, textureNo) {
    super(img);
    this.textureNo = textureNo;
  }

  render(canvas, size) {
    if (this.textureNo != 15) super.render(canvas, size);
  }

  move(x, y) {
    super.move(x, y);
  }
}