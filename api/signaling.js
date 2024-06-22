import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

server.on("request", (req, res) => {
  res.writeHead(426, { "Content-Type": "text/plain" });
  res.end("Upgrade required");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
