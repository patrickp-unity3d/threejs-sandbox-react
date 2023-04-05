import * as THREE from 'three'

import { Environment, OrbitControls } from '@react-three/drei';

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { GroundProjectedSkybox } from './GroundProjectedSkybox'

const Experience = () => {

    const gltf = useLoader(GLTFLoader, 'skidLoader.glb');

    gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(90), 0);

    // use proper fork color
    gltf.scene.getObjectByName('Forks_Frame-1').traverse(child => {
        if (child.isMesh)
            child.material.color.set(0x000000);
    });

    // hide unwanted meshes and lights
    gltf.scene.getObjectByName('Spot_Light_Left').visible = false;
    gltf.scene.getObjectByName('Spot_Light_Right').visible = false;

    gltf.scene.getObjectByName('Wheels_Assembly-1').traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Brush_Cutter_Assembly-1').traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Sweeper_Assembly-1').traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Bucket_Assembly-1').traverse(child => {
        child.visible = false;
    });

    return (
        <>
            <Environment files="construction_2k.hdr" background/>
            <primitive object={gltf.scene} />
            <GroundProjectedSkybox url="construction_2k.hdr" height={2} radius={30} />
            <OrbitControls />
        </>
    );
};

export default Experience;