<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../common/Button.svelte";

  const dispatch = createEventDispatcher();

  const handleOnResumeClick = () => {
    dispatch("onNewGameClick");
  };

  const handleOnQuitClick = () => {
    dispatch("onQuitClick");
  };
</script>

<div class="new-game__container">
  <div class="new-game__modal">
    <h2 class="new-game__title">Game over</h2>
    <p>Start a new game or quit.</p>
    <div class="new-game__buttons-containers">
      <Button text="New Game" on:click={handleOnResumeClick} />
      <Button text="Quit" on:click={handleOnQuitClick} />
    </div>
  </div>
</div>

<style>
  .new-game__container {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    display: grid;
    align-content: center;
    justify-items: center;
  }

  .new-game__modal {
    background-color: #284fe6;
    border: 0.25em solid #1e287d;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .new-game__buttons-containers {
    margin-top: 1em;
    display: flex;
    gap: 1em;
  }
</style>
