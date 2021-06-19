import { fetchJSON } from "https://code4sabae.github.io/js/fetchJSON.js";

let fileLib = {};

window.onload = async function () {
  addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  
  const fileList = await fetchJSON("api/stage/list", {});
  fileList.forEach(async r => {
    const fileData = await fetchJSON("api/stage/search", { name: r.name });
    const fileListElement = document.createElement("option");
    fileListElement.appendChild(document.createTextNode(fileData.stagename));
    fileListElement.value = r.name;
    fileLib[r.name] = fileData;
    document.getElementById("fileSelector").appendChild(fileListElement);
  });

  document.getElementById("fileChange").addEventListener("click", () => {
    // server connection
    const writeStage = fileLib[document.getElementById("fileSelector").value];
    for (let i = 0; i < 2; i++) {
      let x = [];
      for (let c = 0; c < writeStage.width; c++) {
        x[c] = [];
        for (let r = 0; r < writeStage.height; r++) {
          x[c][r] = writeStage.stage[r][writeStage.width - 1 - c];
        }
      }
      writeStage.stage = x;
    }

    const robotStage = new RobotStage(writeStage.width, writeStage.height, 64, "materials/back.png");
    const player = new Sprite({
      "down": "materials/knt_down.png",
      "left": "materials/knt_left.png",
      "right": "materials/knt_right.png",
      "up": "materials/knt_up.png"
    }, "Player", "up");

    for (let i = 0; i < writeStage.width; i++) {
      for (let j = 0; j < writeStage.height; j++) {
        switch (writeStage.stage[i][j]) {
          case 0:
            // wall
            const wall = new Sprite("materials/wall.png", "Wall");
            robotStage.add(wall, i, j);
            break;
          case 1:
            // floor
            break;
          case 2:
            // player
            robotStage.add(player, i, j);
            break;
          case 3:
            // goal
            const goal = new Sprite("materials/goal.png", "Goal");
            robotStage.add(goal, i, j);
            break;
          default:
            // none
            break;
        }
      }
    }

    addEventListener("keydown", e => {
      if (e.keyCode == 37) {
        robotStage.movePlayer(-1, 0);
        player.setvector("left");
      }
      if (e.keyCode == 38) {
        robotStage.movePlayer(0, -1);
        player.setvector("up");
      }
      if (e.keyCode == 39) {
        robotStage.movePlayer(1, 0);
        player.setvector("right");
      }
      if (e.keyCode == 40) {
        robotStage.movePlayer(0, 1);
        player.setvector("down");
      }
    });

    document.getElementById("inside").remove();
  });
}