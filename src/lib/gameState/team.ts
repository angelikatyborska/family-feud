export type TeamNumber = 1 | 2;

export interface Member {
	name: string
	image: any
}

export interface Team {
	number: TeamNumber
	name: string
	members: Member[];
	points: number;
	misses: 0 | 1 | 2 | 3;
}
