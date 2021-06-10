const http = require("http");

const hostname="localhost";
const port = 810;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type" : "text/plain"});
  switch(req.url){
    case "/submit":
      msg = "submit";
      break;
    default:
      msg = "res";
      break;
  }
  res.write(msg);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});