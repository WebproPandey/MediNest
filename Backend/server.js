const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { socketConnection } = require("./sockets/consultationSocket");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ADMIN_ORIGIN, process.env.USER_ORIGIN],
    credentials: true,
  },
});

// Attach io instance to app
app.set("io", io);

// Initialize Socket.IO events
socketConnection(io);

server.listen(PORT, () => {
  console.log(`✅ Server is listening at port ${PORT}`);
});
