import { useContext } from "react";
import { GameStateContext } from "./GameStateContext";

export default function useGameState() {
  return useContext(GameStateContext);
}
