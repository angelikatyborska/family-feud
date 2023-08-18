export type TeamNumber = 1 | 2;
export interface Team {
	number: TeamNumber
	name: string
	members: string[];
	points: number;
	misses: 0 | 1 | 2 | 3;
}
