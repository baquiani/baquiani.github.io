import { ConeGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createCone() {
  // create a geometry
  const geometry = new ConeGeometry(3,7);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: "green"});

  // create a Mesh containing the geometry and material
  const cone = new Mesh(geometry, material);
  cone.position.set( 8.67147037085611, 9.717134215842751,-46.9352003578964);
  cone.rotation.set(-0.024434242681177304, 0.01633760577789475,-1.5846462304857856);
  cone.scale.set(2.628709636603686,3.6486783153334086,0.24280605800646005);
  

  return cone;
}

export { createCone };
