<script lang="ts">
  import gameState from '$lib/ui/store'
  import Team from '$lib/ui/team.svelte'
  import Board from '$lib/ui/board.svelte'

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="page">
  <header>
    <h1>Frontend Feud*</h1>
    <p>* Stolen from the JS Party podcast</p>
  </header>
  <div class="game">
    <Team team={$gameState.team1} isAdmin={data.isAdmin} />
    <Board isAdmin={data.isAdmin} />
    <Team team={$gameState.team2} isAdmin={data.isAdmin} />
  </div>
</div>
<h2>Debug output</h2>
<code>
<pre>
{JSON.stringify($gameState, null, 2)}
</pre>
</code>

<style>
  .page {
    text-align: center;
    padding: var(--margin-l);
  }

  header {
    margin: var(--margin-l);
  }

  h1 {
    font-size: var(--font-size-xxxl);
  }

  header p {
    font-size: var(--font-size-xs)
  }

  .game {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-column-gap: var(--margin-l);;
    max-width: 1200px;
    margin: var(--margin-l) auto;
  }
</style>
