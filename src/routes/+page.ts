import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  // TODO: change value
  const isAdmin = url.searchParams.get('p') === '123abc'
  return { isAdmin }
};
