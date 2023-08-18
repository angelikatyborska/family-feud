import { writable } from 'svelte/store';
import {createGame} from "$lib/gameState";

const initialGameState = createGame()
const gameStateStore = writable(initialGameState);

export default gameStateStore
