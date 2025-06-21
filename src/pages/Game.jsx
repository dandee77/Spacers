import useGameState from "../UseGameState";
import { GAME_STATES } from "../utils/utils";
import { useEffect, useState } from "react";

export default function Game() {
  const { setGameState } = useGameState();
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w" || e.key === "W") setIsMoving(true);
    };
    const handleKeyUp = (e) => {
      if (e.key === "w" || e.key === "W") setIsMoving(false);
    };
    const handleMouseMove = (e) => {
      if (isMoving) {
        setPlayerPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMoving]);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <div
        className="w-10 h-10 bg-yellow-400 rounded-full absolute pointer-events-none"
        style={{
          left: playerPosition.x - 20 + "px",
          top: playerPosition.y - 20 + "px",
        }}
      ></div>

      <p className="text-white absolute top-4 left-4">
        {isMoving ? "W is pressed — tracking!" : "Hold W to move the circle"}
      </p>
    </div>
  );
}
