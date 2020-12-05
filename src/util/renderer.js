/** Renderer */

import * as THREE from 'three';
import Keyboard from './keyboard';

class Renderer {
  constructor() {
    this.domElement = document.querySelector('#canvas');
    this.renderer = new THREE.WebGLRenderer({canvas: this.domElement});
    const w = 600;
    const h = 400;
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0xeeeeff);
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.set(0, 10, 0);
    this.scene = new THREE.Scene();
    this.time = {now: Date.now()};
    this.keyboard = new Keyboard(k => {});
    this.initScene();
    this.loop();
  }

  initScene() {
    this.scene = new THREE.Scene();

    // meshes
    this.mesh = {};
    this.mesh.floor = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1000, 1, 1000),
      new THREE.MeshStandardMaterial({color:0xffffff})
    );
    this.scene.add(this.mesh.floor);

    // lighting
    const p = new THREE.PointLight(0xffffff, 1, 100, 2);
    const a = new THREE.AmbientLight(0xffffff, 0.5);
    p.position.set(0, 10, 0);
    this.scene.add(a, p);
  }

  update(delta) {

  }

  loop() {
    requestAnimationFrame(() => { this.loop});
    const now = Date.now();
    const d = Math.max(0.1, (now - this.time.now) / 1000);
    this.time.now = now;
    this.update(d);
    this.renderer.render(this.scene, this.camera);
  }
}

export default Renderer;
