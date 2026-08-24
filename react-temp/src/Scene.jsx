import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import * as THREE from 'three'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const TEXT_BASE_WIDTH = 13.5

const GRADIENT_START = '#03cefc'
const GRADIENT_END = '#fc00c5'

const POINTER_PITCH = 0.12
const POINTER_YAW = 0.18
const IDLE_ROTATION_SPEED = 0.2
const ROTATION_DAMPING = 6
const IDLE_DELAY_MS = 5500

const STAR_COUNT = 260
const STAR_FIELD_WIDTH = 24
const STAR_FIELD_HEIGHT = 14
const STAR_FIELD_DEPTH = 10

const GLITCH_CLICK_TARGET = 5
const GLITCH_CLICK_WINDOW_MS = 1800
const GLITCH_DURATION_MS = 450
const GLITCH_POSITION_OFFSET = 0.035
const GLITCH_ROTATION_OFFSET = 0.025
const GLITCH_RECOVERY_DAMPING = 12

const SUDO_MESSAGE_DURATION_MS = 2400

function CameraSetup() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 7)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

function RendererSetup() {
  const { gl } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.9
  }, [gl])

  return null
}

function StarField() {
  const positions = useMemo(() => {
    const starPositions = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      const index = i * 3

      starPositions[index] =
        (Math.random() - 0.5) * STAR_FIELD_WIDTH

      starPositions[index + 1] =
        (Math.random() - 0.5) * STAR_FIELD_HEIGHT

      starPositions[index + 2] =
        -Math.random() * STAR_FIELD_DEPTH - 1
    }

    return starPositions
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}

function useSudoEasterEgg() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let keyBuffer = ''
    let hideTimeout

    const handleKeyDown = (event) => {
      const target = event.target

      const isTyping =
        target instanceof HTMLElement &&
        (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        )

      if (isTyping || event.key.length !== 1) return

      keyBuffer = `${keyBuffer}${event.key.toLowerCase()}`.slice(-4)

      if (keyBuffer !== 'sudo') return

      keyBuffer = ''
      setIsVisible(true)

      window.clearTimeout(hideTimeout)

      hideTimeout = window.setTimeout(() => {
        setIsVisible(false)
      }, SUDO_MESSAGE_DURATION_MS)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(hideTimeout)
    }
  }, [])

  return isVisible
}

function ConsoleEasterEgg() {
  useEffect(() => {
    console.info(
      '%c[jack.dev] curious minds make good engineers.',
      'color: #03cefc; font-weight: bold;'
    )
  }, [])

  return null
}

