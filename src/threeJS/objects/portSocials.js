import * as THREE from "three";
import createDrawableObject from "./objectTemplates/drawable"
import { loadGLBObject } from "../utils/modelLoading"

import boat      from "./boat";
import camera   from "./camera";
import countryControler from "../countryControler";
import rangeControler from "../rangeControler";



let mesh = await loadGLBObject("./../resources/models/rufezeichen.glb")

mesh.position.x = -5;
mesh.position.y = 15;
mesh.position.z = 20;

mesh.lookAt(new THREE.Vector3(0,0,0))

mesh.rotateX(-Math.PI/2)

let counter = 0;
let countrySet = false;
let rangeSet = false;
let renderFunction = (time,keyDict) => {
    let pos = mesh.position.clone()
    pos.normalize().multiplyScalar(0.03*Math.cos(counter))
    mesh.position.add(pos)

    counter+=0.05*time/16;
    
    let dist = boat.mesh.position.distanceTo(mesh.position)

    if(dist < 7 && !!!rangeSet){
        rangeControler.setInRange(true)
        rangeControler.onClickOpenModal("socialsModal")
        rangeSet = true;
    }else if(dist >= 7 && rangeSet){
        rangeControler.setInRange(false)
        rangeControler.onClickOpenModal("")
        rangeSet = false;
    }

    let camDist = camera.position.distanceTo(mesh.position)
    if(camDist < 50 && !!!countrySet){
        countryControler.setCountry("Socials")
        countrySet = true
    }else if(camDist >= 50 && countrySet){
        countryControler.setCountry("")
        countrySet = false
    }
}

let portSocials = createDrawableObject(mesh,renderFunction);

export default portSocials;