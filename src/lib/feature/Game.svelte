<script lang="ts">
  import backgroundImage from '../../assets/background/back1.jpg';

  let isStartStripVisible = true;

  const onSelectKeyboardClick = () => {
    isStartStripVisible = false;
  }
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="background" />
  {#if isStartStripVisible}
  <div class="game__start-strip">
    <h1 class="game__start-strip__header">Welcome to Web RTC Games</h1>
    <h3 class="game__start-strip__sub-header">Selected one of the supported types of controllers:</h3>
    <div class="game__controller-options__container">
      <div class="game__controller-option">
        <h5 class="game__controller-option__header">Scan a QR code:</h5>
        <div class="game__controller-option__image">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld" alt="QR code" />
        </div>  
      </div>
      <div class="game__or-text">
        <h5>or</h5>
      </div>
      <div class="game__controller-option">
        <h5 class="game__controller-option__header">Use a keyboard</h5>
        <div class="game__controller-option__image">
          <img src="" />
        </div>
        <button class="game__controller-option__button"
          on:click={onSelectKeyboardClick}
        >Start</button>
      </div>
    </div>  
    <div class="game__small-width-warning">
      <h5 class="game__small-width-warning__header">For better experience, please use a device with a width of at least 1024px.</h5>
    </div>
  </div>
  {/if}
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

  .game__start-strip {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    padding: 50px 0;
  }

  .game__start-strip__header {
    color: white;
    text-align: center;
    font-size: 3rem;
    margin: 0;
    padding: 0;
    font-weight: bolder;

  }

  .game__start-strip__sub-header {
    color: white;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .game__controller-options__container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 25px;
  }

  .game__or-text {
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }

  .game__controller-option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }

  .game__controller-option__header {
    color: white;
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
  }

  .game__controller-option__image {
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }

  .game__small-width-warning {
    display: none;
    justify-content: center;
    align-items: center;
    height: 75px;
    background-color: rgba(255, 0, 0);

    @media (max-width: 1024px) {
      display: flex;
    }
  }

  .game__small-width-warning__header {
    color: white;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }

  .game__controller-option__button {
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    background-color: #950098;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #836EBC;
    }
  }
</style>
