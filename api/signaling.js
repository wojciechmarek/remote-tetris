import WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log("Signaling server running on ws://localhost:8080");
