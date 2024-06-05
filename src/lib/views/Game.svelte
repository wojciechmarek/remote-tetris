<script lang="ts">
  import GameStartModal from "@components/modals/GameStartModal.svelte";
  import PauseModal from "@components/modals/PauseModal.svelte";
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
  let isPauseEnabled = false;

  // ------ events handlers -------
  const onRefreshQrCodeClick = () => {
    qrCodeValue = `${url}${uuidv4()}`;
  };

  const onSelectKeyboardClick = () => {
    isGameStartModalVisible = false;
    isPauseEnabled = false;
  };

  const handleOnQuitClick = () => {
    isGameStartModalVisible = true;
  };

  const handleOnResumeClick = () => {
    isPauseEnabled = false;
  };

  const handleOnGamePause = () => {
    isPauseEnabled = true;
  };
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="" />
  <div class="game__main-content">
    {#if isGameStartModalVisible}
      <GameStartModal
        {qrCodeValue}
        on:refreshQrCodeClick={onRefreshQrCodeClick}
        on:selectWasdKeysClick={onSelectKeyboardClick}
      />
    {:else if isPauseEnabled}
      <PauseModal
        on:onQuitClick={handleOnQuitClick}
        on:onResumeClick={handleOnResumeClick}
      />
    {:else}
      <GameBoard on:gamePause={handleOnGamePause} />
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
