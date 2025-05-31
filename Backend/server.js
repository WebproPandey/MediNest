const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./app");
const {initializeSocket} =  require('./sockets/consultationSocket')
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// initializeSocket(server)

server.listen(PORT, () => {
  console.log(`✅ Server is listening at port ${PORT}`);
});
