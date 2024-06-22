const { WebSocketServer } = require("ws");

let clients = [];

const signalingServer = new WebSocketServer({ noServer: true });

signalingServer.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

module.exports = (req, res) => {
  if (req.method === "GET") {
    if (
      req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() === "websocket"
    ) {
      signalingServer.handleUpgrade(
        req,
        req.socket,
        Buffer.alloc(0),
        onConnect
      );
    } else {
      res.status(426).send("Upgrade required");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

function onConnect(ws) {
  signalingServer.emit("connection", ws);
}
