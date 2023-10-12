<script lang="ts">
  import backgroundImage from "../../assets/images/background.webp";
  import Player from "../ui/game/Player.svelte";
  import StartStrip from "../ui/game/StartStrip.svelte";
  import { v4 as uuidv4 } from "uuid";

  const url = "https://web-rtc-games.vercel.app/controller?id=";

  let qrCodeValue = `${url}${uuidv4()}`;
  let isStartStripVisible = true;
  let isPlayerVisible = false;

  const onRefreshQrCodeClick = () => {
    qrCodeValue = `${url}${uuidv4()}`;
  };

  const onSelectKeyboardClick = () => {
    isStartStripVisible = false;

    setTimeout(() => {
      isPlayerVisible = true;
    }, 1000);
  };
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="background" />
  <StartStrip
    {isStartStripVisible}
    {qrCodeValue}
    on:refreshQrCodeClick={onRefreshQrCodeClick}
    on:selectKeyboardClick={onSelectKeyboardClick}
  />
  <Player bind:isPlayerVisible />
</div>

<style>
  .game__container {
    width: 100%;
    height: 100vh;
  }

  .game__background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
