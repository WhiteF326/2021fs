function rand(n) {
  return Math.floor(Math.random() * n);
}

function makeMaze(width, height) {
  let stage = [];
  for (let y = 1; y < height + 1; y++) {
    stage[y] = [];
    for (let x = 1; x < width + 1; x++) {
      if (y == 1 || y == height || x == 1 || x == width) {
        stage[y][x] = 1;
      }
      else if (y % 2 == 1 && x % 2 == 1) {
        stage[y][x] = 1;
      }
      else {
        stage[y][x] = 0;
      }
    }
  }
  for (let y = 3; y < height; y += 2) {
    for (let x = 3; x < width; x += 2) {
      const direction = ["right", "down"];
      if (y == 3) {
        direction.push("up");
      }
      if (stage[y][x - 1] == 0) {
        direction.push("left");
      }
      switch (direction[rand(direction.length)]) {
        case "up":
          stage[y - 1][x] = 1;
          break;
        case "right":
          stage[y][x + 1] = 1;
          break;
        case "down":
          stage[y + 1][x] = 1;
          break;
        case "left":
          stage[y][x - 1] = 1;
          break;
      }
    }
  }
  // 入口と出口を作成
  stage[1][2] = 0;
  stage[height][width - 1] = 0;
  return stage;
}

const mapX = 45, mapY = 45;
st = makeMaze(mapY, mapX);
let tmp = [];
for(let i = 0; i < mapX + 2; i++) tmp.push(1);
st[0] = tmp; st.push(tmp);
for (let i = 0; i <= mapY + 1; i++) {
  let tmp = "";
  for (let j = 1; j <= mapX; j++) tmp += (st[i][j] ? "#" : ".");
  console.log(tmp);
}