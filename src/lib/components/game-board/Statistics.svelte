<script lang="ts">
  import Frame from "@components/common/Frame.svelte";

  export let gameTimeInSeconds: number = 0;
  export let level: number = 0;
  export let target: number = 0;
  export let ping: number = 0;

  // Calculate minutes and seconds
  let minutes: number;
  let seconds: number;

  $: {
    minutes = Math.floor(gameTimeInSeconds / 60);
    seconds = gameTimeInSeconds % 60;
  }
</script>

<div class="game-board__stats">
  <Frame title={"Time"}>{minutes}:{seconds.toString().padStart(2, "0")}</Frame>
  <Frame title={"Level"}>{level}</Frame>
  <Frame title={"Target"}>Clear {target} lines</Frame>
  <Frame title={"Ping"}>{ping} ms</Frame>
</div>

<style>
  .game-board__stats {
    background-color: #284fe6;
    display: flex;
    gap: 1em;
    padding: 1em 5em;
  }
</style>
