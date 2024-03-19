import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';


function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    

    controls.enableDamping = true;
    controls.listenToKeyEvents(window);
    //controls.enabled = false;
    controls.minAzimuthAngle = - Infinity; // default
    controls.maxAzimuthAngle = Infinity; // default
    controls.minPolarAngle = 0; // default
    controls.maxPolarAngle = Math.PI/2; // default
    //controls.autoRotate = true;
   
    controls.target.set(0,1,0);
    camera.rotation.set(0,0,0);
    

    controls.tick = () => controls.update();
    
    

    return controls;
}

export { createControls };