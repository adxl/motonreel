const socketio = require("socket.io");
const db = require("../db").db;

const { message: Message, salonMessage: SalonMessage } = db;

const { getUser } = require("../middlewares/auth");

const DOMAINS = {
  COMM_REQUEST: "/commRequests",
  SALONS: "/salons",
  PRIVATE: "/private",
};

async function userFetcher(socket, next) {
  const { token } = socket.handshake.auth;
  socket.user = await getUser(token);
  next();
}

module.exports = (server) => {
  const io = socketio(server);

  io.of(DOMAINS.SALONS)
    .use(userFetcher)
    .on("connection", (socket) => {
      const { user } = socket;
      const { name: userName, id: userId } = user;

      socket.on("join", (room) => {
        socket.join(room);
        console.log(`--> ${userName} JOINED room ${room}`);
      });

      socket.on("message", (message) => {
        const { room, content } = message;
        Message.create({ content, sender: userId }).then((msg) => {
          SalonMessage.create({ SalonId: room, MessageId: msg.id });
          socket.to(room).emit("message");
          console.log(`--- ${userName} says : "${content}" in room ${room}`);
        });
      });

      socket.on("disconnect", () =>
        console.log(`<<< ${userName} disconnected`)
      );
    });
};