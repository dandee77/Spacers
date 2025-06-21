// import useGameState from "../UseGameState";
// import { GAME_STATES } from "../utils/utils";
import { useEffect, useState, useRef } from "react";
import {
  vec2,
  vec2Add,
  vec2Sub,
  vec2Normalize,
  vec2Scale,
  vec2MoveTowards,
  vec2Length,
} from "../math/Vectors";

export default function Game() {
  /* ---------- refs & state ---------- */
  const [position, setPosition] = useState(
    vec2(window.innerWidth / 2, window.innerHeight / 2)
  );
  const positionRef = useRef(position);
  const velocityRef = useRef(vec2(0, 0));
  const mousePosRef = useRef(vec2(0, 0));
  const wPressedRef = useRef(false);
  const rafRef = useRef(0);

  /* ---------- constants you can tweak ---------- */
  const MAX_SPEED = 10;
  const ACCEL_PER_FRAME = 0.5;
  const FRICTION = 0.9;

  /* ---------- input listeners ---------- */
  useEffect(() => {
    const down = (e) => {
      if (e.key === "w" || e.key === "W") wPressedRef.current = true;
    };
    const up = (e) => {
      if (e.key === "w" || e.key === "W") wPressedRef.current = false;
    };
    const move = (e) => {
      mousePosRef.current = vec2(e.clientX, e.clientY);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  /* ---------- main loop ---------- */
  useEffect(() => {
    const loop = () => {
      if (wPressedRef.current) {
        const dir = vec2Normalize(
          vec2Sub(mousePosRef.current, positionRef.current)
        );
        const targetVel = vec2Scale(dir, MAX_SPEED);

        velocityRef.current = vec2MoveTowards(
          velocityRef.current,
          targetVel,
          ACCEL_PER_FRAME
        );
      } else {
        velocityRef.current = vec2Scale(velocityRef.current, FRICTION);
        if (vec2Length(velocityRef.current) < 0.05)
          velocityRef.current = vec2(0, 0);
      }

      if (velocityRef.current.x || velocityRef.current.y) {
        positionRef.current = vec2Add(positionRef.current, velocityRef.current);
        setPosition(positionRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ---------- render ---------- */
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <div
        className="w-10 h-10 rounded-full bg-yellow-400 absolute pointer-events-none"
        style={{
          left: position.x - 20 + "px",
          top: position.y - 20 + "px",
        }}
      />
      <p className="text-white absolute top-4 left-4">
        {wPressedRef.current
          ? "Accelerating toward mouse…"
          : "Release W to coast / stop"}
      </p>
    </div>
  );
}
