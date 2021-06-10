// server.js

import { Server } from "https://js.sabae.cc/Server.js";

class body extends Server {
  async api(path, prm) {
    return "test";
  }
}

new body(810);
