import { createContext, useContext, useState, useMemo } from "react";
import { GAME_STATES } from "./utils/utils";

export const GameStateContext = createContext({
  gameState: GAME_STATES.HOME,
  setGameState: () => {},
});

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState(GAME_STATES.HOME);

  const value = useMemo(() => ({ gameState, setGameState }), [gameState]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}
