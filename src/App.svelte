<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Game from './lib/feature/Game.svelte';

  import { Router, Link, Route } from "svelte-navigator";
  import Controller from './lib/feature/Controller.svelte';
</script>

<main>
  <Router>
    <Route path="/">
      <Game />
    </Route>
    <Route path="/controller">
      <Controller />
    </Route>
  </Router>
</main>