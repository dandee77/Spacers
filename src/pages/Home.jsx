import useGameState from "../UseGameState";
import { GAME_STATES } from "../utils/utils";

export default function Home() {
  const { setGameState } = useGameState();
  return (
    <div className="w-full h-screen bg-blue-950 flex flex-col justify-center items-center">
      <h1 className="mb-72 text-5xl font-extrabold text-blue-400 uppercase">
        Spacers
      </h1>
      <button
        className="w-2xs h-11 bg-blue-400 rounded-2xl text-lg font-extrabold uppercase text-blue-950 hover:bg-blue-200 transition-all duration-200"
        onClick={() => setGameState(GAME_STATES.GAME)}
      >
        Start
      </button>
    </div>
  );
}
