

import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from './examples/jsm/loaders/FBXLoader.js'
import { TransformControls } from '../../examples/jsm/controls/TransformControls.js';
import {
  BoxGeometry,ConeGeometry,SphereGeometry, TorusGeometry,
  Color,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  TextureLoader,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MathUtils,DirectionalLight,HemisphereLight,Vector3, Raycaster, Vector2
} from '../../build/three.module.js';
import { MeshBasicMaterial } from 'three';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');
const container2 = document.querySelector('#scene-container');

var cameraMateinfo, sceneMateinfo, renderer,sceneAula,camera2,renderer2,scenePescarie,sceneCamin,cameraAula,cameraPescarie,cameraCamin,sceneInterior,cameraInterior;
var geometry1, geometry2, geometry3, material;
var mesh1, mesh2, mesh3;
var position3;
var land,landMesh;
var controls,controls2,controls3,controls4,controls5;
var boolMateinfo,boolAula,boolPescarie,boolCamin,boolInterior;
var modelMateinfo,modelAula,modelPescarie,modelCamin;
const objectsInScene1 = []
const objectsInScene2 = []
const objectsInScene3 = []
const objectsInScene4 = []
const objectsInScene5 = []
var currentScene, currentCamera;

init();
animate();





function createLights() {
  const light = new DirectionalLight('white', 2);
  const hemilight = new HemisphereLight('white', 'gray',0.5)

  light.position.set(20, 20, 20);
  hemilight.position.set(20,20,20)

  return {light,hemilight};
}

