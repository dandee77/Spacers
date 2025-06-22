import { vec2Add, vec2Scale } from "../math/Vectors";

const BULLET_SPEED = 14; // px per frame
const OFFSCREEN_MARGIN = 60; // pixels beyond screen before despawn

export default class Bullet {
  constructor(position, direction, id) {
    this.pos = { ...position }; // {x,y}
    this.dir = { ...direction }; // unit vector
    this.id = id;
    this.active = true;
  }

  /** Move one frame. */
  update() {
    this.pos = vec2Add(this.pos, vec2Scale(this.dir, BULLET_SPEED));
    if (this.isOffScreen()) this.active = false;
  }

  /** Simple off‑screen test. */
  isOffScreen() {
    return (
      this.pos.x < -OFFSCREEN_MARGIN ||
      this.pos.x > window.innerWidth + OFFSCREEN_MARGIN ||
      this.pos.y < -OFFSCREEN_MARGIN ||
      this.pos.y > window.innerHeight + OFFSCREEN_MARGIN
    );
  }

  /** React JSX element for DOM rendering. */
  render() {
    return (
      <div
        key={this.id}
        className="absolute bg-yellow-300 rounded-full pointer-events-none"
        style={{
          width: 6,
          height: 6,
          left: this.pos.x,
          top: this.pos.y,
          transform: "translate(-50%,-50%)",
        }}
      />
    );
  }
}
