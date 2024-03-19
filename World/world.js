import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import {createCone } from './components/cone.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createCylinder } from './components/cylinder.js';
import { createControls } from './systems/controls.js';
import { Loop } from './systems/Loop.js';
import { createTransform } from './systems/transform.js';
import {createCube2} from './components/cube2.js';
import { saveObjectLocation,loadObjectLocation,clearObjectLocation,saveObjectID, getPositionSum } from './systems/objectTransform.js';


import { createTorus } from './components/torus.js';
import { createTower } from './components/tower.js';
// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let controls;
let x,y,z;
let loop;
let bool;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    
    const controls = createControls(camera, renderer.domElement);
    //const controls = createTrackball(camera,renderer.domElement);
    const transform = createTransform(camera, renderer.domElement);
    container.append(renderer.domElement);
    loop.updatables.push(controls);
    
    
    //controls.update();
    


    const cube = createCube();
    const {ambientLight, mainLight} = createLights();
    
    cube.scale.x=10;
    cube.scale.y=10;
    cube.scale.z = 0.3;

    //controls.target.copy = (camera.position);

    const cube2 = createCube();
    cube2.position.set(0,0,2);
    cube2.scale.set(1,0.5,1);
    cube2.rotation.set(0,0,0);
    cube2.material.color.set("red");

    const cube3 = createCube2();
    cube3.material.color.set("yellow");
    cube3.position.set(-30.570123947508044,6.832424138852113,0.3376777189547253);
    cube3.rotation.set( -0.1765913732089909,0.40883212312771366 ,-1.148867155498139);
    cube3.scale.set( 3,3 ,3);
    
    const cube4 = cube.clone();
    cube4.position.set( -30.65053676628677, 1.2142002429160463,0.8121557035004381);
    cube4.rotation.set( -1.5701143498004013, -0.005813871894080903,1.5666077831747336)
    const floor = createCube2();
    floor.scale.set(413,1,616);
    floor.material.color.set("red")
    scene.add(floor);

    camera.position.set(0,20,120);
    loop.updatables.push(cube3);
    
    
    const cone = createCone();
    const cylinder = createCylinder();
    const cone2 = cone.clone();
    scene.add(cone2);
    cylinder.position.set(24.074991727311456,9.96150814851529,-46.99063596637103);
    cylinder.rotation.set(-0.004703560779066329,0,1.5707963267948966);
    cylinder.scale.set( 6.7981416179711776,21.38806354868134 ,0.7701556629451868);
    cylinder.material.color.set("gray");
    
    cone2.position.set(41.94152851895237, 9.717134215842751,-47.03406816363425)
    cone2.rotation.set(0,0,-1.5846462304857858);
    cone2.scale.set(2,2,0.2);

    const torus = createTorus();
    scene.add(torus);
    loop.updatables.push(torus);
    
    torus.position.set(58.158924921269126,55.291982698999874,0);
    torus.scale.set(2.8,2.6,4)

    const tower = createTower();
    scene.add(tower);
    tower.position.set(58.2,21.2,0);
    tower.scale.set(2.88,20.8,1.76);

    

    transform.attach(torus);
    //saveObjectID(transform.object)
    
    //controls.target.copy(cylinder.position);
    //loadObjectLocation(transform.object);
    window.addEventListener('keydown', function (event) {
      switch (event.code) {
          case 'KeyG':
              transform.setMode('translate')
              break
          case 'KeyR':
              transform.setMode('rotate')
              break
          case 'KeyS':
              transform.setMode('scale')
              break
      }
  })
  transform.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value;
      });
  transform.addEventListener('objectChange', (e) => {
    
    console.log("Pozitie x:" + e.target.object.position.x);
    console.log("Pozitie y:" + e.target.object.position.y);
    console.log("Pozitie z:" + e.target.object.position.z);
    console.log("Rotatie x:" + e.target.object.rotation.x);
    console.log("Rotatie y:" + e.target.object.rotation.y);
    console.log("Rotatie z:" + e.target.object.rotation.z);
    console.log("Scale x:" + e.target.object.scale.x);
    console.log("Scale y:" + e.target.object.scale.y);
    console.log("Scale z:" + e.target.object.scale.z);
    
    console.log(e.target.object.id);
    
    
    //saveObjectLocation(transform.object);

      })
    
   
    

    
   
    //loadObjectLocation(transform.object);
   
    
    scene.add(cube,ambientLight,mainLight,cone,cylinder,transform,cube3,cube4);
    const resizer = new Resizer(container, camera, renderer);
    
  }
  
  render(){
    renderer.render(scene,camera);
  }


  start(){
    loop.start();
  }
  stop(){
    loop.stop();
  }
}

export { World };
