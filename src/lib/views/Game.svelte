<script lang="ts">
  import GameStartModal from "@components/modals/GameStartModal.svelte";
  import PauseModal from "@components/modals/PauseModal.svelte";
  import GameOverModal from "@components/modals/GameOverModal.svelte";
  import GameBoard from "@components/game-board/GameBoard.svelte";
  import backgroundImage from "@images/background.webp";
  import { io } from "socket.io-client";

  import { v4 as uuidv4 } from "uuid";
  import { onMount } from "svelte";

  const url = import.meta.env.VITE_CONTROLLER_URL;
  const server = import.meta.env.VITE_SERVER_URL;

  // ------- boolean values -------
  let isGameStartModalVisible = true;
  let isGameBoardVisible = false;
  let isPaused = false;
  let isGameOver = false;
  let isRemoteController = false;
  let isRemoteDetailsVisible = false;
  let remoteIp = "";

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

  let buttonId: string;

  const handleRemoteButtonPress = (buttonKey: string) => {
    if (isGameStartModalVisible && buttonKey === "start") {
      handleOnResumeClick();
      return;
    }

    if (isPaused && buttonKey === "start") {
      handleOnResumeClick();
      return;
    }

    if (!isPaused && buttonKey === "start") {
      handleOnGamePause();
      return;
    }

    if (isRemoteDetailsVisible && buttonKey === "x") {
      isRemoteDetailsVisible = false;
      return;
    }

    if (!isRemoteDetailsVisible && buttonKey === "x") {
      isRemoteDetailsVisible = true;
      return;
    }

    if ((isGameOver || isPaused) && buttonKey === "a") {
      handleOnQuitClick();
      return;
    }

    if (isGameOver && buttonKey === "y") {
      handleOnNewGameClick();
      return;
    }

    if (isPaused && buttonKey === "y") {
      handleOnResumeClick();
      return;
    }

    buttonId = buttonKey;
    setTimeout(() => {
      buttonId = "";
    }, 100);
  };

  // ------ web rtc -------

  let offer: RTCSessionDescriptionInit;
  let dataChannel: RTCDataChannel;

  const configurePeer = async () => {
    dataChannel = peer.createDataChannel("chat");

    offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
  };

  dataChannel.onopen = (event: Event) => {
    isRemoteController = true;
    isRemoteDetailsVisible = true;
  };

  dataChannel.onmessage = (event: MessageEvent) => {
    handleRemoteButtonPress(event.data);
  };
  dataChannel.onclose = () => {
    isRemoteController = false;
    isRemoteDetailsVisible = false;
  };

  const sendOfferAndIceCandidatesToServer = async () => {
    const payload = JSON.stringify({
      id,
      offer,
      iceCandidates
    });

    socket.emit("offerAndIceCandidates", payload);
  };

  const iceCandidates: RTCIceCandidate[] = [];

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  peer.onconnectionstatechange = function (event: Event) {
    if (peer.connectionState === "connected") {
      // handle
    }
  };

  const socket = io(server);

  // ---- web socket.io -----
  const registerTheCallbackAnswerFromServer = () => {
    socket.on("answer", async (result) => {
      const asd = new RTCSessionDescription(result.answer);

      await peer.setRemoteDescription(asd);
      const ices = result.iceCandidates;

      calculateRemoteIpAddress(ices);

      ices.forEach(async (item) => {
        await peer.addIceCandidate(item);
      });

      //handleOnSelectKeyboardClick();
    });
  };

  const calculateRemoteIpAddress = (ices: any[]) => {
    const remoteCandidate = ices.find((ice) => ice.candidate.includes("raddr"));
    remoteIp = remoteCandidate.candidate.split(" ")[9];
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
    {#if isGameStartModalVisible}
      <GameStartModal
        {isRemoteController}
        {qrCodeValue}
        on:refreshQrCodeClick={handleOnRefreshQrCodeClick}
        on:selectWasdKeysClick={handleOnSelectKeyboardClick}
      />
    {/if}

    {#if isGameBoardVisible}
      <GameBoard
        {remoteIp}
        {isPaused}
        {isRemoteDetailsVisible}
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
