<script lang="ts">
  import GameStartModal from "@components/modals/GameStartModal.svelte";
  import PauseModal from "@components/modals/PauseModal.svelte";
  import GameOverModal from "@components/modals/GameOverModal.svelte";
  import GameBoard from "@components/game-board/GameBoard.svelte";
  import backgroundImage from "@images/background.webp";
  import { io } from "socket.io-client";
  import { url, server } from "../config";

  import { v4 as uuidv4 } from "uuid";
  import { onMount } from "svelte";

  // ------- boolean values -------
  let isGameStartModalVisible = true;
  let isGameBoardVisible = false;
  let isPaused = false;
  let isGameOver = false;
  let isRemoteController = false;

  let id;
  let qrCodeValue;

  const generateNewIdAndNewQrCodeLink = () => {
    id = uuidv4();
    qrCodeValue = `${url}/${id}`;
  };

  export const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  });

  // ------ events handlers -------
  const handleOnRefreshQrCodeClick = async () => {
    generateNewIdAndNewQrCodeLink();
    await sendOfferAndIceCandidatesToServer();
  };

  const handleOnSelectKeyboardClick = () => {
    isGameStartModalVisible = false;
    isGameBoardVisible = true;
    isPaused = false;
    isGameOver = false;

    isRemoteController = true;
  };

  const handleOnQuitClick = () => {
    isGameStartModalVisible = true;
    isGameBoardVisible = false;
    isPaused = false;
    isGameOver = false;
  };

  const handleOnResumeClick = () => {
    isGameStartModalVisible = false;
    isGameBoardVisible = true;
    isPaused = false;
    isGameOver = false;
  };

  const handleOnGamePause = () => {
    isGameStartModalVisible = false;
    isGameBoardVisible = true;
    isPaused = true;
    isGameOver = false;
  };

  const handleOnGameOver = () => {
    isGameStartModalVisible = false;
    isGameBoardVisible = false;
    isPaused = true;
    isGameOver = true;
  };

  const handleOnNewGameClick = () => {
    handleOnSelectKeyboardClick();
  };

  let status = "";
  let dataChannel: RTCDataChannel;
  let buttonId: string;

  // ------ web rtc -------

  let offer: RTCSessionDescriptionInit;

  const configurePeer = async () => {
    dataChannel = peer.createDataChannel("chat");
    dataChannel.onopen = () => {
      status = "Data channel open!";
    };
    dataChannel.onmessage = (event) => {
      status = "Pressed button: " + event.data;
      buttonId = event.data;
      setTimeout(() => {
        buttonId = "";
      }, 50);
    };

    offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
  };

  const sendOfferAndIceCandidatesToServer = async () => {
    const payload = JSON.stringify({
      id,
      offer,
      iceCandidates
    });

    socket.emit("offerAndIceCandidates", payload);
  };

  peer.ondatachannel = (event) => {
    const receiveChannel = event.channel;
    receiveChannel.onopen = () => {
      status = "Data channel open!";
    };
    receiveChannel.onmessage = (event) => {
      status = "Pressed button: " + event.data;
      buttonId = event.data;
      setTimeout(() => {
        buttonId = "";
      }, 50);
    };
  };

  const iceCandidates: RTCIceCandidate[] = [];

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  peer.onconnectionstatechange = function (event: Event) {
    if (peer.connectionState === "connected") {
      status = "Connected!!!!";
    }
  };

  let value = "is connected ?";
  const socket = io(server);

  // ---- web socket.io -----
  const registerTheCallbackAnswerFromServer = () => {
    socket.on("answer", async (result) => {
      const asd = new RTCSessionDescription(result.answer);

      await peer.setRemoteDescription(asd);
      const ices = result.iceCandidates;
      ices.forEach(async (item) => {
        await peer.addIceCandidate(item);
      });

      //handleOnSelectKeyboardClick();
    });
  };

  // ------ on mount --------
  onMount(async () => {
    generateNewIdAndNewQrCodeLink();
    await configurePeer();
    registerTheCallbackAnswerFromServer();

    setTimeout(async () => {
      await sendOfferAndIceCandidatesToServer();
    }, 100);
  });
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="" />
  <div class="game__main-content">
    <p>{status}</p>
    {#if isGameStartModalVisible}
      <GameStartModal
        {qrCodeValue}
        on:refreshQrCodeClick={handleOnRefreshQrCodeClick}
        on:selectWasdKeysClick={handleOnSelectKeyboardClick}
      />
    {/if}

    {#if isGameBoardVisible}
      <GameBoard
        {isPaused}
        {isRemoteController}
        {buttonId}
        on:gamePause={handleOnGamePause}
        on:gameOver={handleOnGameOver}
      />
    {/if}

    {#if isPaused}
      <PauseModal
        on:onQuitClick={handleOnQuitClick}
        on:onResumeClick={handleOnResumeClick}
      />
    {/if}

    {#if isGameOver}
      <GameOverModal
        on:onQuitClick={handleOnQuitClick}
        on:onNewGameClick={handleOnNewGameClick}
      />
    {/if}
  </div>
</div>

<style>
  .game__container {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .game__background {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .game__main-content {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
