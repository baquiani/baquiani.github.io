import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createCube2() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: "purple"});

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.tick = () => cube.rotation.x += 0.01;
  return cube;
}

export { createCube2 };
