<script lang="ts">
  import Nintendo from "../components/controller/Nintendo.svelte";
  import Status from "../components/controller/Status.svelte";
  import Warning from "../components/controller/Warning.svelte";

  export let id: string;

  let isStatsBarVisible = true;

  const handleOnStatsBarVisibleChange = () => {
    if (isStatsBarVisible) {
      isStatsBarVisible = false;
      return;
    }

    isStatsBarVisible = true;
  };
</script>

<div class="controller__container">
  {#if isStatsBarVisible}
    <Status connectedTo={id} ping={24} rows={34} />
  {/if}
  <div class="controller__nintendo">
    <Nintendo on:showStatsBar={handleOnStatsBarVisibleChange} />
  </div>
  <div class="controller__orientation-warning">
    <Warning />
  </div>
</div>

<style>
  .controller__container {
    width: 100%;
    height: 100vh;
    background-color: white;
  }

  .controller__nintendo {
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: none;
    }
  }

  .controller__orientation-warning {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;

    @media (orientation: portrait) {
      display: flex;
    }
  }
</style>
