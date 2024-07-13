import type { ControllerConnectionAnswer } from "@models/controller-connection-answer";
import type { GameConnectionOffer } from "@models/game-connection-offer";

export const ApiUtils = () => {
  const url = import.meta.env.VITE_SERVER_HTTP_URL;

  const getGameConnectionOfferFromTheServer = async (id: string) => {
    const data = await fetch(`${url}/offer/${id}`, {
      method: "GET"
    })

    const result  = await data.json() as GameConnectionOffer;
    return result;
  };

  const postControllerConnectionAnswerToTheServer = async (
    id: string,
    answer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidate[]
  ) => {

    const controllerConnectionAnswer: ControllerConnectionAnswer = {
      id: id,
      type: "controller-connection-answer",
      answer: answer,
      iceCandidates: iceCandidates
    };

    await fetch(`${url}/answer/${id}`, {
      method: "POST",
      body: JSON.stringify(controllerConnectionAnswer),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  return {
    getGameConnectionOfferFromTheServer,
    postControllerConnectionAnswerToTheServer
  };
};
