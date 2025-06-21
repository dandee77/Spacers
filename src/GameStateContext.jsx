import { createContext } from "react";
import { GAME_STATES } from "./utils/utils";

export const GameStateContext = createContext({
  gameState: GAME_STATES.HOME,
  setGameState: () => {},
});
