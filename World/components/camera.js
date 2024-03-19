import { PerspectiveCamera } from '../../build/three.module.js';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    10000, // far clipping plane
  );

  // move the camera back so we can view the scene
  //camera.position.set(0,0 ,0);
  //camera.rotation.set(1.55,1.6,0);
  //camera.position.set(7,0 ,20);
  //camera.rotation.set(0,0,1.5);
  camera.position.set(0,-20,40);
  camera.rotation.set(0,0,0);
 

  return camera;
}

export { createCamera };
