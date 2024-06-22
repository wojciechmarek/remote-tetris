<script lang="ts">
  import GameStartModal from "@components/modals/GameStartModal.svelte";
  import PauseModal from "@components/modals/PauseModal.svelte";
  import GameOverModal from "@components/modals/GameOverModal.svelte";
  import GameBoard from "@components/game-board/GameBoard.svelte";
  import backgroundImage from "@images/background.webp";

  import { v4 as uuidv4 } from "uuid";

  // ------- controller url -------
  const url = "https://web-rtc-tetris.vercel.app/controller/";
  let qrCodeValue = `${url}${uuidv4()}`;

  // ---- web rtc communication ----
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302", // This is a public STUN server provided by Google.
      },
    ],
  });

  // ------- boolean values -------
  let isGameStartModalVisible = true;
  let isGameBoardVisible = false;
  let isPaused = false;
  let isGameOver = false;
  let isRemoteController = false;

  // ------ events handlers -------
  const handleOnRefreshQrCodeClick = () => {
    qrCodeValue = `${url}${uuidv4()}`;
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
    console.log("asdasdasd");

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
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="" />
  <div class="game__main-content">
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
