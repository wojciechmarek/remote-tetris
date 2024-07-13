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

  console.info("[GET Endpoint] Queried for a game-connection-offer: ", id);
  res.send(result.offer);
});

app.post("/answer/:id", function(req, res, next) {
  const data = req.body;

  const id = data.id;
  const { connection } = offerAndConnections.find(item => item.offer.id === id);

  connection.send(JSON.stringify(data));

  console.info(
    "[POST Endpoint] Received a new controller-connection-answer: ",
    id
  );

  setTimeout(() => {
    offerAndConnections = offerAndConnections.filter(
      item => item.offer.id !== id
    );

    connection.close();
    console.info("[WebSocket] Successfully closed the connection.", id);
    console.info(
      "[Database] Successfully removed the offer and connection with id: ",
      id
    );
    console.info(
      "[Database] Waiting game-connection-offers in the database: ",
      offerAndConnections.length
    );
  }, 5000);

  res.end();
});
//#endregion

//#endregion WebSocket listeners
wss.on("connection", (ws, req) => {
  console.info("[WebSocket] A new connection established");
  console.info("[WebSocket] Connected IP: ", req.rawHeaders[13]);
  console.info("[WebSocket] Used browser: ", req.rawHeaders[9]);

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

    console.info(
      "[WebSocket] Received a new game-connection-offer: ",
      message.id
    );
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
