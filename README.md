# Family Feud

This is a barebones app for playing Family Feud over a video call.
I built it because I really enjoyed episodes of the podcast JS Party in which they play Frontend Feud (Family Feud with questions about frontend development).
I wanted to play that with my team at work too. I stole the questions from the podcast.

I don't expect anyone else to use this app. It was written just for me and the setup is not user-friendly.

## Setup
    
1. Install deps
    ```bash
    npm install
    ```
2. Update team information and questions in `src/lib/gameState.ts`. Upload team photos to `src/lib/ui/assets`.
3. Update host panel password in `src/routes/+page.ts`.
4. Run the server
    ```bash
    npm run dev
    ```
5. Open one window with the players view (root path), and another with the host view (appending `?p=` and the password to the URL).
6. Reset the game state from the host view to see new game state (game state is persisted in indexDB so you don't lose it if you close the browser).