function init() {
    // create a Scene with background color
    sceneMateinfo = new Scene();
    sceneMateinfo.background = new Color('pink');

    scenePescarie = new Scene();
    scenePescarie.background = new Color('pink');

    sceneCamin = new Scene();
    sceneCamin.background = new Color('pink');

    sceneAula = new Scene();
    sceneAula.background = new Color('pink');

    sceneInterior = new Scene();
    

    currentScene = new Scene();
    currentCamera = new PerspectiveCamera();

    // Create and place a camera in the 3D space
    const fov = 35; // AKA Field of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1; // the near clipping plane
    const far = 10000; // the far clipping plane
    
    cameraMateinfo = new PerspectiveCamera(fov, aspect, near, far);
    cameraPescarie = new PerspectiveCamera(fov,aspect,near,far);
    cameraAula = new PerspectiveCamera(fov,aspect,near,far);
    cameraCamin = new PerspectiveCamera(fov,aspect,near,far);
    cameraInterior = new PerspectiveCamera(fov,aspect,near,far);
    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    // camera is watching towards (0,0,0) along negative Oz axis
    cameraMateinfo.position.set(3, 0, 4000);
    cameraPescarie.position.set(0,0,1);
    cameraAula.position.set(50.96652488086836,13.450860132495091,-10.22992388460321);
    cameraCamin.position.set(4000,1000,4000);
    cameraInterior.position.set(1,1,1);
    
    
   
    const {light: light1,hemilight: hemilight1} = createLights();
    const {light: light2,hemilight: hemilight2} = createLights();
    const {light: light3,hemilight: hemilight3} = createLights();
    const {light: light4,hemilight: hemilight4} = createLights();
    sceneMateinfo.add(light1,hemilight1);
    sceneAula.add(light2);
    scenePescarie.add(light3);
    sceneCamin.add(light4);


    const loader = new GLTFLoader();
    
    const tloader = new TextureLoader();
  

    
       
    
    // create the renderer
    renderer = new WebGLRenderer({antialias:true});
    
    
    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // finally, set the pixel ratio so that our scene will look good on HiDPI displays
    renderer.setPixelRatio(window.devicePixelRatio);
    
    
    // add the automatically created <canvas> element to the page
    container.append(renderer.domElement);
    
    
    controls = new OrbitControls( cameraMateinfo, renderer.domElement );
    controls2 = new OrbitControls(cameraAula, renderer.domElement);
    controls3 = new OrbitControls(cameraPescarie, renderer.domElement);
    controls4 = new OrbitControls(cameraCamin, renderer.domElement);
    controls5 = new OrbitControls(cameraInterior, renderer.domElement);
    
    controls.enabled = false;
    controls2.enabled = false;
    controls3.enabled = false;
    controls4.enabled = false;
    controls5.enabled = false;
    controls5.autoRotate = true;

    //controls.update() must be called after any manual changes to the camera's
    controls.update();
    controls2.update();
    controls3.update();
    controls4.update();
    controls5.update();

    const btnMateinfo = document.getElementById('button');
    const btnPescarie = document.getElementById('button3');
    const btnAula = document.getElementById('button2');
    const btnCamin = document.getElementById('button4');
    const btnInt = document.getElementById('button5')
    const btnZoom = document.getElementById('btnZoom');
    const btnZOut = document.getElementById('btnZoomOut');
    const btnInfo = document.getElementById('infoButton');

    btnInt.onclick = function clickHandler(){
    tloader.load(
      '../../models/images/panorama.jpg',
      texture => {
        const aspectRatio = texture.image.width / texture.image.height;
        const geometry = new SphereGeometry(500,60,40 * aspectRatio);
        geometry.scale(-1,1,1);

        const material = new MeshBasicMaterial({map: texture});

        const mesh = new Mesh(geometry, material);
        sceneInterior.add(mesh);
        objectsInScene5.push(mesh);
        renderer.render(sceneInterior, cameraInterior);
        currentScene = sceneInterior;
        currentCamera = cameraInterior;
      },
      undefined,
      error => {
        console.error('Eroare');
      }
    );
    boolMateinfo = false;
    boolPescarie = false;
    boolAula = false;
    boolCamin = false;
    boolInterior = true;  
  }
    btnMateinfo.onclick = function clickHandler(){
      
        loader.load('../../models/mateinfo3.glb', function(gltf){
            modelMateinfo = gltf.scene;
            sceneMateinfo.add(modelMateinfo);
            modelMateinfo.name = "Sediu vechi Mate-Info"
            objectsInScene1.push(modelMateinfo);
            
            console.log('Model load success', modelMateinfo);
            renderer.render(sceneMateinfo, cameraMateinfo);
            currentScene = sceneMateinfo;
            currentCamera = cameraMateinfo;
            
        }, undefined, function(error){
            console.error(error);
        });
        boolMateinfo = true;
        boolPescarie = false;
        boolAula = false;
        boolCamin = false;
        boolInterior = false;

        console.log('hello', boolMateinfo);
        btnZoom.style.display ='block';
        btnZOut.style.display= 'block';
             
    }

    btnAula.onclick = function clickHandler(){
      loader.load('../../models/UNIV3.glb',function(gltf){
        modelAula = gltf.scene;
        modelAula.name = "Anexa Aula"
        sceneAula.add(modelAula);
        objectsInScene2.push(modelAula);
        
        console.log('Model load success', modelAula);
        renderer.render(sceneAula, cameraAula);
        currentScene = sceneAula;
        currentCamera = cameraAula;
        
      }, undefined, function(error){
        console.error(error);
      });
        boolMateinfo=false;
        boolPescarie=false;
        boolAula=true;
        boolCamin = false;
        boolInterior = false;

        btnZoom.style.display ='none';
        btnZOut.style.display= 'none';

    
    }

    btnPescarie.onclick = function clickHandler(){
      loader.load('../../models/pescarie.glb', function(gltf){
        modelPescarie = gltf.scene;
        modelPescarie.name = "Camin pescarie";
        
        scenePescarie.add(modelPescarie);
        objectsInScene3.push(modelPescarie);

        console.log('Model load success', modelPescarie);
        renderer.render(scenePescarie, cameraPescarie);
        currentScene = scenePescarie;
        currentCamera = cameraPescarie;
        console.log(modelPescarie.position);

        
      }, undefined, function(error) {
        console.error(error);
      });
      boolMateinfo=false;
      boolAula = false;
      boolPescarie = true;
      boolCamin = false;
      boolInterior = false;
      btnZoom.style.display ='none';
      btnZOut.style.display= 'none';
    }

    btnCamin.onclick = function clickHandler(){
      loader.load('../../models/camine12.glb', function(gltf){
        modelCamin = gltf.scene;
        modelCamin.name = "Camine bvd.Mamaia";
        
        sceneCamin.add(modelCamin);
        objectsInScene4.push(modelCamin);

        console.log('Model load success', modelCamin);
        renderer.render(sceneCamin, cameraCamin);
        currentScene = sceneCamin;
        currentCamera = cameraCamin;
        console.log(modelCamin.position);

        
      }, undefined, function(error) {
        console.error(error);
      });
      boolMateinfo=false;
      boolAula = false;
      boolPescarie = false;
      boolCamin = true;
      boolInterior = false;
      btnZoom.style.display ='none';
      btnZOut.style.display= 'none';
    }

   

    let isZooming = false;
    function zoomIn() {
      if (isZooming) return;
      const targetPosition = new Vector3(3, 2000, 3000); // Zoom to 90% of the distance to the cube
      const initialPosition = cameraMateinfo.position.clone();
      const tweenDuration = 500; // Animation duration in milliseconds
      
      isZooming = true;
      const startTime = performance.now();
  
      function animateZoom() {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / tweenDuration, 1); // Ensure t doesn't exceed 1
  
          cameraMateinfo.position.lerpVectors(initialPosition, targetPosition, t);
  
          if (t < 1) {
              requestAnimationFrame(animateZoom);
          }
          else{
            
            isZooming = false;
          }
  
          renderer.render(sceneMateinfo, camera);
      }
      
      animateZoom();
      
      
  }

  const targetPosition = new Vector3(3, 2000, 5000); // Example target position further away from the scene
  const duration = 1000;
  function zoomOut(targetPosition, duration) {
    const initialPosition = cameraMateinfo.position.clone();
    const startTime = performance.now();

    function animateZoom() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1); // Ensure t doesn't exceed 1

        cameraMateinfo.position.lerpVectors(initialPosition, targetPosition, t);

        if (t < 1) {
            requestAnimationFrame(animateZoom);
        } else {
            cameraMateinfo.position.copy(targetPosition); // Ensure camera is at the target position
        }

        renderer.render(sceneMateinfo, cameraMateinfo);
    }

    animateZoom();
}


    btnZoom.onclick = function clickHandler(){
      zoomIn();
      
    }


    btnZOut.onclick = function clickHandler(){
      zoomOut(targetPosition,duration);
    }
    
    // render, or 'create a still image', of the scene
    function checkDependenciesAndRender() {
      if (modelMateinfo && modelPescarie && modelAula && modelCamin) {
          // Both models are loaded, render scenes
          renderer.render(sceneMateinfo, cameraMateinfo);
          renderer.render(sceneAula, cameraAula);
          renderer.render(scenePescarie, cameraPescarie);
          renderer.render(sceneCamin, cameraCamin)
          renderer.render(sceneInterior,cameraInterior)
      } else {
          // Models are still loading, wait and check again
          setTimeout(checkDependenciesAndRender, 100);
      }
  }
  checkDependenciesAndRender();

  function onObjectClick(event) {
    // Raycasting to detect objects intersected by the click
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // Calculate normalized device coordinates (NDC) for mouse click
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set raycaster origin and direction
    raycaster.setFromCamera(mouse, currentCamera);

    // Perform raycasting
    const intersects = raycaster.intersectObjects(currentScene.children, true);

    if (intersects.length > 0) {
        // Object clicked, display information in sidebar
        const clickedObject = intersects[0].object;
        const objectInfo = {
            name: clickedObject,
            position: clickedObject.position.toArray().map(val => val.toFixed(2)).join(', '),
            rotation: clickedObject.rotation.toArray().map(val => (val * 180 / Math.PI).toFixed(2)).join(', ')
            // Add more properties as needed
        };

        // Update sidebar content
        updateSidebarContent(objectInfo);
        btnInfo.style.display='block';
    }
}

