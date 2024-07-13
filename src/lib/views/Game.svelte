<script lang="ts">
  import { GameBoard } from "@components/game-board";
  import {
    GameStartModal,
    GameOverModal,
    PauseModal
  } from "@components/modals";
  import backgroundImage from "@images/background.webp";

  import { QrCodeUtils, WebRTCUtils } from "@utils/index";
  import { WebSocketUtils } from "@utils/web-socket.utils";
  import { onMount } from "svelte";

  const isDebugMode = true;

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
    emitIdAndOfferAndIceCandidatesToServer,
    subscribeForAnswerAndIceCandidatesFromServer
  } = WebSocketUtils();
  //#endregion

  //#region Private variables
  let isGameStartModalVisible = true;
  let isGameBoardVisible = false;
  let isPaused = false;
  let isGameOver = false;
  let isRemoteController = false;
  let isRemoteDetailsVisible = false;

  let qrCodeValue = "";
  let remoteIp = "";
  let buttonId = "";
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
    const id = generateNewId();
    qrCodeValue = generateNewQrCodeValueBasedOnId(id);

    const offer = await initNewWebRTCPeer();
    const iceCandidates = getIceCandidates();

    setTimeout(async () => {
      await emitIdAndOfferAndIceCandidatesToServer(id, offer, iceCandidates);
    }, 100);
  };

  const applyReceivedConnectionDataFromController = async (result) => {
    const { answer, iceCandidates } = result;
    const sessionDescription = new RTCSessionDescription(answer);
    await setOfferToThePeer(sessionDescription);
    await setIceCandidatesToThePeer(iceCandidates);
  };
  //#endregion

  //#region OnMount
  onMount(async () => {
    await setUpNewWebRTCConnection();

    subscribeForAnswerAndIceCandidatesFromServer(async (result) => {
      await applyReceivedConnectionDataFromController(result);
      remoteIp = calculateRemoteIpAddress(result.iceCandidates);
    });

    subscribeForButtonPressFromRemoteController((remoteButtonId) => {
      handleRemoteButtonPress(remoteButtonId);
    });

    subscribeForChannelOpenFromRemoteController((isChannelOpen) => {
      isRemoteController = isChannelOpen;
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
      <p>{qrCodeValue}</p>
    {/if}
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

  @media screen and (max-width: 992px) {
    .game__small-resolution-message {
      display: flex;
    }

    .game__main-content {
      display: none;
    }
  }
</style>
