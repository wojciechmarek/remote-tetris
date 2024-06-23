import { Server } from "ws";

export default (req, res) => {
  const wss = new Server({ noServer: true });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log("Received message:", message);
      // Handle incoming messages from clients
    });

    ws.send("Connected to WebSocket server");
  });

  if (!res.socket.server) {
    console.log("Socket not available");
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    wss.emit("connection", ws, req);
  });
};
