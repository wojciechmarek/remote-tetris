<script lang="ts">
  import Game from "./lib/feature/Game.svelte";

  import { Router, Route } from "svelte-navigator";
  import Controller from "./lib/feature/Controller.svelte";
</script>

<main>
  <Router>
    <Route path="/">
      <Game />
    </Route>
    <Route path="/controller/:id" let:params>
      <Controller id={params.id} />
    </Route>
  </Router>
</main>
