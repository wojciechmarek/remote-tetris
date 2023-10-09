<script lang="ts">
  import wasdButtonsImage from "../../../assets/images/wasd.jpg";
  import { createEventDispatcher } from "svelte";
  import QrCode from "svelte-qrcode";

  const dispatch = createEventDispatcher();

  export let isStartStripVisible: boolean = false;
  export let qrCodeValue = "";

  const onRefreshCodeClick = () => {
    dispatch("refreshQrCodeClick");
  };

  const onSelectKeyboardClick = () => {
    dispatch("selectKeyboardClick");
  };
</script>

{#if isStartStripVisible}
  <div class="game-strip__container">
    <h1 class="game-strip__container__header">Welcome to Web RTC Games</h1>
    <h3 class="game-strip__container__sub-header">
      Selected one of the supported types of controllers:
    </h3>
    <div class="game-strip__controller-options__container">
      <div class="game-strip__controller-option">
        <h5 class="game-strip__controller-option__header">Scan a QR code</h5>
        <div class="game-strip__controller-option__image">
          <div class="game-strip__controller-option__img">
            <QrCode value={qrCodeValue} size={130} />
          </div>
        </div>
        <button
          class="game-strip__controller-option__button"
          on:click={onRefreshCodeClick}>Refresh code</button
        >
      </div>
      <div class="game-strip__or-text">
        <h5>or</h5>
      </div>
      <div class="game-strip__controller-option">
        <h5 class="game-strip__controller-option__header">Use a keyboard</h5>
        <div class="game-strip__controller-option__image">
          <img
            src={wasdButtonsImage}
            alt="keyboard buttons"
            class="game-strip__controller-option__img"
          />
        </div>
        <button
          class="game-strip__controller-option__button"
          on:click={onSelectKeyboardClick}>Start a game</button
        >
      </div>
    </div>
    <div class="game-strip__small-width-warning">
      <h5 class="game-strip__small-width-warning__header">
        For better experience, please use a device with a width of at least
        1024px.
      </h5>
    </div>
  </div>
{/if}

<style>
  .game-strip__container {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    padding: 50px 0;
  }

  .game-strip__container__header {
    color: white;
    text-align: center;
    font-size: 3rem;
    margin: 0;
    padding: 0;
    font-weight: bolder;
  }

  .game-strip__container__sub-header {
    color: white;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .game-strip__controller-options__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 75px;
  }

  .game-strip__or-text {
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .game-strip__controller-option {
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-strip__controller-option__header {
    color: white;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }

  .game-strip__controller-option__image {
    margin-top: 1px;
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-color: white;
  }

  .game-strip__controller-option__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 8px;
  }

  .game-strip__small-width-warning {
    display: none;
    justify-content: center;
    align-items: center;
    height: 75px;
    background-color: rgba(255, 0, 0);

    @media (max-width: 1024px) {
      display: flex;
    }
  }

  .game-strip__small-width-warning__header {
    color: white;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }

  .game-strip__controller-option__button {
    margin-top: 10px;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    background-color: #950098;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #836ebc;
    }
  }
</style>
