<script>
  export let isAdmin
  import gameState from '$lib/ui/store'
  import {canRevealAnswer, getCurrentRound, revealAnswer, scoreAnswer} from '$lib/gameState'
  const onClickReveal = (answerId, withPoints) => {
    $gameState = revealAnswer($gameState, answerId, withPoints)
  }
  $: currentRound = getCurrentRound($gameState)

  const canReveal = (answerId) => canRevealAnswer($gameState, answerId)[0]
</script>

<div class="board" data-is-admin={isAdmin}>
  <h2 class="round-title">Round {$gameState.currentRoundNumber} / {$gameState.gameData.rounds.length}</h2>
  <h3 class="question-text">{currentRound.question.text}</h3>
  <table class="answers">
    <thead>
    <tr>
      <th></th>
      <th>Answer</th>
      <th>Resp.</th>
      <th>Points</th>
      {#if isAdmin}
        <th></th>
      {/if}
    </tr>
    {#each currentRound.question.answers as answer}
      <tr class:answer={true} class:hidden={!$gameState.revealedAnswers.includes(answer.id)}>
        <td class="answer-id">{answer.id}</td>
        <td class="answer-text answer-secret">{answer.text}</td>
        <td class="answer-resp answer-secret">{answer.respondentCount}</td>
        <td class="answer-score answer-secret">{scoreAnswer(currentRound, answer.id)}</td>
        {#if isAdmin}
          <td class="answer-actions">
            <button on:click={() => onClickReveal(answer.id, true)} disabled={!canReveal(answer.id)}>Award Points</button>
            <button on:click={() => onClickReveal(answer.id)} disabled={!canReveal(answer.id)}>Reveal</button>
          </td>
        {/if}
      </tr>
    {/each}
    </thead>
  </table>
  <footer>
    <div class="round-type">
      <span>Round Type:</span>
      <span>{currentRound.type}</span>
    </div>
    <div class="round-score">
      <span>Round Score:</span>
      <span>{$gameState.currentRoundScore}</span>
    </div>
  </footer>
</div>

<style>

  .board {
    border: 3px solid var(--text-color);
  }

  .round-title {
    color: var(--background-color);
    background: var(--text-color);
    margin: 0;
    padding: var(--margin-s);
    font-size: var(--font-size-m);
  }

  .question-text {
    font-size: var(--font-size-xl);
    padding: var(--margin-s);
  }

  .answers {
    width: 100%;
    border-spacing: 0;
  }

  .answers td, .answers th {
    border: 0;
  }

  .answers thead th {
    border-bottom: 3px solid var(--text-color);
  }

  .answers th {
    font-weight: bold;
  }

  .answers tr > *:nth-child(1) {
    padding-left: var(--margin-m);
  }

  .answers tr > *:last-child {
    padding-right: var(--margin-m);
  }

  .answers tr > *:nth-child(1), .answers tr > *:nth-child(2) {
    text-align: left;
  }

  .answers tr > *:nth-child(3), .answers tr > *:nth-child(4) {
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
    height: 2em;
    font-size: var(--font-size-m);
  }

  .answer.hidden td {
    position: relative;
  }

  .answer.hidden td.answer-secret:before {
    content: '???';
    color: rgba(var(--text-color), 0.3);
    position: absolute;
    top: 50%;
    right: var(--padding);
    left: var(--padding);
    transform: translateY(-50%);
    background-color: inherit;
  }

  .answer.hidden td.answer-secret:after {
    position: absolute;
    content: '';
    top: 0;
    right: var(--padding);
    left: var(--padding);
    bottom: 0;
    background-color: inherit;
    opacity: 0.7;
  }

  [data-is-admin="true"] .answer.hidden td.answer-secret:before {
    display: none;
  }

  .answer-text {
    font-weight: bold;
  }

  .answer-actions {
    display: flex;
    gap: var(--margin-s);
  }

  footer {
    display: flex;
    justify-content: space-between;
    border-top: 3px solid var(--text-color);
    padding: var(--margin-s) var(--margin-m);
  }

  .round-type, .round-score {
    display: flex;
    gap: var(--margin-s);
    text-transform: capitalize;
    justify-items: flex-end;
    align-items: center;
  }

  .round-type > *:first-child, .round-score > *:first-child {
    font-weight: bold;
  }

  .round-score > *:nth-child(2) {
    font-size: var(--font-size-l)
  }
</style>
