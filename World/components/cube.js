import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: "purple"});

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  const cubeB = new Mesh(geometry, material);
  cube.add(cubeB);
  cubeB.position.z = 15.9;
  cubeB.position.y=1;
  cubeB.scale.x=1;
  cubeB.scale.y=0.02;
  cubeB.scale.z=15;
  

  //cube.rotation.set(-0.5,-0.1,0.8);
  cube.position.set(-30.500501467690185,0.9549407830148433,0.8115085434692757);
  cube.rotation.set(-1.5592763711884052,0.0057265073441882565,-1.5758757963852783);

  return cube;
}

export { createCube };
