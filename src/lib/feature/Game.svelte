<script lang="ts">
  import backgroundImage from "../../assets/images/background.webp";
  import Player from "../ui/game/Player.svelte";
  import StartStrip from "../ui/game/StartStrip.svelte";

  let qrCodeValue = "HelloWorld";
  let isStartStripVisible = true;
  let isPlayerVisible = false;

  const onRefreshQrCodeClick = () => {
    qrCodeValue = new Date().getTime().toString();
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
    bind:isStartStripVisible={isStartStripVisible}
    bind:qrCodeValue={qrCodeValue}
    on:refreshQrCodeClick={onRefreshQrCodeClick}
    on:selectKeyboardClick={onSelectKeyboardClick}
  />
  <Player
    bind:isPlayerVisible={isPlayerVisible}
  />
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
