require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const auth = require("./middlewares/auth");
const crypto = require("crypto");

const corsConfig = {
  origin: "http://localhost:3000",
};
app.use(cors(corsConfig));

// Parsing body content to json
app.use(express.json());

/* Salon Routes */

const salons = require("./controllers/salon.controller");

app.post("/salons/create", auth, salons.create);

app.get("/salons", auth, salons.findAll);

app.get("/salons/:id", auth, salons.findOne);

app.patch("/salons/:id", auth, salons.update);

app.delete("/salons/:id", auth, salons.delete);

/* User Routes */

const users = require("./controllers/users.controller");

app.post("/register", users.create);

app.post("/login", users.login);

app.get("/me", auth, users.findOneByToken);

app.get("/advisors", auth, users.findAdvisors);

app.patch("/users/:id", auth, users.update);

// User / Salon Routes

app.post("/users/addSalon", auth, users.addSalon);

app.post("/users/removeSalon", auth, users.removeSalon);

/* RendezVous Routes */

const rendezVous = require("./controllers/rendezVous.controller");

app.get("/rendezvous", auth, rendezVous.findAll);

app.post("/rendezvous/create", auth, rendezVous.create);

/* CommRequest Routes */

const commRequest = require("./controllers/commRequest.controller");

app.get("/commRequests", auth, commRequest.findAll);

app.get("/commRequests/:id", auth, commRequest.findOne);

app.post("/commRequests/create", auth, commRequest.create);

app.patch("/commRequests/:id", auth, commRequest.update);

/* Socket */
const initMessengerSocket = require("./controllers/socket.controller");
initMessengerSocket(server);

/* SSE */

const clients = [];

app.get("/events", (req, res) => {
  const id = crypto.randomBytes(16).toString("hex"); //req.user.token;

  clients.push({ id, res });

  console.log(clients.map((e) => e.id));

  req.on("close", () => {
    clients.filter((client) => {
      client.id !== id;
    });
  });
});

app.post("/notification", (req, res) => {
  const message = req.body.message;
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  for (let client of clients) {
    client.res.writeHead(200, headers);
    client.res.write(`data: ${message}\n\n`);
  }

  return res.sendStatus(204);
});

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
