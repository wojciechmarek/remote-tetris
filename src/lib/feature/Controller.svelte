<script lang="ts">
  import Nintendo from "../ui/controller/Nintendo.svelte";
</script>

<div class="controller__container">
  <div class="controller__component">
    <Nintendo />
  </div>
  <div class="controller__orientation-warning">
    <h5 class="controller__orientation-warning__header">
      Controller is not supported in vertical orientation. Please rotate your
    </h5>
  </div>
</div>

<style>
  .controller__container {
    width: 100%;
    height: 100vh;
    background-color: white;
  }

  .controller__component {
    width: 100%;
    height: 100%;
  }

  .controller__orientation-warning {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;

    @media (orientation: portrait) {
      display: flex;
    }
  }

  .controller__orientation-warning__header {
    font-size: 1.5rem;
    font-weight: 400;
    color: #000000;
    text-align: center;
  }
</style>
