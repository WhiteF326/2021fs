import { Server } from "https://js.sabae.cc/Server.js";


class body extends Server {
  async api(path, prm){
    console.log(path);
    let retobj = null;
    switch(path.split("/")[2]){
      case "stage":
        switch(path.split("/")[3]){
          case "list":
            retobj = [];
            for await (const dirEntry of Deno.readDir("stages")) {
              retobj.push(dirEntry);
            }
            break;
          
          case "search":
            retobj = await Deno.readTextFile("./stages/" + prm.name);
            retobj = JSON.parse(retobj);
            break;

          default:
            break;
        }
        break;
      
      default:
        break;
    }
    return retobj;
  }
}

new body(893);
