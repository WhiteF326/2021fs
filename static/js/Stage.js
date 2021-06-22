'use strict';

function zfill(value, digit){
  return (Array(digit).join("0") + value).slice(-digit);
}

function transpose(array) {
  const ROW = array.length;
  const COL = array[0].length;
  const a = [];//new Array(COL);
  for (let c=0; c<COL; c++) {
    a[c] = [];//new Array(ROW);
    for (let r=0; r<ROW; r++) {
      a[c][r] = array[r][c];
    }
  }
  return a;
};

class Stage {
  constructor(stageData, writeElementId) {
    this.writeElement = document.getElementById(writeElementId);

    this.width = stageData.width;
    this.height = stageData.height;
    this.cellsize = 32;

    this.stage = stageData.layer;
    this.layerAmount = stageData.layerAmount;
    this.mapChip = "materials/mapchip/";

    this.stageCanvas = document.createElement("canvas");
    this.stageCanvas.id = "stageCanvas";
    this.stageCanvas.style.border = "1px solid black";
    this.stageCanvas.margin = "10px";
    this.stageCanvas.width = this.width * this.cellsize || 320;
    this.stageCanvas.height = this.height * this.cellsize || 320;

    this.Sprites = [];
    for (let h = 0; h < this.layerAmount; h++) {
      this.stage[h] = transpose(this.stage[h]);
      this.Sprites.push([]);
      for (let i = 0; i < this.height; i++) {
        this.Sprites[h].push([]);
        for (let j = 0; j < this.width; j++) {
          if(this.stage[h][i][j][0] > 0){
            const mc = new MapChip("materials/mapchip/" + zfill(this.stage[h][i][j][0], 4) + ".png", )
            this.Sprites[h][i].push(mc);
            mc.move(i * this.cellsize, j * this.cellsize);
          }
        }
      }
    }

    this.player = new Player("../materials/player.png");
    this.player.move(stageData.player[0] * this.cellsize, stageData.player[1] * this.cellsize);
    this.writeElement.appendChild(this.stageCanvas);
    console.log(this.Sprites);
    this._mainLoop();
  }

  _mainLoop() {
    // const ctx = this.stageCanvas.getContext('2d');

    for (let h = 0; h < this.layerAmount; h++) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          if (this.Sprites[h][i][j]) {
            this.Sprites[h][i][j].render(this.stageCanvas, this.cellsize);
          }
        }
      }
    }

    requestAnimationFrame(this._mainLoop.bind(this));
  }
}