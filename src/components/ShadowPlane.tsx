import React from 'react'
import { Plane } from '@react-three/drei';

export const ShadowPlane = (props) => {

    return (
        <Plane position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
            <shadowMaterial opacity={props.opacity} />
        </Plane>
    )
}