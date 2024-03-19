import { DirectionalLight, AmbientLight, HemisphereLight } from '../../build/three.module.js';

function createLights() {
//const light = new DirectionalLight('white', 8); // TODO
const ambientLight = new HemisphereLight('white','darkslategrey',1);
const mainLight = new DirectionalLight ('white', 5);
mainLight.position.set(10,40,200);

return {ambientLight, mainLight};
}

export { createLights };