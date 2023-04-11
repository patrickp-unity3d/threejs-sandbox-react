import { Canvas } from '@react-three/fiber';
import './App.css';
import Experience from "./components/Experience";
import { panelProps, Panel } from "./components/Panel";

import React from 'react';
import * as THREE from 'three'

function App() {

  const [rotation, setRotation] = React.useState(new THREE.Vector3(0,90,0))

  return (
    <div className="App">
      <Canvas camera={{ position: [0, 5, 15], fov: 23 }}>
        <Experience rotation={rotation}/>
      </Canvas>
      <Panel setRotation={function (value: any): void {
        setRotation(value);
      }}/>
    </div>
  )
}

export default App;