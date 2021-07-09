/*
  コマンド一覧

  //move (u, r, l, d) (移動量の整数)
*/

// 以下に問題を追加
const problemList = {
  0: {
    "stagename": "test1",
    "height": 9,
    "width": 9,
    "stage": [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 2, 0, 3, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
}
/*
  マップは0:壁 1:床 2:プレイヤー初期位置 3:ゴール
  stagenameはリストボックスに表示される文字列
  height, widthはマップデータの高さと幅
    stageより小さい場合stageの一部が無視され、
    stageより大きい場合エラーが出るので注意
    正方形じゃないとバグるので修正予定
*/

window.onload = function () {
  // 右クリックを無効にする
  addEventListener("contextmenu", e => {
    e.preventDefault();
  });

  // リストボックスに要素を追加
  for (let key in problemList) {
    probListElement = document.createElement("option");
    probListElement.appendChild(document.createTextNode(problemList[key].stagename));
    probListElement.value = key;
    document.getElementById("fileSelector").appendChild(probListElement);
  }

  // ファイル選択ボタン押下
  document.getElementById("fileChange").addEventListener("click", () => {
    // マップ取得
    const writeStage = problemList[document.getElementById("fileSelector").value];
    // そのままだと反時計回りに90度回転して表示されるため、回転処理
    // TODO マップが正方形じゃないと多分ここの処理でバグる
    let x = [];
    for (let c = 0; c < writeStage.width; c++) {
      x[c] = [];
      for (let r = 0; r < writeStage.height; r++) {
        x[c][r] = writeStage.stage[r][writeStage.width - 1 - c];
      }
    }
    writeStage.stage = x;

    // 盤面とプレイヤーのオブジェクト生成
    const robotStage = new RobotStage(writeStage.width, writeStage.height, 64, "materials/back.png");
    const player = new Sprite({
      "down": "materials/knt_down.png",
      "left": "materials/knt_left.png",
      "right": "materials/knt_right.png",
      "up": "materials/knt_up.png"
    }, "Player", "up");

    // 盤面上にspriteを生成してrobotStageに渡す
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

    // キー入力時
    addEventListener("keydown", e => {
      if (e.code == "ArrowLeft") {
        robotStage.movePlayer(-1, 0);
        player.setvector("left");
      }
      if (e.code == "ArrowUp") {
        robotStage.movePlayer(0, -1);
        player.setvector("up");
      }
      if (e.code == "ArrowRight") {
        robotStage.movePlayer(1, 0);
        player.setvector("right");
      }
      if (e.code == "ArrowDown") {
        robotStage.movePlayer(0, 1);
        player.setvector("down");
      }
    });

    // ファイル選択ボタンを削除
    document.getElementById("inside").remove();

    // コード実行領域を作成
    const runcode = document.createElement("textarea");
    runcode.id = "runcode";
    document.body.appendChild(runcode);
    const runbtn = document.createElement("button");
    runbtn.appendChild(document.createTextNode("実行"));
    document.body.appendChild(runbtn);
    runbtn.addEventListener("click", () => {
      // evaluate code
      runcode.value.split("\n").forEach(line => {
        console.log(line);
        if (line.startsWith("//move")) {
          let vec = line.split(" ")[1];
          let amt = Number(line.split(" ")[2]);

          switch (vec) {
            case "l":
              robotStage.movePlayer(-amt, 0);
              player.setvector("left");
              break;

            case "u":
              robotStage.movePlayer(0, -amt);
              player.setvector("up");
              break;

            case "r":
              robotStage.movePlayer(amt, 0);
              player.setvector("right");
              break;

            case "d":
              robotStage.movePlayer(0, amt);
              player.setvector("down");
              break;

            default:
              break;
          }
        }
      });
    });
  });
}