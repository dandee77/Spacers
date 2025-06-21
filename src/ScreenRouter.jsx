import useGameState from "./UseGameState";
import Home from "./pages/home";
import Game from "./pages/Game";
import { GAME_STATES } from "./utils/utils";

export default function ScreenRouter() {
  const { gameState } = useGameState();

  switch (gameState) {
    case GAME_STATES.HOME:
      return <Home />;
    case GAME_STATES.GAME:
      return <Game />;
    default:
      return null;
  }
}
