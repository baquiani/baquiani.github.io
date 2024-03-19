import {
    SphereGeometry,
    Group,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
  } from '../../build/three.module.js';

function createGroup(objectA, objectB,objectC){

    const group = new Group();
    
    const geometry = new SphereGeometry(1, 16,16);

    const material = new MeshStandardMaterial({color: 'black'});

    const protoSphere = new Mesh(geometry, material);

    group.add(protoSphere);

    for(let i=0; i<1 ; i+= 0.05){
        const sphere = protoSphere.clone();

        sphere.position.x = Math.cos(2*Math.PI * i);
        sphere.position.y = Math.sin(2*Math.PI * i);

        sphere.scale.multiplyScalar(0.01+i);

        group.add(sphere);
    }

    group.scale.multiplyScalar(2);

    const radiansPerSecond = MathUtils.degToRad(30);

    group.tick = (delta) => {
        group.rotation.z -= delta*radiansPerSecond;
    };

    return group;

}

export {createGroup};