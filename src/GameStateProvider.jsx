import { useState, useMemo } from "react";
import { GameStateContext } from "./GameStateContext";
import { GAME_STATES } from "./utils/utils";

export default function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState(GAME_STATES.HOME);
  const value = useMemo(() => ({ gameState, setGameState }), [gameState]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
