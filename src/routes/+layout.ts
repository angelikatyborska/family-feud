import type { LayoutLoad } from './$types';
import {createGame} from "$lib/gameState";

export const load: LayoutLoad = async () => {
  return {
    gameState: createGame()
  };
};
