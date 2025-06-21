import GameStateProvider from "./GameStateProvider";
import ScreenRouter from "./ScreenRouter";

export default function App() {
  return (
    <GameStateProvider>
      <ScreenRouter />
    </GameStateProvider>
  );
}
