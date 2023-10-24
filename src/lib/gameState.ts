import type { Team, TeamNumber } from '$lib/gameState/team';
import type { GameData } from '$lib/gameData';
import type { Round, RoundNumber } from '$lib/gameData/round';
import type { AnswerId } from '$lib/gameData/answer';

import michalImage from '$lib/ui/assets/michal.png'
import luisaImage from '$lib/ui/assets/luisa.jpg'
import jamesImage from '$lib/ui/assets/james.png'
import claudineImage from '$lib/ui/assets/claudine.jpg'
import jeremieImage from '$lib/ui/assets/jeremie.jpg'

export interface GameState {
  team1: Team;
  team2: Team;
  gameData: GameData;
  currentRoundNumber: RoundNumber;
  revealedAnswers: AnswerId[];
  currentRoundScore: number;
}

export function createGame(): GameState {
  const michal = {name: 'Michał', image: michalImage}
  const luisa = {name: 'Luisa', image: luisaImage}
  const james = {name: 'James', image: jamesImage}
  const claudine = {name: 'Claudine', image: claudineImage}
  const jeremie = {name: 'Jeremie', image: jeremieImage}
  return {
    team1: {
      number: 1,
      name: 'Fierce Frogs',
      members: [
        james,
        luisa
      ],
      points: 0,
      misses: 0
    },
    team2: {
      number: 2,
      name: 'Tough Toads',
      members: [
        michal,
        jeremie,
        claudine
      ],
      points: 0,
      misses: 0
    },
    currentRoundNumber: 1,
    currentRoundScore: 0,
    revealedAnswers: [],
    gameData: {
      rounds: [
        {
          number: 1,
          type: 'normal',
          question: {
            id: 'fav-prog-lang',
            text: 'Name your favorite programming language that is not HTML, CSS, or JS.',
            answers: [
              { id: 1, text: 'Python', respondentCount: 33 },
              { id: 2, text: 'Typescript', respondentCount: 20 },
              { id: 3, text: 'Rust', respondentCount: 19 },
              { id: 4, text: 'Go', respondentCount: 11 },
              { id: 5, text: 'C#', respondentCount: 9 },
              { id: 6, text: 'PHP', respondentCount: 6 }
            ]
          }
        },
        // {
        //   number: 2,
        //   type: 'normal',
        //   question: {
        //     id: 'who-teaches-frontend',
        //     text: 'Name someone (org or person) who helps many people learn HTML, CSS, and/or JS.',
        //     answers: [
        //       { id: 1, text: 'Wes Bos', respondentCount: 49 },
        //       { id: 2, text: 'Chris Coyier', respondentCount: 13 },
        //       { id: 3, text: 'JS Party', respondentCount: 7 },
        //       { id: 4, text: 'FreeCodeCamp', respondentCount: 6 },
        //       { id: 5, text: 'Brad Traversy', respondentCount: 5 }
        //     ]
        //   }
        // },
        {
          number: 2,
          type: 'inverted',
          question: {
            id: 'commit-emoji',
            text: 'Which emoji do you use most often in commit messages?',
            answers: [
              { id: 1, text: 'None', respondentCount: 42 },
              { id: 2, text: 'Smiles 😄 😅 😎 😊 😇', respondentCount: 19 },
              { id: 3, text: 'Poop 💩', respondentCount: 9 },
              { id: 4, text: 'Shrugs 🤷‍♀️ 🤷 🤷‍♂️', respondentCount: 8 },
              { id: 5, text: 'Rocket 🚀', respondentCount: 8 },
              { id: 6, text: 'Celebrations 🎉 🥳 🎊 🙌', respondentCount: 7 },
              { id: 7, text: 'Thumbs up 👍', respondentCount: 6 }
            ]
          }
        },
        {
          number: 3,
          type: 'normal',
          question: {
            id: 'website-frequented-by-devs',
            text: 'Name a website frequented by software developers.',
            answers: [
              { id: 1, text: 'Stack Overflow', respondentCount: 65 },
              { id: 2, text: 'MDN', respondentCount: 22 },
              { id: 3, text: 'GitHub', respondentCount: 12 },
              { id: 4, text: 'Hacker News', respondentCount: 9 },
              { id: 5, text: 'Google', respondentCount: 8 },
              { id: 6, text: 'Twitter', respondentCount: 5 }
            ]
          }
        },
        {
          number: 4,
          type: 'normal',
          question: {
            id: 'place-work-outside',
            text: 'Name a place (outside your house) where you like to code/work.',
            answers: [
              { id: 1, text: 'Coffee shop / cafe', respondentCount: 38 },
              { id: 2, text: 'Park / garden / yard', respondentCount: 26 },
              { id: 3, text: 'The office', respondentCount: 21 },
              { id: 4, text: 'The library', respondentCount: 14 },
              { id: 5, text: 'The bar / pub', respondentCount: 6 },
              { id: 6, text: 'Nowhere / don\'t leave the house', respondentCount: 5 }
            ]
          }
        },
        {
          number: 5,
          type: 'double',
          question: {
            id: 'project-idea-what-do',
            text: 'What\'s the first thing you do when you think of a new project idea?',
            answers: [
              { id: 1, text: 'Write down / add to list', respondentCount: 36 },
              { id: 2, text: 'Research / plan / brainstorm', respondentCount: 31 },
              { id: 3, text: 'Start / git repo / code', respondentCount: 24 },
              { id: 4, text: 'Name it / buy domain', respondentCount: 17 },
              { id: 5, text: 'Draw / whiteboard / prototype', respondentCount: 14 },
              { id: 6, text: 'Tell someone', respondentCount: 10 }
            ]
          }
        }
      ]
    }
  };
}

