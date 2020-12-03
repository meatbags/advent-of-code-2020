/** Ray Tracer */

import Vector from './util/vector';
import Plane from './util/plane';
import Ray from './util/ray';
import Clamp from './util/clamp';

class RayTracer {
  constructor() {
    this.camera = {
      position: new Vector(0, 2, 0),
      rotation: { pitch: 0, yaw: Math.PI * 0.25 },
      fov: Math.PI * 0.25,
    };
    this.planes = [
      new Plane(new Vector(0, 0, 0), new Vector(0, 1, 0)),
      //new Plane(new Vector(-5, 0, 0), new Vector(1, 0, 0)),
      //new Plane(new Vector(5, 0, 0), new Vector(-1, 0, 0)),
      //new Plane(new Vector(0, 0, -5), new Vector(0, 0, 1)),
      //new Plane(new Vector(0, 0, 5), new Vector(0, 0, 1)),
    ];
  }

  run(cvs) {
    this.cvs = cvs;
    this.cvs.width = 600;
    this.cvs.height = 300;
    this.ctx = cvs.getContext('2d');
    this.screen = {
      ratio: this.cvs.width / this.cvs.height,
      width: this.cvs.width,
      height: this.cvs.height,
      centre: {
        x: this.cvs.width / 2,
        y: this.cvs.height / 2,
      },
    };

    this.ctx.fillStyle = '#fff';
    let res = 2;
    for (let x=0; x<this.cvs.width; x+=res) {
      for (let y=0; y<this.cvs.height; y+= res) {
        this.trace(x, y, res);
      }
    }
  }

  trace(sx, sy, res) {
    // screen space to [-0.5, 0.5]
    const x = (sx - this.screen.centre.x) / this.screen.width;
    const y = (sy - this.screen.centre.y) / this.screen.height;
    const yaw = this.camera.rotation.yaw + x * this.camera.fov * this.screen.ratio;
    const pitch = this.camera.rotation.pitch - y * this.camera.fov;
    //pos.x += Math.cos(yaw + Math.PI * 0.5) * 5;
    //pos.y += Math.sin(pitch) * y;
    //pos.z += Math.cos(-yaw + Math.PI * 0.5) * 5;
    const mag = Math.cos(pitch);
    const rx = Math.cos(yaw) * mag;
    const ry = Math.sin(pitch);
    const rz = Math.cos(-yaw) * mag;
    const dir = new Vector(rx, ry, rz);
    dir.normalise();
    const ray = new Ray(this.camera.position.clone(), dir);

    let dist = -1;
    this.planes.forEach(plane => {
      const p = plane.intersectRay(ray);
      if (p !== null) {
        const d = p.distanceTo(ray.p);
        if (dist == -1 || d < dist) {
          dist = d;
        }
      }
    });

    if (dist !== -1) {
      this.ctx.fillStyle = '#fff';
      this.ctx.globalAlpha = Clamp(1 - dist / 30, 0.5, 1);
      this.ctx.fillRect(sx, sy, res, res);
    } else {
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = '#0f0';
      this.ctx.fillRect(sx, sy, res, res);
    }
  }
}

export default RayTracer;
