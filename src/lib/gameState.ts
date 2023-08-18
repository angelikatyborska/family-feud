import type { Team, TeamNumber } from '$lib/gameData/gameState/team';
import type { GameData } from '$lib/gameData';
import type { Round, RoundNumber } from '$lib/gameData/round';
import type { AnswerId } from '$lib/gameData/answer';

export interface GameState {
	team1: Team;
	team2: Team;
	gameData: GameData;
	currentRoundNumber: RoundNumber;
	revealedAnswers: AnswerId[];
	currentRoundScore: number;
}

export function createGame(): GameState {
	return {
		team1: {
			members: ['Michał', 'Luisa'],
			points: 0,
			misses: 0
		},
		team2: {
			members: ['James', 'Claudine', 'Jeremie'],
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
						text: 'Name your favorite programming languge that is not HTML, CSS, or JS.',
						answers: [
							{ id: 1, text: 'Python', respondentCount: 33 },
							{ id: 2, text: 'Typescript', respondentCount: 20 },
							{ id: 3, text: 'Rust', respondentCount: 19 },
							{ id: 4, text: 'Go', respondentCount: 11 },
							{ id: 5, text: 'C#', respondentCount: 9 },
							{ id: 6, text: 'PHP', respondentCount: 6 }
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

function scoreAnswer(round: Round, answerId: AnswerId): number {
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

// TODO: reveal answer without awarding points

export function revealAnswer(gameState: GameState, answerId: AnswerId): GameState {
	const [canReveal, reason] = canRevealAnswer(gameState, answerId);

	if (canReveal) {
		const currentRound = getCurrentRound(gameState);

		return {
			...gameState,
			revealedAnswers: [...gameState.revealedAnswers, answerId],
			currentRoundScore: gameState.currentRoundScore + scoreAnswer(currentRound, answerId)
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

		return {
			...gameState,
			currentRoundScore: 0,
			revealedAnswers: [],
			currentRoundNumber: gameState.currentRoundNumber + 1
		};
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
