import { Canvas } from '@react-three/fiber';
import './App.css';
import Experience from "./components/Experience";

function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 5, 15], fov: 23 }}>
        <Experience />
      </Canvas>
    </div>
  )
}

export default App;