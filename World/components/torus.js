import { TorusGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../build/three.module.js';

function createTorus(){

    const geometry = new TorusGeometry(3);

    const material = new MeshStandardMaterial({color: 'pink'});

    const torus = new Mesh(geometry,material);
    torus.tick = () => torus.rotation.y +=0.01;

    return torus;

    


}

export {createTorus};