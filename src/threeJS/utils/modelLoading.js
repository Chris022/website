import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";

export async function loadGLBObject(path){
    let gltfLoader = new GLTFLoader ();

    const loadfunc = (path) => {
        return new Promise((resolve, reject) => {
            gltfLoader.load(path, (data) => {
                data.scene.traverse((obj) => {
                    if (obj.castShadow !== undefined) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                    }
                    if(obj.material !== undefined){
                        obj.material = new THREE.MeshPhongMaterial({ color: obj.material.color,flatShading:true})
                    }
                });
                resolve(data);
            });
        });
    }
    let model = await loadfunc(path).then((data) => { 
        return data.scene.children[0];
    })
    return model
}