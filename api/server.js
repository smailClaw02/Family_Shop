const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { port } = require("./config");

server.use(cors());

const filesController = require("./controllers/files");
const ordersController = require("./controllers/orders");

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// Add custom middleware before JSON Server router
filesController(server);
ordersController(server);
 
server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.created_at = Date.now();
  }
  // Continue to JSON Server router
  next();
});
server.listen(port, () => {
  console.log("JSON Server is running");
  console.log("server url : http://localhost:" + port);
});
