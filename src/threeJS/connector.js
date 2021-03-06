import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//import ui from "./ui"
import camera from "./objects/camera";
import scene from "./objects/scene";

import countryControler from "./countryControler";
import rangeControler from "./rangeControler";

export let init = (drawDomElement,controlsDomElement,openModalFunction,setCountryFunction,setRangeControlerFunction)=>{

    countryControler.setCountry = setCountryFunction;
    rangeControler.setInRange = setRangeControlerFunction;
    rangeControler.onClickOpenModal = openModalFunction;

    //Get the Canvas and set it as the display Canvas
    
    let renderer = new THREE.WebGLRenderer({antialias:true,alpha: true});
    renderer.shadowMap.enabled = true

    onWindowResize()
    renderer.setPixelRatio( window.devicePixelRatio );

    drawDomElement.appendChild(renderer.domElement)

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.maxPolarAngle = 2*Math.PI;
    controls.enableDamping = true;
    controls.enableZoom = false;
    
    controls.update()

    let lastTime = 0;
    function render(time) {    
        //call render on all displayed objects
        scene.renderFunction(time-lastTime)
       
        controls.update();
        renderer.render(scene.scene, camera);
        requestAnimationFrame(render);

        lastTime = time;
    }
    requestAnimationFrame(render);

    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener('resize', onWindowResize);

}






