'use strict';

class RobotStage {
  constructor(width, height, cellsize) {
    this.writeElement = document.getElementById("robo");

    this.width = width;
    this.height = height;
    this.cellsize = cellsize;

    this.hasPlayer = false;
    this.playerX = 0;
    this.playerY = 0;

    this.pendingMoveX = 0;
    this.pendingMoveY = 0;
    this.moveSpeedPerFrame = 4;

    this.stage = [];
    this.stageCanvas = document.createElement("canvas");
    this.stageCanvas.id = "roboCanvas";
    this.stageCanvas.style.border = "1px solid black";
    this.stageCanvas.style.margin = "10px";
    this.stageCanvas.width = this.width * this.cellsize || 320;
    this.stageCanvas.height = this.height * this.cellsize || 320;

    for (let i = 0; i < height; i++) {
      this.stage.push([]);
      for (let j = 0; j < width; j++) {
        this.stage[i].push(null);
      }
    }

    this.writeElement.appendChild(this.stageCanvas);

    this._mainLoop();
  }

  _mainLoop() {
    const ct = document.getElementById("roboCanvas");
    const ctx = ct.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ct.width, ct.height);

    if(this.hasPlayer){
      // move direction at this time
      let mdx = 0, mdy = 0;
      if(this.pendingMoveX > 0) mdx = 1 * this.moveSpeedPerFrame;
      else if(this.pendingMoveX < 0) mdx = -1 * this.moveSpeedPerFrame;
      if(this.pendingMoveY > 0) mdy = 1 * this.moveSpeedPerFrame;
      else if(this.pendingMoveY < 0) mdy = -1 * this.moveSpeedPerFrame;

      this.stage[this.playerX][this.playerY].move(mdx, mdy);
      this.pendingMoveX -= mdx, this.pendingMoveY -= mdy;
    }

    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++){
        if(this.stage[i][j]){
          this.stage[i][j].render(ct, this.cellsize, this.cellsize);
        }
      }
    }

    requestAnimationFrame(this._mainLoop.bind(this));
  }

  add(obj, x, y, isPlayer){
    this.stage[x][y] = obj;
    if(isPlayer){
      this.playerX = x, this.playerY = y;
      this.hasPlayer = true;
    }
  }

  movePlayer(vx, vy){
    const tx = this.playerX + vx;
    const ty = this.playerY + vy;
    if(tx >= 0 && tx < this.width && ty >= 0 && ty < this.height){
      //  move player
      this.pendingMoveX += vx * this.cellsize;
      this.pendingMoveY += vy * this.cellsize;
      const tmp = this.stage[this.playerX][this.playerY];
      this.stage[this.playerX][this.playerY] = this.stage[tx][ty];
      this.stage[tx][ty] = tmp;
      this.playerX = tx;
      this.playerY = ty;
    }
  }
}