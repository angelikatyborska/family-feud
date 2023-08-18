import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	console.log(params);

	return {
		starTreks: [
			{
				title: 'The Next Generation',
				code: 'tng'
			},
			{
				title: 'Deep Space Nine',
				code: 'ds9'
			}
		]
	};
};
