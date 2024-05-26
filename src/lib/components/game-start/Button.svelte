<script lang="ts">
  export let text: string = "Select";
</script>

<button class="button">{text}</button>

<style>
  .button {
    border: 0.25em solid #232f95;
    background-color: #6365e5;
    font-size: 1.25em;
    font-weight: 900;
    cursor: pointer;
    padding: 0.5em 0em;
  }

  .button:hover {
    border: 0.25em solid #3a47be;
    background-color: #8284ef;
  }
</style>
