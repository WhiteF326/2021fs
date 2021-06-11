// server.js

import { Server } from "https://js.sabae.cc/Server.js";

class body extends Server {
  async api(path, prm) {
    let retobj = null;
    console.log(prm);
    switch (path.split("/")[2]) {
      case "":
        break;

      // コンテスト情報の取得
      case "problem":
        if (path.split("/")[3] == "all") {
          retobj = [];
          for await (const dirEntry of Deno.readDir("problem")) {
            retobj.push(dirEntry);
          }
        } else if (path.split("/")[3] == "search") {
          retobj = await Deno.readTextFile("./problem/" + prm.name);
          retobj = JSON.parse(retobj);
        }
        break;

      case "language":
          if (path.split("/")[3] == "list") {
            retobj = await Deno.readTextFile("./lib/languages.json");
          } else if (path.split("/")[3] == "getName") {
            const languageListText = await Deno.readTextFile("./lib/languages.json");
            const languageList = JSON.parse(languageListText);
            const langName = languageList.find(r => r.id == prm.languageId).name;
            retobj = langName;
          }
          break;

      default:
        break;
    }
    return retobj;
  }
}

new body(810);
