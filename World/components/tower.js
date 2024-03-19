import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createTower() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: "purple"});

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  return cube;
}

export { createTower };