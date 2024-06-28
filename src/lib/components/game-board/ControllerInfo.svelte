<script lang="ts">
  export let connectedTo: string = "";
  export let buttonId: string = "";
</script>

<div class="remote-details__container">
  <div class="remote-details__section">
    <div class="remote-details__row">
      <span class="key_frame">⬅️</span> or <span class="key_frame">➡️</span> - move
      the Tetromino
    </div>
    <div class="remote-details__row">
      <span class="key_frame">🔽</span> - accelerate the Tetromino
    </div>
    <div class="remote-details__row">
      <span class="key_frame">🔼</span> /
      <span class="remote-details__dot yellow_dot" /> - rotate the Tetromino
    </div>
  </div>
  <div class="remote-details__section">
    <div class="remote-details__row">
      <span class="key_frame">START</span> - pause or resume
    </div>
    <div class="remote-details__row">
      <span class="remote-details__dot red_dot" /> - quit button in modal
    </div>
    <div class="remote-details__row">
      <span class="remote-details__dot green_dot" /> - new game button in modal
    </div>
    <div class="remote-details__row">
      <span class="remote-details__dot blue_dot" /> - hide this window
    </div>
  </div>
  <div class="remote-details__section flex_grow">
    <div class="remote-details__row">Connected to: {connectedTo}</div>
    <div class="remote-details__row">Pressed button: {buttonId}</div>
  </div>
</div>

<style>
  .remote-details__container {
    position: absolute;
    padding: 0.75em;
    bottom: 2em;
    right: 2em;
    height: 20em;
    width: 20em;
    background-color: #1e287d;
    border: 0.25em solid #151c59;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .remote-details__dot {
    position: relative;
    bottom: -0.125em;
    display: inline-block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
  }

  .key_frame {
    background-color: #284fe6;
    padding: 0.125em;
    border-radius: 0.125em;
    display: inline-block;
    line-height: 12.5pt;
  }

  .yellow_dot {
    background-color: #ffff00;
  }

  .blue_dot {
    background-color: #3030ff;
  }

  .green_dot {
    background-color: #00ff00;
  }

  .red_dot {
    background-color: #ff0000;
  }

  .flex_grow {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
</style>
