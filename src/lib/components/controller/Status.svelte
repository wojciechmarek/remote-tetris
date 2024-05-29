<script lang="ts">
  export let id: string = "";
</script>

<div class="status__container">
  <div class="status__row">
    <p class="status__text">
      Connected to: <span class="status__dot" />123.126.34.11 / {id}
    </p>
  </div>

  <div class="status__row">
    <p class="status__text">Your score: 23 rows</p>
  </div>

  <div class="status__row">
    <p class="status__text">Ping: 12ms</p>
  </div>
</div>

<style>
  .status__container {
    position: absolute;
    background-color: #284fe6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    top: 0;
    padding: 3px 10px;
    gap: 10px;
  }

  .status__row {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1em;
  }

  .status__dot {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    background-color: #00ff00;
    border-radius: 50%;
    margin-bottom: 0.125em;
    margin-right: 0.5em;
    padding: 0;
    box-shadow: #000000 0 1px;
  }

  .status__text {
    font-size: 0.25rem;
    font-weight: 400;
    color: white;
    text-shadow: #000000 0 1px;
  }
</style>
