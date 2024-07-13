export type GameConnectionOffer = {
  type: string;
  id: string;
  date: number;
  offer: RTCSessionDescriptionInit;
  iceCandidates: RTCIceCandidateInit[];
};
