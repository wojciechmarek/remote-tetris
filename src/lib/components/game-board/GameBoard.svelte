<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Canvas from "./Canvas.svelte";
  import Statistics from "./Statistics.svelte";

  const dispatch = createEventDispatcher();

  export let isPaused: boolean = true;

  let gameTimeInSeconds: number = -2;
  let level: number = 1;
  let target: number = 5;

  $: {
    if (!isPaused) {
      startTimeCounter();
    }
  }

  onMount(() => {
    startTimeCounter();
  });

  let timeoutId: number;

  const startTimeCounter = () => {
    clearTimeout(timeoutId);

    if (isPaused) {
      return;
    }

    gameTimeInSeconds++;

    timeoutId = setTimeout(startTimeCounter, 1000);
  };

  const handleOnLineCompleted = () => {
    target--;

    if (target === 0) {
      level++;
      target = 4 + level;
    }
  };
</script>

<div
  class="game-board__container"
  style={isPaused ? "opacity: 0" : "opacity: 1"}
>
  <Statistics {gameTimeInSeconds} {target} {level} />
  <Canvas
    {isPaused}
    {level}
    on:pauseGame={() => dispatch("gamePause")}
    on:lineCompleted={handleOnLineCompleted}
    on:gameOver={() => dispatch("gameOver")}
  />
  <p>Press ESCAPE to pause or quit</p>
</div>

<style>
  .game-board__container {
    display: grid;
    align-content: center;
    justify-items: center;
    height: 100%;
    gap: 1em;
  }
</style>
