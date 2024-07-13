<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import { Game, Controller } from "@views/index";
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
