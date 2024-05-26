<script lang="ts">
  import Controller from "@views/Controller.svelte";
  import Game from "@views/Game.svelte";
  import { Router, Route } from "svelte-navigator";
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
