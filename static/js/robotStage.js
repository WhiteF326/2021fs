'use strict';

class RobotStage {
  constructor(width, height, cellsize) {
    this.writeElement = document.getElementById("robo");

    this.width = width;
    this.height = height;
    this.cellsize = cellsize;

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
        this.stage[i].push(0);
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

    requestAnimationFrame(this._mainLoop.bind(this));
  }
}