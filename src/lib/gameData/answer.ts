export type AnswerId = number;

export interface Answer {
	id: AnswerId;
	text: string;
	respondentCount: number;
}
