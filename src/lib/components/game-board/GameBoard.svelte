<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Frame from "../common/Frame.svelte";
  import Canvas from "./Canvas.svelte";

  const dispatch = createEventDispatcher();

  export let isGameBoardVisible: boolean = false;

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "Escape":
        pauseTheGame();
        break;
    }
  };

  const pauseTheGame = () => {
    dispatch("gamePause");
  };
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="game-board__container">
  <div class="game-board__stats">
    <Frame title={"Time"}>1:23</Frame>
    <Frame title={"Level"}>3</Frame>
    <Frame title={"Target"}>Clear 10 lines</Frame>
    <Frame title={"Ping"}>23 ms</Frame>
  </div>
  <Canvas />
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

  .game-board__stats {
    background-color: #1e287d;
    display: flex;
    gap: 1em;
    padding: 1em 5em;
  }
</style>
