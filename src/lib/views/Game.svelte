<script lang="ts">
  import { GameBoard } from "@components/game-board";
  import {
    GameStartModal,
    GameOverModal,
    PauseModal
  } from "@components/modals";
  import backgroundImage from "@images/background.webp";
  import type { ControllerConnectionAnswer } from "@models/controller-connection-answer";

  import { QrCodeUtils, WebRTCUtils } from "@utils/index";
  import { WebSocketUtils } from "@utils/web-socket.utils";
  import { onMount } from "svelte";

  //#region Utilities
  const { generateNewId, generateNewQrCodeValueBasedOnId } = QrCodeUtils();
  const {
    initNewWebRTCPeer,
    getIceCandidates,
    setOfferToThePeer,
    setIceCandidatesToThePeer,
    calculateRemoteIpAddress,
    subscribeForButtonPressFromRemoteController,
    subscribeForChannelOpenFromRemoteController
  } = WebRTCUtils();
  const {
    sendGameConnectionOfferToTheServer,
    subscribeForControllerConnectionAnswerFromTheServer
  } = WebSocketUtils();
  //#endregion

  //#region Private variables
  let isGameStartModalVisible = true;
  let isGameBoardVisible = false;
  let isPaused = false;
  let isGameOver = false;
  let isRemoteController = false;
  let isRemoteDetailsVisible = false;

  let isQrCodeReadyToScan = false;
  let qrCodeValue = "";
  let remoteIp = "";
  let buttonId = "";
  //#endregion

  //#region Debug Mode variable
  let isDebugMode = false;
  if (import.meta.env.DEV) {
    isDebugMode = true;
  }
  //#endregion

  //#region Event handlers
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

  const handleOnRefreshQrCodeClick = async () => {
    await setUpNewWebRTCConnection();
  };

  const handleOnNewGameClick = () => {
    handleOnSelectKeyboardClick();
  };

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
  //#endregion

  //#region WebRTC helper methods
  const setUpNewWebRTCConnection = async () => {
    isQrCodeReadyToScan = false;
    const id = generateNewId();
    qrCodeValue = generateNewQrCodeValueBasedOnId(id);

    const gameOffer = await initNewWebRTCPeer();
    const gameIceCandidates = getIceCandidates();

    setTimeout(async () => {
      await sendGameConnectionOfferToTheServer(
        id,
        gameOffer,
        gameIceCandidates
      );

      isQrCodeReadyToScan = true;
    }, 1000);
  };

  const applyAnswerAndIceCandidatesFromController = async (
    answer: RTCSessionDescriptionInit,
    iceCandidates: RTCIceCandidateInit[]
  ) => {
    const sessionDescription = new RTCSessionDescription(answer);
    await setOfferToThePeer(sessionDescription);
    await setIceCandidatesToThePeer(iceCandidates);
  };
  //#endregion

  //#region OnMount
  onMount(async () => {
    await setUpNewWebRTCConnection();

    subscribeForControllerConnectionAnswerFromTheServer(async (result) => {
      const { answer, iceCandidates } = result as ControllerConnectionAnswer;

      await applyAnswerAndIceCandidatesFromController(answer, iceCandidates);
      remoteIp = calculateRemoteIpAddress(iceCandidates);
    });

    subscribeForButtonPressFromRemoteController((remoteButtonId) => {
      handleRemoteButtonPress(remoteButtonId);
    });

    subscribeForChannelOpenFromRemoteController((isChannelOpen) => {
      isRemoteController = isChannelOpen;
      isRemoteDetailsVisible = isChannelOpen;
    });
  });
  //#endregion
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="" />
  <div class="game__small-resolution-message">
    <p>The resolution is not supported. The minimum width is 992px.</p>
  </div>
  <div class="game__main-content">
    {#if isDebugMode}
      <p class="game__debug-controller-url">{qrCodeValue}</p>
    {/if}
    {#if isGameStartModalVisible}
      <GameStartModal
        {isRemoteController}
        {qrCodeValue}
        {isQrCodeReadyToScan}
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

  .game__small-resolution-message {
    z-index: 1;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: #151c59;
    align-items: center;
    justify-content: center;
    display: none;
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

  .game__debug-controller-url {
    position: absolute;
  }

  @media screen and (max-width: 992px) {
    .game__small-resolution-message {
      display: flex;
    }

    .game__main-content {
      display: none;
    }
  }
</style>
