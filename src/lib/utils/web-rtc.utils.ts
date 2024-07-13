export const WebRTCUtils = () => {
  //#region Peer Object Configuration
  const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.l.google.com:5349" },
      { urls: "stun:stun1.l.google.com:3478" },
      { urls: "stun:stun1.l.google.com:5349" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:5349" },
      { urls: "stun:stun3.l.google.com:3478" },
      { urls: "stun:stun3.l.google.com:5349" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:5349" }
    ]
  });
  //#endregion

  //#region Public Values
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
    dataChannel.onopen = (ev: Event) => {
      console.log("[Data Channel Open]", ev);
    };
    dataChannel.onmessage = (ev: MessageEvent) => {
      console.log("[Data Channel Message]", ev);
    };
    dataChannel.onerror = (ev: Event) => {
      console.log("[Data Channel Error]", ev);
    };
    dataChannel.onclose = (ev: Event) => {
      console.log("[Data Channel Close]", ev);
    };
    dataChannel.onbufferedamountlow = (ev: Event) => {
      console.log("[Data Channel onbufferedamountlow]", ev);
    };
    dataChannel.onclosing = (ev: Event) => {
      console.log("[Data Channel onclosing]", ev);
    };
  };

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    console.log("[Data Channel onicecandidate]", event);
    if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  peer.onconnectionstatechange = function(event) {
    console.log("[Data Channel onconnectionstatechange]", event);
    if (peer.connectionState === "connected") {
      // handle
    }
  };

  peer.onsignalingstatechange = function(event) {
    console.log("[Data Channel onsignalingstatechange]", event);
  };

  peer.onicecandidateerror = function(event) {
    console.log("[Data Channel onicecandidateerror]", event);
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

  const initWebRTCPeerBasedOnOfferAndIceCandidates = async (
    offer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidateInit[]
  ) => {
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

  const calculateRemoteIpAddress = (iceCandidates: RTCIceCandidateInit[]) => {
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

  const closeTheCurrentWebRTCConnection = () => {
    if(peer.connectionState === "connected") {
      peer.close();
    }
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
    subscribeForChannelOpenFromRemoteController,
    closeTheCurrentWebRTCConnection
  };
};
