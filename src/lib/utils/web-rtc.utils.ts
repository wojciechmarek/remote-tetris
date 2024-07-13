export const WebRTCUtils = () => {
  //#region Peer Object Configuration
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  });
  //#endregion

  //#region Public Values
  let isDataChannelOpen = false;
  let dataChannel: RTCDataChannel;
  //#endregion

  //#region Variables
  const iceCandidates: RTCIceCandidate[] = [];
  let onMessageEvent: (message: string) => void
  let onChannelOpen: (isOpen: boolean) => void
  //#endregion

  //#region Events Listeners
  peer.ondatachannel = event => {
    dataChannel = event.channel;
    dataChannel.onopen = () => {
      // status = "Data channel open!";
    };
    dataChannel.onmessage = event => {
      // handle
    };
  };

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  peer.onconnectionstatechange = function(event) {
    if (peer.connectionState === "connected") {
      // handle
    }
  };
  //#endregion

  //#region Public Methods
  const initNewWebRTCPeer = async () => {
    dataChannel = peer.createDataChannel("controller");

    dataChannel.onopen = (event: Event) => {
      onChannelOpen(true);
    };

    dataChannel.onmessage = (event: MessageEvent) => {
      onMessageEvent(event.data)
    };

    dataChannel.onclose = (event: Event) => {
      onChannelOpen(false);
    };


    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    return offer;
  };

  const initWebRTCPeerBasedOnOfferAndIceCandidates = async ({
    offer,
    iceCandidates
  }: {
    offer: RTCSessionDescriptionInit;
    iceCandidates: RTCIceCandidateInit[];
  }) => {
    await setOfferToThePeer(offer);
    await setIceCandidatesToThePeer(iceCandidates);

    const answer = await generateTheAnswer();
    return answer;
  };

  const sendKeyIdThoughtChannel = (keyId: string) => {
    if (dataChannel) {
      dataChannel.send(keyId);
    }
  };

  const calculateRemoteIpAddress = (iceCandidates: RTCIceCandidate[]) => {
    const remoteCandidate = iceCandidates.find(ice =>
      ice.candidate.includes("raddr")
    );
    const remoteIp = remoteCandidate?.candidate.split(" ")[4];
    return remoteIp;
  };

  const getIceCandidates = () => {
    return iceCandidates;
  };

  const setOfferToThePeer = async (offer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(offer);
  };

  const setIceCandidatesToThePeer = async (
    iceCandidates: RTCIceCandidateInit[]
  ) => {
    iceCandidates.forEach(async item => {
      await peer.addIceCandidate(item);
    });
  };

  const subscribeForButtonPressFromRemoteController = callback => {
    onMessageEvent = callback;
  };

  const subscribeForChannelOpenFromRemoteController = callback => {
    onChannelOpen = callback;
  }
  //#endregion

  //#region Private Methods
  const generateTheAnswer = async () => {
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };
  //#endregion

  return {
    
    initNewWebRTCPeer,
    initWebRTCPeerBasedOnOfferAndIceCandidates,
    getIceCandidates,
    sendKeyIdThoughtChannel,
    calculateRemoteIpAddress,
    setOfferToThePeer,
    setIceCandidatesToThePeer,
    subscribeForButtonPressFromRemoteController,
    subscribeForChannelOpenFromRemoteController
  };
};