// Function to update sidebar content
function updateSidebarContent(objectInfo) {
  if(controls.enabled == true){
    const sidebar = document.getElementById('sidebar-right');
    sidebar.innerHTML = `<h2>Facultatea de Matematică și Informatică</h2>
                         <p>Facultatea de Matematică și Informatică (FMI) se adresează celor curioși, inteligenți,
                         pasionați de matematică și/sau informatică, ce își doresc să dezlege tainele software-ului, care
                         sunt atrași de rezolvarea problemelor de matematică și/sau de elaborarea algoritmilor, respectiv,
                         de limbaje și principiile programării.
                         De asemenea, FMI are implicații considerabile în conectarea mediului academic cu industria
                         și cu start-up-uri inovative, studenții având privilegiul de a participa la sesiuni live coding organizate
                         de companii IT, la competiții studențești naționale și internaționale de matematică și informatică și
                         de a parcurge stagii de practică în companiile IT partenere.
                         FMI are un corp didactic profesionist și dedicat, capabil să formeze specialiști de cea mai
                         bună calitate în matematică și în informatică.
                         Inserția pe piața muncii a absolvenților FMI are procent ridicat, aceștia dobândind
                         competențele necesare pentru a se angaja la instituții/firme importante în domeniu.</p>
                         `;
    sidebar.style.display = 'block';
  }
  if(controls2.enabled == true){
    const sidebar = document.getElementById('sidebar-right');
    sidebar.innerHTML = `<h2>Anexă AULA</h2>
                         <p>Facultatea de Matematică și Informatică (FMI) se adresează celor curioși, inteligenți,
                         pasionați de matematică și/sau informatică, ce își doresc să dezlege tainele software-ului, care
                         sunt atrași de rezolvarea problemelor de matematică și/sau de elaborarea algoritmilor, respectiv,
                         de limbaje și principiile programării.
                         De asemenea, FMI are implicații considerabile în conectarea mediului academic cu industria
                         și cu start-up-uri inovative, studenții având privilegiul de a participa la sesiuni live coding organizate
                         de companii IT, la competiții studențești naționale și internaționale de matematică și informatică și
                         de a parcurge stagii de practică în companiile IT partenere.
                         FMI are un corp didactic profesionist și dedicat, capabil să formeze specialiști de cea mai
                         bună calitate în matematică și în informatică.
                         Inserția pe piața muncii a absolvenților FMI are procent ridicat, aceștia dobândind
                         competențele necesare pentru a se angaja la instituții/firme importante în domeniu.</p>
                         `;
    sidebar.style.display = 'block';
  }
  if(controls3.enabled == true){
    const sidebar = document.getElementById('sidebar-right');
    sidebar.innerHTML = `<h2>Căminele FN1 și FN2</h2>
                         <p></p>
                         `;
    sidebar.style.display = 'block';
  }
  if(controls4.enabled == true){
    const sidebar = document.getElementById('sidebar-right');
    sidebar.innerHTML = `<h2>Căminele C1 și C2</h2>
                         <p></p>
                         `;
    sidebar.style.display = 'block';
  }
}

