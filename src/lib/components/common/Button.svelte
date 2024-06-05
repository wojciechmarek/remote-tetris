<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let text: string = "Select";

  const dispatch = createEventDispatcher();

  const handleOnClick = () => {
    dispatch("click");
  };
</script>

<button class="button" on:click={handleOnClick}>{text}</button>

<style>
  .button {
    border: 0.25em solid #151c59;
    background-color: #1e287d;
    font-size: 1em;
    font-weight: 900;
    cursor: pointer;
    padding: 0.75em 0em;
    color: #ffffff;
    width: 100%;
  }

  .button:hover {
    border: 0.25em solid #1e287d;
    background-color: rgb(44, 58, 184);
  }
</style>
