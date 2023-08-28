<script>
  export let team
  export let isAdmin
  import gameState from '$lib/ui/store.ts';
  import {addMiss, canAddMiss, canFinalizeRound, finalizeRound} from '$lib/gameState'

  const onRecordMissClick = () => {
    $gameState = addMiss($gameState, team.number)
  }

  const onAwardRoundClick = () => {
    $gameState = finalizeRound($gameState, team.number)
  }

  $: canRecordMiss = canAddMiss($gameState, team.number)
  $: [canAwardRound, ] = canFinalizeRound($gameState)
</script>

<div class:team={true} class:team-1={team.number === 1} class:team-2={team.number === 2}>
  <div class="team-header">
    <h2 class="team-name">{team.name}</h2>
    <div class="team-misses">
      <span>Misses</span>
      <span class="team-misses-list">
        <span class:active={team.misses > 0} >X</span>
        <span class:active={team.misses > 1} >X</span>
        <span class:active={team.misses > 2} >X</span>
      </span>
    </div>
    <div class="team-score">
      <span>Score</span>
      <span>{team.points}</span>
    </div>
  </div>
  <div class="team-list">
    {#each team.members as member}
      <img src={member.image} alt=""/>
      <div class="member-name">{member.name}</div>
    {/each}
  </div>
  <div class="team-actions">
    {#if isAdmin}
      <button on:click={onRecordMissClick} disabled={!canRecordMiss}>Record Miss</button>
      <button on:click={onAwardRoundClick} disabled={!canAwardRound}>Award Round</button>
    {/if}
  </div>
</div>

<style>
  .team-1 {
    --text-color: var(--team-1-dark);
    --team-dark: var(--team-1-dark);
    --team-light: var(--team-1-light);
  }

  .team-2 {
    --text-color: var(--team-2-dark);
    --team-dark: var(--team-2-dark);
    --team-light: var(--team-2-light);
  }

  .team {
    display: grid;
    grid-template-rows: auto auto 1fr;
    align-content: start;
    border: 3px solid var(--team-light);
    color: var(--team-dark);
  }

  .team-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    width: 100%;
  }

  .team-name {
    font-size: var(--font-size-xl);
    color: var(--background-color);
    background: var(--team-light);
    padding: var(--margin-s);
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    margin: 0;
  }

  .team-score, .team-misses {
    display: flex;
    flex-direction: column;
    max-width: 10em;
  }

  .team-misses {
    border-bottom: 3px solid var(--team-light);
    border-right: 1.5px solid var(--team-light);
  }

  .team-score {
    border-bottom: 3px solid var(--team-light);
    border-left: 1.5px solid var(--team-light);
  }

  .team-score > span:nth-child(1), .team-misses > span:nth-child(1) {
    font-weight: bold;
    padding-top: var(--margin-s);
  }

  .team-score span:nth-child(2) {
    font-size: var(--font-size-xxl);
    padding: var(--margin-s);
    align-self: center;
    justify-self: center;
  }

  .team-misses-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--margin-s);
    padding: var(--margin-m) var(--margin-s);
    align-items: center;
    align-content: center;
    align-self: center;
    flex: 1 1 auto;
  }

  .team-misses-list * {
    opacity: 0.3;
    font-weight: bold;
    font-size: var(--font-size-l);
    border: 3px solid var(--team-dark);
    color: transparent;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
  }

  .team-misses-list .active {
    opacity: 1;
    color: var(--team-dark);
  }

  .team-list {
    padding: var(--margin-l) var(--margin-m);
    display: grid;
    grid-template-columns: var(--margin-xl) auto;
    grid-row-gap: var(--margin-m);
    grid-column-gap: var(--margin-m);
    align-items: center;
  }

  .team-list img {
    width: 100%;
    border-radius: var(--margin-xl);
  }

  .member-name {
    font-size: var(--font-size-m);
    text-align: left;
  }

  .team-actions {
    padding: var(--margin-l) var(--margin-m);
    display: flex;
    justify-content: space-between;
    align-self: end;
  }
</style>
