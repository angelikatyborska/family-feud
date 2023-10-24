import * as localForage from "localforage";
import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

import { createGame } from "$lib/gameState";
import * as gameStateHistory from "$lib/gameStateHistory";
const initialGameState = createGame()

const createSynchronizedStore = async <T>(key: string, defaultValue: T): Promise<Writable<{} | T>> => {
  if (!browser) {
    return writable(defaultValue);
  }

  const previouslySavedValue = await localForage.getItem(key)
  const initialValue = previouslySavedValue || defaultValue

  const store = writable(initialValue);
  gameStateHistory.push(initialValue)

  store.subscribe(async (val) => {
    await localForage.setItem(key, val)
    localStorage.setItem(key + 'UpdatedAt', (new Date()).toString())
  })

  window.addEventListener('storage', async (event) => {
    if (event.key === key + 'UpdatedAt') {
      const currentValue: T | null = await localForage.getItem(key)
      if (currentValue) {
        store.set(currentValue)
      }
    }
  });

  const set = (value: T) => {
    store.set(value)
    gameStateHistory.push(value)
}

  return { ...store, set: set }
}

const gameStateStore = await createSynchronizedStore('familyFeudGameState', initialGameState)
export default gameStateStore
