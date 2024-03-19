import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

function createTrackball(camera, canvas) {
    const control = new TrackballControls(camera, canvas);
    

    
    

    control.tick = () => control.update();
    
    

    return control;
}

export { createTrackball };