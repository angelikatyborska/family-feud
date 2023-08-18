<script>
  import gameState from '$lib/ui/store'
  import {getCurrentRound, revealAnswer, scoreAnswer} from '$lib/gameState'
  const onClickReveal = (answerId) => {
    $gameState = revealAnswer($gameState, answerId)
  }
  $: currentRound = getCurrentRound($gameState)
</script>

<div class="board">
  <h2 class="round-title">Round {$gameState.currentRoundNumber}</h2>
  <p>Type: {currentRound.type}</p>
  <h3 class="question-text">{currentRound.question.text}</h3>
  <table class="answers">
    <thead>
    <tr>
      <th></th>
      <th>Answer</th>
      <th>Resp.</th>
      <th>Points</th>
      <th></th>
    </tr>
    {#each currentRound.question.answers as answer}
      <tr class:answer={true} class:hidden={!$gameState.revealedAnswers.includes(answer.id)}>
        <td class="answer-id">{answer.id}</td>
        <td class="answer-text answer-secret">{answer.text}</td>
        <td class="answer-resp answer-secret">{answer.respondentCount}</td>
        <td class="answer-score answer-secret">{scoreAnswer(currentRound, answer.id)}</td>
        <td class="answer-action"><button on:click={onClickReveal(answer.id)}>Reveal</button></td>
      </tr>
    {/each}
    </thead>
  </table>
  <p class="round-points">
    Score: {$gameState.currentRoundScore}
  </p>
</div>

<style>

  .board {
    border: 3px solid var(--text-color);
    padding: var(--margin-m);
  }

  .board th {
    background: var(--text-color);
    color: var(--background-color);
    font-weight: bold;
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

  .answer:nth-child(2n) td {
    background-color: var(--background-color);
  }

  .answer:nth-child(2n + 1) td {
    background-color: var(--background-color2);
  }

  .answer td {
    --padding: var(--margin-xs);
    padding: var(--padding);
  }

  .answer.hidden td {
    position: relative;
  }

  .answer.hidden td.answer-secret:before {
    content: '???';
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    bottom: var(--padding);
    left: var(--padding);
    background-color: inherit;
  }
</style>
