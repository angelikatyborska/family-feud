import type { GameState } from "$lib/gameState";
import { browser } from '$app/environment';

const maxLength = 10

declare global {
  interface Window {
    familyFeudHistory: GameState[]
  }
}

if (browser) {
  window.familyFeudHistory = []
}

export const push = (gameState: GameState) => {
  window.familyFeudHistory = [gameState, ...window.familyFeudHistory]
  window.familyFeudHistory = window.familyFeudHistory.slice(0, maxLength)
}

export const pop = (): GameState => {
  const gameState = window.familyFeudHistory[1]

  if (gameState) {
    window.familyFeudHistory = window.familyFeudHistory.slice(2)
  }

  return gameState
}
