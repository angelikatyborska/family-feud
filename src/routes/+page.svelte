<script lang="ts">
  import type { PageData } from './$types';
  import { getCurrentRound } from '$lib/gameState'

  export let data: PageData;
  $: currentRound = getCurrentRound(data.gameState)
</script>

<div class="page">
  <h1>Frontend Feud*</h1>
  <p>* Stolen from the JS Party podcast</p>
  <div class="game">
    <div class="team">
      <h2 class="team-name">Team 1</h2>
      <div class="team-score">
        <span>Score</span>
        <span>{data.gameState.team1.points}</span>
      </div>
      {#each data.gameState.team1.members as member}
        <div>{member}</div>
      {/each}
    </div>
    <div class="board">
      <h2 class="round-title">Round {data.gameState.currentRoundNumber}</h2>
      <p>Type: {currentRound.type}</p>
      <h3 class="question-text">{currentRound.question.text}</h3>
      <table class="answers">
        <thead>
        <tr>
          <td></td>
          <td>Answer</td>
          <td>Respondent Count</td>
          <td>Point Value</td>
        </tr>
        {#each currentRound.question.answers as answer}
          <tr>
            <td>{answer.id}</td>
            <td>{answer.text}</td>
            <td>{answer.respondentCount}</td>
            <td>{0}</td>
          </tr>
        {/each}
        </thead>
      </table>
      <p class="round-points">
        Score: {data.gameState.currentRoundScore}
      </p>
    </div>
    <div class="team">
      <h2 class="team-name">Team 2</h2>
      <div class="team-score">
        <span>Score</span>
        <span>{data.gameState.team1.points}</span>
      </div>
      {#each data.gameState.team2.members as member}
        <div>{member}</div>
      {/each}
    </div>
  </div>
</div>
<h2>Debug output</h2>
<code>
<pre>
{JSON.stringify(data.gameState, null, 2)}
</pre>
</code>

<style>
  .page {
    text-align: center;
  }

  .game {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  .team {

  }

  .team-name {
    color: tomato
  }

  .answers {
    width: 100%;
  }

  .answers td:nth-child(1), .answers td:nth-child(2) {
    text-align: left;
  }

  .answers td:nth-child(3), .answers td:nth-child(4) {
    text-align: right;
  }
</style>
