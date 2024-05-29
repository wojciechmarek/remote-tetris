<script lang="ts">
  import GameStart from "@components/game-start/GameStart.svelte";
  import backgroundImage from "@images/background.webp";
  import Player from "../components/game-board/Canvas.svelte";

  import { v4 as uuidv4 } from "uuid";

  const url = "https://web-rtc-tetris.vercel.app/controller/";

  let qrCodeValue = `${url}${uuidv4()}`;
  let isStartBannerVisible = true;
  let isPlayerVisible = false;

  const onRefreshQrCodeClick = () => {
    qrCodeValue = `${url}${uuidv4()}`;
  };

  const onSelectKeyboardClick = () => {
    //   isStartBannerVisible = false;
    //   setTimeout(() => {
    //     isPlayerVisible = true;
    //   }, 1000);
  };
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="" />
  <div class="game__main-content">
    <GameStart
      {isStartBannerVisible}
      {qrCodeValue}
      on:refreshQrCodeClick={onRefreshQrCodeClick}
      on:selectKeyboardClick={onSelectKeyboardClick}
    />
    <Player bind:isPlayerVisible />
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
