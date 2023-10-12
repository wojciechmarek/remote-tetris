<script lang="ts">
  import Nintendo from "../ui/controller/Nintendo.svelte";
  import Status from "../ui/controller/Status.svelte";
  import Warning from "../ui/controller/Warning.svelte";
</script>

<div class="controller__container">
  <Status />
  <div class="controller__nintendo">
    <Nintendo />
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