// Event listener for mouse click
window.addEventListener('dblclick', onObjectClick, false);

btnInfo.onclick = function clickHandler(){
  document.getElementById('sidebar-right').style.display = 'none';
  btnInfo.style.display = 'none';
}
}

function animate() {
    requestAnimationFrame( animate );
    
   
    
    if(boolMateinfo){
      controls.enabled=boolMateinfo;
      controls2.enabled=boolAula;
      controls3.enabled = boolPescarie;
      controls4.enabled = boolCamin;
      controls5.enabled = boolInterior;
        renderer.render(sceneMateinfo,cameraMateinfo);
        
        }
    if(boolAula){
      controls.enabled=boolMateinfo;
      controls2.enabled=boolAula;
      controls3.enabled = boolPescarie;
      controls4.enabled = boolCamin;
      controls5.enabled = boolInterior
        renderer.render(sceneAula,cameraAula);
        
      }

    if(boolPescarie){
      renderer.render(scenePescarie,cameraPescarie);
      controls.enabled=boolMateinfo;
      controls2.enabled=boolAula;
      controls3.enabled = boolPescarie;
      controls4.enabled = boolCamin;
      controls5.enabled = boolInterior
    }
    if(boolCamin){
      renderer.render(sceneCamin,cameraCamin);
      controls.enabled=boolMateinfo;
      controls2.enabled=boolAula;
      controls3.enabled = boolPescarie;
      controls4.enabled = boolCamin;
      controls5.enabled = boolInterior
    }

    if(boolInterior){
      renderer.render(sceneInterior,cameraInterior);
      controls.enabled=boolMateinfo;
      controls2.enabled=boolAula;
      controls3.enabled = boolPescarie;
      controls4.enabled = boolCamin;
      controls5.enabled = true;
    }
    cameraMateinfo.aspect = window.innerWidth/window.innerHeight;
    cameraMateinfo.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth,window.innerHeight);
    window.addEventListener('resize',onResize, false);
    controls.update();
    
    
}
function onResize(){
    cameraMateinfo.aspect = window.innerWidth/window.innerHeight;
    cameraMateinfo.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
    console.log("resize")
}