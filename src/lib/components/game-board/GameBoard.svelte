<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Canvas from "./Canvas.svelte";
  import Statistics from "./Statistics.svelte";
  import RemoteDetails from "./RemoteDetails.svelte";

  const dispatch = createEventDispatcher();

  export let isPaused: boolean = true;
  export let isRemoteController: boolean = false;
  export let isRemoteDetailsVisible: boolean = false;
  export let buttonId: string = "";
  export let remoteIp: string = "";

  let gameTimeInSeconds: number = -2;
  let level: number = 1;
  let target: number = 5;
  let score: number = 0;

  $: {
    if (!isPaused) {
      startTimeCounter();
    }
  }

  onMount(() => {
    startTimeCounter();
  });

  let timeoutId;

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
    score += 10;

    if (target === 0) {
      level++;
      target = 4 + level;
      score += 100;
    }
  };
</script>

<div
  class="game-board__container"
  style={isPaused ? "opacity: 0" : "opacity: 1"}
>
  <Statistics {gameTimeInSeconds} {target} {level} {score} />
  <Canvas
    {buttonId}
    {isPaused}
    {level}
    on:pauseGame={() => dispatch("gamePause")}
    on:lineCompleted={handleOnLineCompleted}
    on:gameOver={() => dispatch("gameOver")}
  />
  <p>Press {isRemoteController ? "START" : "ESCAPE"} to pause or quit</p>
</div>
{#if isRemoteDetailsVisible}
  <RemoteDetails connectedTo={remoteIp} {buttonId} />
{/if}

<style>
  .game-board__container {
    display: grid;
    align-content: center;
    justify-items: center;
    height: 100%;
    gap: 1em;
  }
</style>
