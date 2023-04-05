
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import React, { useMemo } from 'react'
import { Icosahedron } from '@react-three/drei';

const vertexShader = /* glsl */ `
varying vec3 vWorldPosition;
void main() {
    vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
const fragmentShader = /* glsl */ `
    varying vec3 vWorldPosition;
    uniform float radius;
    uniform float height;
    uniform float angle;
    #ifdef ENVMAP_TYPE_CUBE
        uniform samplerCube map;
    #else
        uniform sampler2D map;
    #endif
    // From: https://www.shadertoy.com/view/4tsBD7
    float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
    {
        float d = dot ( rd, n );
        if( d > 0.0 ) { return 1e6; }
        vec3 o = ro - c;
        float t = - dot( n, o ) / d;
        vec3 q = o + rd * t;
        return ( dot( q, q ) < r * r ) ? t : 1e6;
    }
    // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
    float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) {
        vec3 oc = ro - ce;
        float b = dot( oc, rd );
        float c = dot( oc, oc ) - ra * ra;
        float h = b * b - c;
        if( h < 0.0 ) { return -1.0; }
        h = sqrt( h );
        return - b + h;
    }
    vec3 project() {
        vec3 p = normalize( vWorldPosition );
        vec3 camPos = cameraPosition;
        camPos.y -= height;
        float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
        if( intersection > 0.0 ) {
            vec3 h = vec3( 0.0, - height, 0.0 );
            float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
            p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
        } else {
            p = vec3( 0.0, 1.0, 0.0 );
        }
        return p;
    }
    #include <common>
    void main() {
        vec3 projectedWorldPosition = project();
        #ifdef ENVMAP_TYPE_CUBE
            vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
        #else
            vec3 direction = normalize( projectedWorldPosition );
            vec2 uv = equirectUv( direction );
            vec3 outcolor = texture2D( map, uv ).rgb;
        #endif
        gl_FragColor = vec4( outcolor, 1.0 );
        //gl_FragColor = vec4( 1.0, 1.0, 0.0, 1.0 );
        #include <tonemapping_fragment>
        #include <encodings_fragment>
    }
    `;

export const GroundProjectedSkybox = (props) => {

    const texture = new RGBELoader().load(props.url);
    const data = useMemo(
        () => ({
          uniforms: {
            map: { value: texture },
            height: { value: props.height || 15 },
            radius: { value: props.radius || 100 },
          },
          fragmentShader,
          vertexShader
        }),
        []
      )

    return (
        <Icosahedron position={[0, 0, 0]} args={[props.radius, 16]}>
            <shaderMaterial side={THREE.DoubleSide} attach="material" {...data} />
        </Icosahedron>
    )
}