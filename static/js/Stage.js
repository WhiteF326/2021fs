'use strict';

class Stage {
  constructor(stageData, writeElementId){
    this.writeElement = document.getElementById(writeElementId);

    this.width = stageData.width;
    this.height = stageData.height;
    this.cellsize = 32;

    this.stage = stageData.layer;
    this.layerAmount = stageData.layerAmount;
    this.mapChip = stageData.mapChip;

    this.stageCanvas = document.createElement("canvas");
    this.stageCanvas.id = "stageCanvas";
    this.stageCanvas.style.border = "1px solid black";
    this.stageCanvas.margin = "10px";
    this.stageCanvas.width = this.width * this.cellsize || 320;
    this.stageCanvas.height = this.height * this.cellsize || 320;
    
    this.Sprites = [];
    for(let h = 0; h < this.layerAmount; h++){
      this.Sprites.push([]);
      for (let i = 0; i < this.height; i++){
        this.Sprites[h].push([]);
        for (let j = 0; j < this.width; j++){
          this.Sprites[h][i].push(null);
        }
      }
    }

    this.writeElement.appendChild(this.stageCanvas);
  }
}