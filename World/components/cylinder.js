import { CylinderGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createCylinder() {
  // create a geometry
  const geometry = new CylinderGeometry(1,1);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({color: "red"});

  // create a Mesh containing the geometry and material
  const cylinder = new Mesh(geometry, material);
  cylinder.position.set(3,1,4);
  cylinder.rotation.set(Math.PI/2,0,Math.PI/2);
  cylinder.scale.y=8;
  cylinder.scale.z=0.3;
  cylinder.scale.x=3;
  
  

  //cube.rotation.set(-0.5,-0.1,0.8);

  return cylinder;
}

export { createCylinder };
