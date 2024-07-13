export type ControllerConnectionAnswer = {
  id: string;
  type: string;
  answer: RTCSessionDescriptionInit;
  iceCandidates: RTCIceCandidateInit[];
};
