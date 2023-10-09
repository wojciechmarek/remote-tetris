<script lang="ts">
  export let isPlayerVisible: boolean = false;
</script>

{#if isPlayerVisible}
  <div class="player__container">
    <h1>T</h1>
    <h1>E</h1>
    <h1>T</h1>
    <h1>R</h1>
    <h1>I</h1>
    <h1>S</h1>
  </div>
{/if}

<style>
  .player__container {
    width: 580px;
    height: 340px;
    background-color: rgba(0, 0, 0, 1);
    position: absolute;
    top: 37%;
    left: 52.5%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .player__container h1 {
    display: inline;
    color: white;
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }

  .player__container h1:nth-child(1) {
    color: red;
  }

  .player__container h1:nth-child(2) {
    color: blue;
  }

  .player__container h1:nth-child(3) {
    color: green;
  }

  .player__container h1:nth-child(4) {
    color: yellow;
  }

  .player__container h1:nth-child(5) {
    color: purple;
  }

  .player__container h1:nth-child(6) {
    color: orange;
  }
</style>