export function getCurrentRound(gameState: GameState): Round {
  const currentRound = gameState.gameData.rounds.find(
    (round) => round.number === gameState.currentRoundNumber
  );

  if (currentRound) {
    return currentRound;
  } else {
    throw 'invalid current round number';
  }
}

export function scoreAnswer(round: Round, answerId: AnswerId): number {
  const answer = round.question.answers.find((answer) => answer.id == answerId);
  if (!answer) {
    throw 'invalid answer id for this round';
  }

  if (round.type === 'double') {
    return answer.respondentCount * 2;
  }
  if (round.type === 'inverted') {
    return answer.id * 10;
  }

  return answer.respondentCount;
}

export function canRevealAnswer(gameState: GameState, answerId: AnswerId): [boolean, string?] {
  if (gameState.revealedAnswers.includes(answerId)) {
    return [false, 'already revealed'];
  }

  const currentRound = getCurrentRound(gameState);

  if (!currentRound.question.answers.find((answer) => answer.id === answerId)) {
    return [false, 'current round doesnt contain answer with this id'];
  }

  return [true, undefined];
}

export function revealAnswer(gameState: GameState, answerId: AnswerId, withPoints: boolean): GameState {
  const [canReveal, reason] = canRevealAnswer(gameState, answerId);

  if (canReveal) {
    const currentRound = getCurrentRound(gameState);

    return {
      ...gameState,
      revealedAnswers: [...gameState.revealedAnswers, answerId],
      currentRoundScore: gameState.currentRoundScore + (withPoints ? scoreAnswer(currentRound, answerId) : 0)
    };
  } else {
    throw reason;
  }
}

export function canAddMiss(gameState: GameState, teamNumber: TeamNumber): boolean {
  return (
    (teamNumber === 1 && gameState.team1.misses < 3) ||
    (teamNumber === 2 && gameState.team2.misses < 3)
  );
}

function missInc(x: 0 | 1 | 2 | 3): 1 | 2 | 3 {
  if (x === 0) {
    return 1;
  }
  if (x === 1) {
    return 2;
  }
  return 3;
}

export function addMiss(gameState: GameState, teamNumber: TeamNumber): GameState {
  if (canAddMiss(gameState, teamNumber)) {
    if (teamNumber === 1) {
      return {
        ...gameState,
        team1: { ...gameState.team1, misses: missInc(gameState.team1.misses) }
      };
    } else {
      return {
        ...gameState,
        team2: { ...gameState.team2, misses: missInc(gameState.team2.misses) }
      };
    }
  } else {
    throw 'cannot add a miss';
  }
}

export function canFinalizeRound(gameState: GameState): [boolean, string?] {
  const currentRound = getCurrentRound(gameState);
  if (currentRound.question.answers.length === gameState.revealedAnswers.length) {
    return [true, undefined];
  } else if (gameState.team1.misses < 3 && gameState.team2.misses < 3) {
    return [false, 'teams have remaining guesses'];
  } else {
    return [false, 'not all answers were revealed yet'];
  }
}

export function finalizeRound(gameState: GameState, awardPointsTo: TeamNumber): GameState {
  const [canFinalize, reason] = canFinalizeRound(gameState);
  if (canFinalize) {
    if (awardPointsTo === 1) {
      gameState = {
        ...gameState,
        team1: {
          ...gameState.team1,
          points: gameState.currentRoundScore + gameState.team1.points
        }
      };
    } else {
      gameState = {
        ...gameState,
        team2: {
          ...gameState.team2,
          points: gameState.currentRoundScore + gameState.team2.points
        }
      };
    }

    gameState = {...gameState, currentRoundScore: 0}

    if ( gameState.currentRoundNumber == gameState.gameData.rounds.length ) {
      // game over
      return gameState
    } else {
      return {
        ...gameState,
        team1: {...gameState.team1, misses: 0},
        team2: {...gameState.team2, misses: 0},
        currentRoundScore: 0,
        revealedAnswers: [],
        currentRoundNumber: gameState.currentRoundNumber + 1
      };
    }
  } else throw reason;
}

export function isGameOver(gameState: GameState): boolean {
  return gameState.currentRoundNumber > gameState.gameData.rounds.length;
}

export function getWinner(gameState: GameState): Team | undefined {
  if (isGameOver(gameState)) {
    if (gameState.team1.points > gameState.team2.points) {
      return gameState.team1;
    } else if (gameState.team1.points < gameState.team2.points) {
      return gameState.team2;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
