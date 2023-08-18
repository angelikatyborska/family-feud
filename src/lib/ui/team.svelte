<script>
  export let team
</script>

<div class:team={true} class:team-1={team.number === 1} class:team-2={team.number === 2}>
  <h2 class="team-name">{team.name}</h2>
  <div class="team-score">
    <span>Score</span>
    <span>{team.points}</span>
  </div>
  {#each team.members as member}
    <div>{member}</div>
  {/each}
</div>

<style>
  .team-1 {
    --team-dark: var(--team-1-dark);
    --team-light: var(--team-1-light);
  }

  .team-2 {
    --team-dark: var(--team-2-dark);
    --team-light: var(--team-2-light);
  }

  .team {
    display: grid;
    grid-template-rows: auto;
    align-content: start;
    justify-content: center;
    border: 3px solid var(--team-light);
    color: var(--team-dark);
    padding: var(--margin-m);
  }

  .team-name {
    font-size: var(--font-size-xl);
    color: var(--team-light);
  }

  .team-score {
    display: flex;
    flex-direction: column;
    border: 3px solid var(--team-light);
    max-width: 10em;
    align-self: center;
  }

  .team-score span:nth-child(1) {
    font-weight: bold;
    background: var(--team-light);
    padding: var(--margin-s);
    color: var(--background-color)
  }

  .team-score span:nth-child(2) {
    font-size: var(--font-size-l);
    padding: var(--margin-s);
    min-width: 1em;
  }
</style>
