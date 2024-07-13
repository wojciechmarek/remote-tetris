import type { ControllerConnectionAnswer, GameConnectionOffer } from "@models/index";

export const WebSocketUtils = () => {
  const url = import.meta.env.VITE_SERVER_WEB_SOCKET_URL;
  const ws = new WebSocket(url);

  ws.onerror = error => console.error(error);
  ws.onopen = event => console.info(event);

  const sendGameConnectionOfferToTheServer = async (
    id: string,
    offer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidateInit[]
  ) => {

    const gameConnectionOffer: GameConnectionOffer = {
      type: "game-connection-offer",
      id: id,
      date: Date.now(),
      offer: offer,
      iceCandidates: iceCandidates
    }

    setTimeout(() => {
      ws.send(JSON.stringify(gameConnectionOffer));
    }, 1000);

  };

  const subscribeForControllerConnectionAnswerFromTheServer = callback => {
    ws.onmessage = message => {      
      const controllerConnectionAnswer = JSON.parse(message.data) as ControllerConnectionAnswer;

      if (controllerConnectionAnswer.type !== "controller-connection-answer") {
        return;
      }

      callback(controllerConnectionAnswer);
    }
  };

  return {
    sendGameConnectionOfferToTheServer,
    subscribeForControllerConnectionAnswerFromTheServer
  };
};
