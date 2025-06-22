// src/pages/Game.jsx
import { useEffect, useRef, useState } from "react";
import BulletManager from "../entities/BulletManager";
import {
  vec2,
  vec2Add,
  vec2Sub,
  vec2Scale,
  vec2MoveTowards,
  vec2Normalize,
  vec2AngleDeg,
  vec2Length,
} from "../math/Vectors";

export default function Game() {
  /* ────────────────── constants ────────────────── */
  const MAX_SPEED = 10;
  const ACCEL_PER_FRAME = 0.5;
  const FRICTION = 0.9;

  /* ────────────────── state ────────────────── */
  const [playerPos, setPlayerPos] = useState(
    vec2(window.innerWidth / 2, window.innerHeight / 2)
  );
  const [rotation, setRotation] = useState(0);
  const [frame, setFrame] = useState(0); // ? used just to force re-rerender for bullets

  /* ────────────────── refs ────────────────── */
  const playerPosRef = useRef(playerPos);
  const rotationRef = useRef(rotation);
  const velocityRef = useRef(vec2(0, 0));
  const mousePosRef = useRef(vec2(0, 0));
  const wPressedRef = useRef(false);
  const bulletMgrRef = useRef(new BulletManager());

  /* ────────────────── input listeners ────────────────── */
  useEffect(() => {
    const onMouseMove = (e) => {
      mousePosRef.current = vec2(e.clientX, e.clientY);
    };
    const onKeyDown = (e) => {
      if (e.key === "w" || e.key === "W") wPressedRef.current = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "w" || e.key === "W") wPressedRef.current = false;
    };
    const onMouseDown = () => {
      bulletMgrRef.current.spawn(playerPosRef.current, rotationRef.current);
      setFrame((f) => f + 1);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  /* ────────────────── main game loop ────────────────── */
  useEffect(() => {
    let rafId;
    const loop = () => {
      if (wPressedRef.current) {
        const dir = vec2Normalize(
          vec2Sub(mousePosRef.current, playerPosRef.current)
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
        playerPosRef.current = vec2Add(
          playerPosRef.current,
          velocityRef.current
        );
        setPlayerPos(playerPosRef.current);
      }

      const dirToMouse = vec2Sub(mousePosRef.current, playerPosRef.current);
      const angleDeg = vec2AngleDeg(dirToMouse);
      if (Math.abs(angleDeg - rotationRef.current) > 0.5) {
        rotationRef.current = angleDeg;
        setRotation(angleDeg);
      }

      bulletMgrRef.current.update();

      setFrame((f) => f + 1);

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ────────────────── render ────────────────── */
  return (
    <div className="w-full h-screen bg-blue-950 relative overflow-hidden">
      <div
        className="w-15 h-15 bg-contain absolute pointer-events-none select-none"
        style={{
          backgroundImage: "url('/player-ship-texture.gif')",
          left: playerPos.x,
          top: playerPos.y,
          transform: `translate(-50%, -50%) rotate(${rotation + 84}deg)`,
          transformOrigin: "center center",
        }}
      />

      {bulletMgrRef.current.render()}

      <p className="text-white absolute top-4 left-4 text-sm">
        {wPressedRef.current ? "Accelerating…" : "Idle"} • Bullets:{" "}
        {bulletMgrRef.current.bullets.length}
      </p>
    </div>
  );
}
