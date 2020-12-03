/** Plane */

import Vector from './vector';

class Plane {
  constructor(point, normal) {
    this.p = point;
    this.n = normal;
    this.dist = this.n.dot(this.p);
  }

  distanceToPoint(p) {
    return this.n.dot(p) - this.dist;
  }

  intersectRay(ray) {
    const vn = this.n.dot(ray.v);
    if (vn == 0)
      return null;
    const dp = this.p.clone();
    dp.sub(ray.p);
    const t = this.n.dot(dp) / vn;
    if (t < 0 || t > 1000)
      return null;
    const res = ray.v.clone();
    res.scale(t);
    res.add(ray.p);
    return res;
  }
}

export default Plane;
