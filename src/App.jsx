import { GameStateProvider } from "./GameStateContext";
import ScreenRouter from "./ScreenRouter";

export default function App() {
  return (
    <GameStateProvider>
      <ScreenRouter />
    </GameStateProvider>
  );
}
