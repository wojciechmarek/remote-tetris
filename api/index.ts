const cors = require("cors");
const express = require("express");
const http = require("http");

//an instance of the Express.js application is created and assigned to the constant
const app = express();
app.use(cors());

const server = http.createServer(app);

//imports the Socket.IO library and assigns it to the constant socketIO.
const socketIO = require("socket.io");
//a new Socket.IO server instance is created by passing the server instance to the socketIO() function and assigning it to the constant io.
const io = socketIO(server, {
  cors: {
    origin: "https://web-rtc-tetris.vercel.app",
    methods: ["GET", "POST"],
  },
});

//an event listener is set up for new WebSocket connections and passes a socket object that represents the connection.
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    //The received message is broadcasted to all connected clients using the emit() method of the io object.
    io.emit("message", data);
  });
  //an event listener is set up for when a client disconnects.
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/hello", function (req, res, next) {
  const message = "Hello from endpoint";
  res.send(JSON.stringify(message));
});

server.listen(80, () => {
  console.log("Server listening on port 80");
});
