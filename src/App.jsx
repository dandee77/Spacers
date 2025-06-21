import GameStateProvider from "./GameStateProvider";
import ScreenRouter from "./ScreenRouter";

// TODO: add controls for mobile devices

export default function App() {
  return (
    <GameStateProvider>
      <ScreenRouter />
    </GameStateProvider>
  );
}
