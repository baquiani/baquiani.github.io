import {TransformControls} from '../../examples/jsm/controls/TransformControls.js';


function createTransform(camera, canvas){
    const transform = new TransformControls(camera, canvas);
    
    return transform;
}

export {createTransform};