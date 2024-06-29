import { io } from "socket.io-client";

export const WebSocketUtils = () => {
  const server = import.meta.env.VITE_SERVER_URL;
  const socket = io(server);

  const emitIdAndOfferAndIceCandidatesToServer = async (
    id: string,
    offer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidateInit[]
  ) => {
    const payload = JSON.stringify({
      id,
      offer,
      iceCandidates
    });

    socket.emit("idOfferIceCandidates", payload);
  };

  const subscribeForAnswerAndIceCandidatesFromServer = callback => {
    socket.on("answerIceCandidates", async result => {
      callback({
        answer: result.answer,
        iceCandidates: result.iceCandidates
      });
    });
  };

  return {
    emitIdAndOfferAndIceCandidatesToServer,
    subscribeForAnswerAndIceCandidatesFromServer
  };
};
