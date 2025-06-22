import Bullet from "./Bullet";
import { vec2FromAngleDeg } from "../math/Vectors";

export default class BulletManager {
  constructor(maxCount = 200) {
    this.bullets = [];
    this.max = maxCount;
    this.nextId = 0;
  }

  /** Spawn from position and ship rotation (deg). */
  spawn(position, rotationDeg) {
    if (this.bullets.length >= this.max) return; // simple cap
    const dir = vec2FromAngleDeg(rotationDeg);
    this.bullets.push(new Bullet(position, dir, this.nextId++));
  }

  /** Update all, removing inactive bullets in‑place. */
  update() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.update();
      if (!b.active) this.bullets.splice(i, 1);
    }
  }

  render() {
    return this.bullets.map((b) => b.render());
  }
}
