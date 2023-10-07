<script lang="ts">
  import backgroundImage from '../../assets/background/back1.jpg';
  import StartStrip from '../ui/game/StartStrip.svelte';

  const onSelectKeyboardClick = () => {
    document.title = 'Click';
  }
</script>

<div class="game__container">
  <img src={backgroundImage} class="game__background" alt="background" />
  <StartStrip on:onSelectKeyboardClick={onSelectKeyboardClick} />
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
