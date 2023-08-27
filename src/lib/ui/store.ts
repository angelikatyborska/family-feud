import * as localForage from "localforage";
import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

import { createGame } from "$lib/gameState";
const initialGameState = createGame()

const createSynchronizedStore = async <T>(key: string, defaultValue: T): Promise<Writable<{} | T>> => {
  if (!browser) {
    return writable(defaultValue);
  }

  const previouslySavedValue = await localForage.getItem(key)

  const store = writable(previouslySavedValue || defaultValue);

  store.subscribe(async (val) => {
    await localForage.setItem(key, val)
  })

  // TODO: figure out how to synchronize two tabs

  // window.addEventListener('storage', () => {
  //   const storedValueStr = localStorage.getItem(key);
  //   if (storedValueStr == null) return;
  //
  //   const localValue: T = JSON.parse(storedValueStr)
  //   if (localValue !== get(store)) store.set(localValue);
  // });

  return store;
}

const gameStateStore = await createSynchronizedStore('familyFeudGameState', initialGameState)
export default gameStateStore
