import type { Answer } from '$lib/gameData/answer';
export interface Question {
	id: string;
	text: string;
	answers: Answer[];
}
