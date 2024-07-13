import http from "http";
import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";

//#region HTTP Server init
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);
const server = http.createServer(app);
//#endregion

//#region WebSocket Server init
const wss = new WebSocketServer({ server });
//#endregion

//#region In memory database
let offerAndConnections = [];
//#endregion

// ------------------

//#region HTTP Endpoints
app.get("/offer/:id", function(req, res, next) {
  const id = req.params.id;
  const result = offerAndConnections.find(item => item.offer.id === id);
  res.send(result.offer);
});

app.post("/answer/:id", function(req, res, next) {
  const data = req.body;

  const id = data.id;
  const { connection } = offerAndConnections.find(item => item.offer.id === id);

  connection.send(JSON.stringify(data));

  setTimeout(() => {
    offerAndConnections = offerAndConnections.filter(
      item => item.offer.id !== id
    );

    console.log("Successfully removed the offer and connection with id: ", id);
    console.log(
      "Waiting offers and connections in the database: ",
      offerAndConnections.length
    );
  }, 5000);

  res.end();
});
//#endregion

//#endregion WebSocket listeners
wss.on("connection", ws => {
  ws.on("message", msg => {
    const message = JSON.parse(msg.toString());

    if (message.type !== "game-connection-offer") {
      return;
    }

    const offerAndConnection = {
      offer: message,
      connection: ws
    };

    offerAndConnections.push(offerAndConnection);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
