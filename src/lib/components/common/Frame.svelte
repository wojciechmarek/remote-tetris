<script lang="ts">
  export let title: string;
</script>

<div class="value-framer__container">
  <div class="value-frame__title">
    <p class="value-frame__title-paragraph">{title}</p>
  </div>
  <div class="value-frame__slot">
    <slot />
  </div>
</div>

<style>
  .value-framer__container {
    display: inline-block;
    border: 0.25em solid #151c59;
  }

  .value-frame__title {
    background-color: #151c59;
    padding: 0.5em 0.75em;
  }

  .value-frame__title-paragraph {
    color: #52b5ee;
    font-weight: 900;
    font-size: 1rem;
    text-align: center;
  }

  .value-frame__slot {
    display: flex;
    background-color: #1e287d;
    padding: 1.5em;
    justify-content: center;
  }
</style>
