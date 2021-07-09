'use strict';

class RobotStage {
  constructor(width, height, cellsize, backsrc) {
    this.writeElement = document.getElementById("robo");

    this.width = width;
    this.height = height;
    this.cellsize = cellsize;

    this.hasPlayer = false;
    this.playerX = 0;
    this.playerY = 0;

    this.pendingMove = [];
    this.moveSpeedPerFrame = cellsize / 8;

    this.backChip = new Image();
    this.backChip.src = backsrc;

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
    
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        ctx.drawImage(
          this.backChip,
          0, 0,
          this.backChip.naturalWidth, this.backChip.naturalHeight,
          j * this.cellsize, i * this.cellsize,
          this.cellsize, this.cellsize
        );
      }
    }

    if(this.hasPlayer && this.pendingMove.length > 0){
      // move direction at this time
      let mdx = 0, mdy = 0;
      const xMaxMove = Math.min(this.moveSpeedPerFrame, Math.abs(this.pendingMove[0][0]));
      const yMaxMove = Math.min(this.moveSpeedPerFrame, Math.abs(this.pendingMove[0][1]));
      if(this.pendingMove[0][0] > 0) mdx = 1 * xMaxMove;
      else if(this.pendingMove[0][0] < 0) mdx = -1 * xMaxMove;
      if(this.pendingMove[0][1] > 0) mdy = 1 * yMaxMove;
      else if(this.pendingMove[0][1] < 0) mdy = -1 * yMaxMove;

      this.stage[this.playerX][this.playerY].move(mdx, mdy);
      this.pendingMove[0][0] -= mdx, this.pendingMove[0][1] -= mdy;
      if(!this.pendingMove[0][0] && !this.pendingMove[0][1]){
        this.pendingMove.shift();
      }
    }

    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++){
        if(this.stage[i][j]){
          this.stage[i][j].render(ct, this.cellsize);
        }
      }
    }

    requestAnimationFrame(this._mainLoop.bind(this));
  }

  add(obj, x, y){
    obj.move(x * this.cellsize, y * this.cellsize);
    this.stage[x][y] = obj;
    
    if(obj.gettype() == "Player"){
      this.playerX = x, this.playerY = y;
      this.hasPlayer = true;
    }
  }

  movePlayer(vx, vy){
    const tx = this.playerX + vx;
    const ty = this.playerY + vy;
    if(tx >= 0 && tx < this.width && ty >= 0 && ty < this.height){
      //  move player
      if(this.stage[tx][ty]){
        if(this.stage[tx][ty].gettype() == "Goal"){
          this.stage[tx][ty] = null;
          this.pendingMove.push([vx * this.cellsize, vy * this.cellsize]);
          const tmp = this.stage[this.playerX][this.playerY];
          this.stage[this.playerX][this.playerY] = this.stage[tx][ty];
          this.stage[tx][ty] = tmp;
          this.playerX = tx;
          this.playerY = ty;
          alert("goal");
        }
      }else{
        this.pendingMove.push([vx * this.cellsize, vy * this.cellsize]);
        const tmp = this.stage[this.playerX][this.playerY];
        this.stage[this.playerX][this.playerY] = this.stage[tx][ty];
        this.stage[tx][ty] = tmp;
        this.playerX = tx;
        this.playerY = ty;
      }
    }
  }
}