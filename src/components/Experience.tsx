import * as THREE from 'three'

import { Box, ContactShadows, Environment, OrbitControls } from '@react-three/drei';

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { GroundProjectedSkybox } from './GroundProjectedSkybox'
import { ShadowPlane } from './ShadowPlane'

import React from 'react';

const Experience = ({rotation}) => {

    const gltf = useLoader(GLTFLoader, 'skidLoader.glb');

    gltf.scene.rotation.set(rotation.x, THREE.MathUtils.degToRad(rotation.y), rotation.z);

    // use proper fork color
    gltf.scene.getObjectByName('Forks_Frame-1')?.traverse(child => {
        if (child instanceof THREE.Mesh)
            child.material.color.set(0x000000);
    });

    // hide unwanted meshes and lights
    let leftSpot = gltf.scene.getObjectByName('Spot_Light_Left');
    if (leftSpot)
        leftSpot.visible = false;
    let rightSpot = gltf.scene.getObjectByName('Spot_Light_Right');
    if (rightSpot)
        rightSpot.visible = false;

    gltf.scene.getObjectByName('Wheels_Assembly-1')?.traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Brush_Cutter_Assembly-1')?.traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Sweeper_Assembly-1')?.traverse(child => {
        child.visible = false;
    });
    gltf.scene.getObjectByName('Bucket_Assembly-1')?.traverse(child => {
        child.visible = false;
    });

    return (
        <>
            <ambientLight intensity={0.05} />
            <Environment files="construction_2k.hdr" background />
            <primitive object={gltf.scene} />
            <GroundProjectedSkybox url="construction_8k.hdr" height={2} radius={30} />
            <ContactShadows opacity={0.7} />
            <directionalLight intensity={0.95} position={[50, 20, 0]} />
            <ShadowPlane opacity={0.6} />
            <OrbitControls />
        </>
    );
};

export default Experience;