export const ApiUtils = () => {
  const server = import.meta.env.VITE_SERVER_URL;

  const getOfferAndIceCandidatesByIdFromTheServer = async (id: string) => {
    const data = await fetch(`${server}/offer/${id}`, {
      method: "GET"
    });

    const result = await data.json();
    return result;
  };

  const postTheAnswerAndIceCandidatesToTheServer = async (
    id: string,
    answer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidate[]
  ) => {
    const payload = { answer, iceCandidates };

    await fetch(`${server}/answer/${id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  return {
    getOfferAndIceCandidatesByIdFromTheServer,
    postTheAnswerAndIceCandidatesToTheServer,
  }
}