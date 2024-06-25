<script lang="ts">
  import { onMount } from "svelte";
  import Nintendo from "../components/controller/Nintendo.svelte";
  import Status from "../components/controller/Status.svelte";
  import Warning from "../components/controller/Warning.svelte";
  import { server } from "../config";

  export const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  });

  export let id: string;

  let isStatsBarVisible = true;
  let remoteIp = "";

  const handleOnStatsBarVisibleChange = () => {
    if (isStatsBarVisible) {
      isStatsBarVisible = false;
      return;
    }

    isStatsBarVisible = true;
  };

  const getOfferAndIceCandidatesByIdFromTheServer = async () => {
    const data = await fetch(`${server}/offer/${id}`, {
      method: "GET"
    });

    const result = await data.json();
    return result;
  };

  const setOfferToWebRCTPeer = async (offer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(offer);
  };

  const setIceCandidatesToWebRCTPeer = async (ices: RTCIceCandidateInit[]) => {
    ices.forEach(async (item) => {
      await peer.addIceCandidate(item);
    });
  };

  const generateTheAnswer = async () => {
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const postTheAnswerAndIceCandidatesToTheServer = async (
    id: string,
    answer: RTCSessionDescriptionInit
  ) => {
    const payload = { answer, iceCandidates };
    console.warn(payload);

    await fetch(`${server}/answer/${id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  onMount(async () => {
    const result = await getOfferAndIceCandidatesByIdFromTheServer();
    await setOfferToWebRCTPeer(result.offer);
    await setIceCandidatesToWebRCTPeer(result.iceCandidates);

    calculateRemoteIpAddress(result.iceCandidates);

    const answer = await generateTheAnswer();

    setTimeout(async () => {
      await postTheAnswerAndIceCandidatesToTheServer(id, answer);
    }, 1000);
  });

  const calculateRemoteIpAddress = (ices: any[]) => {
    const remoteCandidate = ices.find((ice) => ice.candidate.includes("raddr"));
    remoteIp = remoteCandidate.candidate.split(" ")[4];
  };

  let dataChannel: RTCDataChannel;

  peer.ondatachannel = (event) => {
    dataChannel = event.channel;
    dataChannel.onopen = () => {
      // status = "Data channel open!";
    };
    dataChannel.onmessage = (event) => {
      // handle
    };
  };

  const iceCandidates: RTCIceCandidate[] = [];

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  peer.onconnectionstatechange = function (event) {
    if (peer.connectionState === "connected") {
      // handle
    }
  };

  const handleOnButtonPress = (event: CustomEvent) => {
    if (dataChannel) {
      dataChannel.send(event.detail);
    }
  };
</script>

<div class="controller__container">
  <Status connectedTo={remoteIp} />
  <div class="controller__nintendo">
    <Nintendo on:buttonPress={handleOnButtonPress} />
  </div>
  <div class="controller__orientation-warning">
    <Warning />
  </div>
</div>

<style>
  .controller__container {
    width: 100%;
    height: 100vh;
    background-color: white;
    position: relative;
  }

  .controller__nintendo {
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: none;
    }
  }

  .controller__orientation-warning {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: flex;
    }
  }
</style>
