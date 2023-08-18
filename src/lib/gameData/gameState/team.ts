export type TeamNumber = 1 | 2;
export interface Team {
	members: string[];
	points: number;
	misses: 0 | 1 | 2 | 3;
}
