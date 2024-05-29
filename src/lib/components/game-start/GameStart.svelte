<script lang="ts">
  import wasdKeysImage from "@images/wasd_keys.webp";
  import { createEventDispatcher } from "svelte";
  import QrCode from "svelte-qrcode";
  import ValueFrame from "./Frame.svelte";
  import Button from "./Button.svelte";

  const dispatch = createEventDispatcher();

  export let isStartBannerVisible: boolean = false;
  export let qrCodeValue: string = "";

  const onRefreshCodeClick = () => {
    dispatch("refreshQrCodeClick");
  };

  const onSelectKeyboardClick = () => {
    dispatch("selectKeyboardClick");
  };
</script>

{#if isStartBannerVisible}
  <div class="game-start__container">
    <div class="game-start__content1">
      <div class="game-start__content2">
        <div class="game-start__content3">
          <h1 class="game-start__header">TETRIS</h1>
          <div class="game-start__controllers-container">
            <div class="game-start__controller">
              <ValueFrame title="Remote controller">
                <div class="game-start__controller-image">
                  <QrCode value={qrCodeValue} size={130} />
                </div>
              </ValueFrame>
              <Button text="Refresh" />
            </div>
            <div class="game-start__controller">
              <ValueFrame title="Keyboard WASD keys">
                <div class="game-start__controller-image">
                  <img
                    src={wasdKeysImage}
                    alt="keyboard buttons"
                    class="game-start__controller-image_img"
                  />
                </div>
              </ValueFrame>
              <Button text="Select" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .game-start__container {
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100%;
  }

  .game-start__content1 {
    background-color: #000000;
    padding: 0.25em;
  }

  .game-start__content2 {
    background-color: #1e287d;
    padding: 0.25em;
  }

  .game-start__content3 {
    background-color: #284fe6;
    padding: 2em;
  }

  .game-start__header {
    color: #52b5ee;
    text-align: center;
    text-transform: uppercase;
    font-size: 3rem;
    margin: 0;
    padding: 0;
    text-shadow: #000000 0px 5px;
  }

  .game-start__controllers-container {
    display: flex;
    gap: 3em;
    margin-top: 2em;
  }

  .game-start__controller {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 22.5em;
  }

  .game-start__controller-image {
    width: 160px;
    height: 160px;
    border-radius: 5px;
    background-color: white;
  }

  .game-start__controller-image_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 8px;
  }
</style>
