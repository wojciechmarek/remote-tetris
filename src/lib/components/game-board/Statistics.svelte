<script lang="ts">
  import Frame from "@components/common/Frame.svelte";

  export let gameTimeInSeconds: number = 0;
  export let level: number = 0;
  export let target: number = 0;
  export let score: number = 0;

  // Calculate minutes and seconds
  let minutes: number;
  let seconds: number;

  $: {
    minutes = Math.floor(gameTimeInSeconds / 60);
    seconds = gameTimeInSeconds % 60;
  }
</script>

<div class="game-board__stats">
  <Frame title={"Time"}>
    <div class="time__content">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div></Frame
  >
  <Frame title={"Level"}><div class="level__content">{level}</div></Frame>
  <Frame title={"Target"}
    ><div class="target__content">{target} lines</div>
  </Frame>
  <Frame title={"Score"}
    ><div class="points__content">{score} points</div>
  </Frame>
</div>

<style>
  .game-board__stats {
    background-color: #284fe6;
    border: 0.25em solid #151c59;
    display: flex;
    gap: 1em;
    padding: 1em 5em;
  }

  .time__content {
    width: 3em;
    text-align: center;
  }

  .level__content {
    width: 2em;
    text-align: center;
  }

  .target__content {
    width: 5em;
    text-align: center;
  }

  .points__content {
    width: 10em;
    text-align: center;
  }
</style>
