<script lang="ts">
  export let connectedTo: string = "";
</script>

<div class="status__container">
  <div class="status__row">
    <p class="status__text">
      Connected to: {connectedTo}
    </p>
  </div>

  <!-- <div class="status__row">
    <p class="status__text">
      Your score: <span class="status__span">{rows} rows</span>
    </p>
  </div>

  <div class="status__row">
    <p class="status__text">Ping: <span class="status__span">{ping}ms</span></p>
  </div> -->
</div>

<style>
  .status__container {
    z-index: 1;
    position: absolute;
    background-color: #284ee6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    top: 0;
    padding: 0.5em;
  }

  .status__row {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1em;
  }

  .status__text {
    font-size: 0.5rem;
    font-weight: 400;
    color: #cccccc;
    text-shadow: #000000 0 1px;
  }

  .status__span {
    color: #ffffff;
  }
</style>
