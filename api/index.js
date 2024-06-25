import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const offersAndIceCandidates = [];
const answersAndIceCandidates = [];

let socketObj = undefined;

io.on("connection", socket => {
  socketObj = socket;

  socket.on("offerAndIceCandidates", offer => {
    offersAndIceCandidates.push(JSON.parse(offer));
  });

  socket.on("disconnect", () => {
    socketObj = undefined;
  });
});

app.get("/offer/:id", function(req, res, next) {
  const id = req.params.id;
  const result = offersAndIceCandidates.find(offer => offer.id === id);
  res.send(result);
});

app.post("/answer/:id", function(req, res, next) {
  const answerJson = {
    id: req.params.id,
    data: req.body
  };

  answersAndIceCandidates.push(answerJson);
  informInitiatorForNewAnswer(req.params.id);

  res.end();
});

const informInitiatorForNewAnswer = id => {
  const result = answersAndIceCandidates.find(answer => answer.id === id);
  socketObj.emit("answer", result.data);
};

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});

export default app;
