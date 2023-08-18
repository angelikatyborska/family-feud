import type { Question } from '$lib/gameData/question';

export type RoundNumber = number;

export interface Round {
	number: RoundNumber;
	question: Question;
	type: 'normal' | 'inverted' | 'double';
}
