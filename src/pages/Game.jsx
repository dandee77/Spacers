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
  vec2AngleDeg,
} from "../math/Vectors";

export default function Game() {
  /* ---------- refs & state ---------- */
  const [position, setPosition] = useState(
    vec2(window.innerWidth / 2, window.innerHeight / 2)
  );
  const [rotation, setRotation] = useState(0);

  const positionRef = useRef(position);
  const velocityRef = useRef(vec2(0, 0));
  const mousePosRef = useRef(vec2(0, 0));
  const wPressedRef = useRef(false);
  const rotationRef = useRef(0);
  const rafRef = useRef(0);

  /* ---------- constants you can tweak ---------- */
  const MAX_SPEED = 5;
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

      const dirToMouse = vec2Sub(mousePosRef.current, positionRef.current);
      const angleDeg = vec2AngleDeg(dirToMouse);

      if (Math.abs(angleDeg - rotationRef.current) > 0.5) {
        rotationRef.current = angleDeg;
        setRotation(angleDeg);
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
    <div className="w-full h-screen bg-blue-950 relative overflow-hidden">
      <div
        className="w-15 h-15 bg-contain absolute pointer-events-none"
        style={{
          backgroundImage: `url('/player-ship-texture.gif')`,
          left: position.x - 20 + "px",
          top: position.y - 20 + "px",
          transform: `translate(-50%, -50%) rotate(${rotation + 84}deg)`, // ? +84 as of now as the player ship texture is not cetered properly
          transformOrigin: "center center",
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
