<script lang="ts">
  import backgroundImage from "../../assets/background/back1.jpg";
  import StartStrip from "../ui/game/StartStrip.svelte";

  let qrCodeValue = "HelloWorld";
  let isStartStripVisible = true;

  const onRefreshQrCodeClick = () => {
    qrCodeValue = new Date().getTime().toString();
  };

  const onSelectKeyboardClick = () => {
    isStartStripVisible = false;
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
