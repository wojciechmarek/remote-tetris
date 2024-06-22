<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../common/Button.svelte";

  const dispatch = createEventDispatcher();

  const handleOnResumeClick = () => {
    dispatch("onResumeClick");
  };

  const handleOnQuitClick = () => {
    dispatch("onQuitClick");
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      dispatch("onResumeClick");
    }
  };
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div class="pause__container">
  <div class="pause__modal">
    <h2 class="pause__title">Pause</h2>
    <p>Resume or quit the game.</p>
    <div class="pause__buttons-containers">
      <Button text="Resume" on:click={handleOnResumeClick} />
      <Button text="Quit" on:click={handleOnQuitClick} />
    </div>
  </div>
</div>

<style>
  .pause__container {
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

  .pause__modal {
    background-color: #284fe6;
    border: 0.25em solid #1e287d;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .pause__buttons-containers {
    margin-top: 1em;
    display: flex;
    gap: 1em;
  }
</style>