function HeroText() {
  const { viewport } = useThree()

  const textGroupRef = useRef()
  const textMeshRef = useRef()
  const glitchGroupRef = useRef()

  const idleYawRef = useRef(0)
  const lastPointerMoveRef = useRef(performance.now())
  const previousPointerRef = useRef({ x: 0, y: 0 })
  const wasIdleRef = useRef(false)

  const clickCountRef = useRef(0)
  const lastClickRef = useRef(0)
  const glitchEndRef = useRef(0)

  const textScale = Math.min(
    1,
    viewport.width / TEXT_BASE_WIDTH
  )

  useLayoutEffect(() => {
    const geometry = textMeshRef.current?.geometry

    if (!geometry) return

    geometry.computeBoundingBox()

    const { min, max } = geometry.boundingBox
    const width = Math.max(max.x - min.x, 0.001)

    const positions = geometry.attributes.position
    const colors = []

    const startColor = new THREE.Color(GRADIENT_START)
    const endColor = new THREE.Color(GRADIENT_END)
    const vertexColor = new THREE.Color()

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const progress = (x - min.x) / width

      vertexColor.lerpColors(
        startColor,
        endColor,
        progress
      )

      colors.push(
        vertexColor.r,
        vertexColor.g,
        vertexColor.b
      )
    }

    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    )

    geometry.attributes.color.needsUpdate = true
  }, [])

  const handleTextClick = () => {
    const now = performance.now()
    const clickGap = now - lastClickRef.current

    if (clickGap > GLITCH_CLICK_WINDOW_MS) {
      clickCountRef.current = 0
    }

    clickCountRef.current += 1
    lastClickRef.current = now

    if (clickCountRef.current < GLITCH_CLICK_TARGET) return

    clickCountRef.current = 0
    glitchEndRef.current = now + GLITCH_DURATION_MS
  }

  useFrame((state, delta) => {
    if (!textGroupRef.current || !glitchGroupRef.current) return

    const movedX = Math.abs(
      state.pointer.x - previousPointerRef.current.x
    )

    const movedY = Math.abs(
      state.pointer.y - previousPointerRef.current.y
    )

    const pointerMoved =
      movedX > 0.0001 || movedY > 0.0001

    if (pointerMoved) {
      lastPointerMoveRef.current = performance.now()

      previousPointerRef.current.x = state.pointer.x
      previousPointerRef.current.y = state.pointer.y
    }

    const idleTime =
      performance.now() - lastPointerMoveRef.current

    const isIdle = idleTime >= IDLE_DELAY_MS

    let targetPitch = 0
    let targetYaw = 0

    if (isIdle) {
      idleYawRef.current +=
        IDLE_ROTATION_SPEED * delta

      targetYaw = idleYawRef.current
    } else {
      if (wasIdleRef.current) {
        const wrappedYaw =
          THREE.MathUtils.euclideanModulo(
            textGroupRef.current.rotation.y + Math.PI,
            Math.PI * 2
          ) - Math.PI

        textGroupRef.current.rotation.y = wrappedYaw
        idleYawRef.current = wrappedYaw
      }

      targetPitch =
        state.pointer.y * POINTER_PITCH

      const pointerYaw =
        state.pointer.x * POINTER_YAW

      const currentYaw =
        textGroupRef.current.rotation.y

      targetYaw =
        currentYaw +
        THREE.MathUtils.euclideanModulo(
          pointerYaw - currentYaw + Math.PI,
          Math.PI * 2
        ) -
        Math.PI

      idleYawRef.current = currentYaw
    }

    wasIdleRef.current = isIdle

    textGroupRef.current.rotation.x =
      THREE.MathUtils.damp(
        textGroupRef.current.rotation.x,
        targetPitch,
        ROTATION_DAMPING,
        delta
      )

    textGroupRef.current.rotation.y =
      THREE.MathUtils.damp(
        textGroupRef.current.rotation.y,
        targetYaw,
        ROTATION_DAMPING,
        delta
      )

    const isGlitching =
      performance.now() < glitchEndRef.current

    if (isGlitching) {
      glitchGroupRef.current.position.x =
        THREE.MathUtils.randFloatSpread(
          GLITCH_POSITION_OFFSET * 2
        )

      glitchGroupRef.current.position.y =
        THREE.MathUtils.randFloatSpread(
          GLITCH_POSITION_OFFSET * 2
        )

      glitchGroupRef.current.rotation.z =
        THREE.MathUtils.randFloatSpread(
          GLITCH_ROTATION_OFFSET * 2
        )
    } else {
      glitchGroupRef.current.position.x =
        THREE.MathUtils.damp(
          glitchGroupRef.current.position.x,
          0,
          GLITCH_RECOVERY_DAMPING,
          delta
        )

      glitchGroupRef.current.position.y =
        THREE.MathUtils.damp(
          glitchGroupRef.current.position.y,
          0,
          GLITCH_RECOVERY_DAMPING,
          delta
        )

      glitchGroupRef.current.rotation.z =
        THREE.MathUtils.damp(
          glitchGroupRef.current.rotation.z,
          0,
          GLITCH_RECOVERY_DAMPING,
          delta
        )
    }
  })

  return (
    <group
      ref={textGroupRef}
      scale={textScale}
    >
      <group ref={glitchGroupRef}>
        <Center>
          <Text3D
            ref={textMeshRef}
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.9}
            height={0.25}
            curveSegments={12}
            bevelEnabled
            bevelSize={0.02}
            bevelThickness={0.04}
            bevelSegments={5}
            onClick={handleTextClick}
          >
            JACK HANCOCK

            <meshStandardMaterial
              vertexColors
              roughness={0.28}
              metalness={0.2}
            />
          </Text3D>
        </Center>
      </group>
    </group>
  )
}

function Scene() {
  const sudoVisible = useSudoEasterEgg()

  return (
    <div className="scene-container">
      <Canvas camera={{ fov: 40 }}>
        <CameraSetup />
        <RendererSetup />
        <ConsoleEasterEgg />

        <ambientLight intensity={0.18} />

        <directionalLight
          position={[-3.2, 2.4, 4.5]}
          intensity={1.4}
        />

        <StarField />
        <HeroText />

        <EffectComposer>
          <Bloom
            intensity={0.1}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.2}
          />
        </EffectComposer>
      </Canvas>

      <div
        className={`sudo-easter-egg ${
          sudoVisible ? 'is-visible' : ''
        }`}
        aria-hidden={!sudoVisible}
      >
        <span className="sudo-command">$ sudo</span>
        <span>permission denied: nice try :)</span>
      </div>
    </div>
  )
}

export default Scene