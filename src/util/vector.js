/** Vector */

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  normalise() {
    const mag = this.length();
    if (mag === 0) {
      return;
    }
    this.x /= mag;
    this.y /= mag;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  distanceTo(p) {
    const x = p.x - this.x;
    const y = p.y - this.y;
    const z = p.z - this.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }
}

export default Vector;
