import * as THREE from "three";


// drawableObjects  -> array of all drawable Objects that should be added to the secene
// otherObjects     -> list of all objects that don't habe a mesh and don't have a render method
export default function createSceneObject(drawableObjects,otherObjects){
    let scene = new THREE.Scene();

    drawableObjects.forEach(object => {
        scene.add(object.mesh)
    });

    otherObjects.forEach(object => {
        scene.add(object)
    })

    let renderFunction = (time) => {
        drawableObjects.forEach(object => {
            object.renderFunction(time)
        });
    }

    return {
        objects         : drawableObjects,
        renderFunction  : renderFunction,
        scene           : scene
    }
}