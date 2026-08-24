import { useEffect } from 'react'
import * as THREE from 'three'

import { Canvas, useThree } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


// Loads the Blender room model and enables shadows on its meshes
function RoomModel() {
  const model = useGLTF('/models/jack-portfolio-room-USE.glb')

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
   }
 })

  return (
    <primitive
      object={model.scene}
      position={[0, -1.8, 0.8]}
      scale={4}
    />
  )
}


// Sets the starting camera position for the hero scene
function CameraSetup() {
  const { camera } = useThree()

  camera.position.set(4.7896, 1.0274, 4.9635)
  camera.lookAt(0, 0, 0)

  return null
}


// Controls how Three.js processes the final image
function RendererSetup() {
  const { gl } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.9
  }, [gl])

  return null
}


// Main 3D hero scene
function Scene() {
  return (
    <div className="scene-container">

      <Canvas
        shadows
        camera={{
          fov: 40
        }}
      >
        <CameraSetup />
        <RendererSetup />

        <ambientLight intensity={0.15} />

        <Environment
          preset="studio"
          background={false}
          environmentIntensity={0.25}
        />

        <directionalLight
          position={[4, 6, 4]}
          intensity={0.2}
          castShadow
        />

        <RoomModel />

        <EffectComposer>
          <Bloom
            intensity={0.1}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.2}
          />
        </EffectComposer>

      </Canvas>

    </div>
  )
}

export default Scene