/* eslint-disable react/no-unknown-property */
'use client';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';

import cardGLB from '../../assets/lanyard/card.glb';
import lanyard from '../../assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

// The strap is a real 3D ribbon (not a camera-facing line) so it can twist:
// at the anchor it faces the camera, at the clip it turns with the card.
const STRAP_SEGMENTS = 32;
const STRAP_WIDTH = 0.135;
const STRAP_REPEAT = 4;

function createStrapGeometry() {
    const verts = (STRAP_SEGMENTS + 1) * 2;
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.BufferAttribute(new Float32Array(verts * 3), 3);
    position.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', position);
    const uv = new Float32Array(verts * 2);
    const index = [];
    for (let i = 0; i <= STRAP_SEGMENTS; i++) {
        // same mapping the old MeshLine used: texture repeated (mirrored) 4x along the strap
        const u = -STRAP_REPEAT * (i / STRAP_SEGMENTS);
        uv.set([u, 0, u, 1], i * 4);
        if (i < STRAP_SEGMENTS) {
            const a = i * 2;
            index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geometry.setIndex(index);
    return geometry;
}

/**
 * Lanyard
 * - offsetX: shifts the entire rig horizontally inside the canvas (no clipping).
 * - offsetY: shifts the entire rig vertically inside the canvas (positive = up).
 */
export default function Lanyard({
    position = [0, 0, 30],
    gravity = [0, -40, 0],
    fov = 20,
    transparent = true,
    offsetX = 0,
    offsetY = 0,
    active = true,
    running = true,
    onReady,
    onGrab,
}) {
    // Nothing is drawn until every shader has compiled (see Warmup), so the first
    // visible frames never stall on a driver compile.
    const [compiled, setCompiled] = useState(false);
    // Draw only while something moves: once the rig is asleep the loop switches to
    // on-demand rendering (zero GPU use at rest) until the card is touched again.
    const [awake, setAwake] = useState(true);
    const onSleep = useCallback(() => setAwake(false), []);
    const onWake = useCallback(() => setAwake(true), []);
    // Sharp on scaled screens, but drop to 1x if the GPU can't hold ~56+ fps.
    const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, 1.25));
    return (
        <div className="lanyard-wrapper">
            <Canvas
                camera={{ position, fov }}
                gl={{ alpha: transparent }}
                dpr={dpr}
                frameloop={!active || !compiled ? 'never' : awake ? 'always' : 'demand'}
                // The canvas spans the page and must not swallow clicks, so it
                // listens on #root instead and only reacts when the card is hit.
                eventSource={document.getElementById('root')}
                onCreated={({ gl, setEvents }) => {
                    gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
                    // Pointer position relative to the canvas, wherever it sits on the page.
                    setEvents({
                        compute: (event, state) => {
                            const rect = state.gl.domElement.getBoundingClientRect();
                            state.pointer.set(
                                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                                -((event.clientY - rect.top) / rect.height) * 2 + 1
                            );
                            state.raycaster.setFromCamera(state.pointer, state.camera);
                        },
                    });
                }}
            >
                {/* measure only while drawing continuously, so idle gaps never read as slow frames */}
                {active && compiled && awake && (
                    <PerformanceMonitor bounds={() => [56, 120]} flipflops={2} onDecline={() => setDpr(1)} onFallback={() => setDpr(1)} />
                )}
                <ambientLight intensity={Math.PI} />
                {/* updatePriority -1: step physics before Band's useFrame (priority 0),
                    so the strap is built from this frame's card pose, not the last one. */}
                {/* Physics waits (paused) while the hidden scene warms up, so the
                    badge's drop starts only once it is actually on screen. */}
                <Physics gravity={gravity} timeStep={1 / 60} paused={!running} updatePriority={-1}>
                    <Band offsetX={offsetX} offsetY={offsetY} onGrab={onGrab} onSleep={onSleep} onWake={onWake} />
                </Physics>

                {/* subtle environment light bars */}
                <Environment blur={0.75}>
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                </Environment>

                {/* after Environment, so its lighting is in place when shaders compile */}
                <Warmup onCompiled={() => setCompiled(true)} onReady={onReady} />
            </Canvas>
        </div>
    );
}

/**
 * Compiles every shader in the scene in parallel, off the main thread
 * (KHR_parallel_shader_compile, see compileUntil), while the badge is
 * still invisible and the render loop is held. Then it lets two frames draw and
 * reports ready, so the page can fade the badge in and start the physics.
 * Without this the drop stalls for ~250ms while the GPU driver compiles the
 * glossy card material on its first draw.
 */
// renderer.compileAsync, except it stops polling once the canvas is gone. three's
// own loop keeps checking every 10ms after an unmount (leaving the page during the
// warmup, or a resize rebuild) and then throws on the disposed programs.
function compileUntil(gl, scene, camera, isCancelled) {
    const pending = gl.compile(scene, camera);
    return new Promise((resolve) => {
        const check = () => {
            if (isCancelled()) return resolve();
            pending.forEach((material) => {
                const program = gl.properties.get(material).currentProgram;
                if (!program || program.isReady()) pending.delete(material);
            });
            if (pending.size === 0) return resolve();
            setTimeout(check, 10);
        };
        check();
    });
}

function Warmup({ onCompiled, onReady }) {
    const gl = useThree((state) => state.gl);
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    useLayoutEffect(() => {
        let cancelled = false;
        const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
        (async () => {
            try {
                await compileUntil(gl, scene, camera, () => cancelled);
            } catch {
                /* falls back to compiling on first draw */
            }
            if (cancelled) return;
            onCompiled();
            await nextFrame();
            await nextFrame();
            await nextFrame();
            if (!cancelled) onReady?.();
        })();
        return () => {
            cancelled = true;
        };
        // run once per canvas
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gl, scene, camera]);
    return null;
}

function Band({ maxSpeed = 50, minSpeed = 0, offsetX = 0, offsetY = 0, onGrab, onSleep, onWake }) {
    const fixed = useRef(),
        j1 = useRef(),
        j2 = useRef(),
        j3 = useRef(),
        card = useRef(),
        cardVisual = useRef();

    const vec = new THREE.Vector3(),
        ang = new THREE.Vector3(),
        rot = new THREE.Vector3(),
        dir = new THREE.Vector3();

    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
    const { nodes, materials } = useGLTF(cardGLB);
    const texture = useTexture(lanyard);

    const [curve] = useState(
        () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    );
    const [dragged, drag] = useState(false);
    const [hovered, hover] = useState(false);

    const strapGeometry = useMemo(createStrapGeometry, []);
    useEffect(() => () => strapGeometry.dispose(), [strapGeometry]);
    // Same colour pipeline the old MeshLine strap had (sRGB texture, tone mapped),
    // which gives the softer sky blue the site was designed around.
    const strapMaterial = useMemo(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, alphaTest: 0.05 });
    }, [texture]);
    useEffect(() => () => strapMaterial.dispose(), [strapMaterial]);
    // Scratch objects for the per-frame strap update, plus the running twist.
    const strap = useMemo(
        () => ({
            twist: 0,
            offset: 0,
            lastAngle: 0,
            quat: new THREE.Quaternion(),
            spin: new THREE.Quaternion(),
            anchor: new THREE.Vector3(),
            angvel: new THREE.Vector3(),
            points: Array.from({ length: STRAP_SEGMENTS + 1 }, () => new THREE.Vector3()),
            facing: new THREE.Vector3(),
            camFacing: new THREE.Vector3(),
            tangent: new THREE.Vector3(),
            normal: new THREE.Vector3(),
            across: new THREE.Vector3(),
            cross: new THREE.Vector3(),
        }),
        []
    );

    // Extent of card + clip in the card body's own space (the visual group is
    // scaled 2.25 and shifted down 1.2), used to keep a dragged card in view.
    const cardExtent = useMemo(() => {
        const box = new THREE.Box3();
        [nodes.card, nodes.clip, nodes.clamp].forEach((node) => {
            node.geometry.computeBoundingBox();
            box.union(node.geometry.boundingBox);
        });
        return { minX: box.min.x * 2.25, maxX: box.max.x * 2.25, minY: box.min.y * 2.25 - 1.2, maxY: box.max.y * 2.25 - 1.2 };
    }, [nodes]);

    const stillFrames = useRef(0);
    const wake = () => {
        stillFrames.current = 0;
        onWake?.();
    };

    // Rope chain joints
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

    useEffect(() => {
        if (!hovered) return;
        document.body.style.cursor = dragged ? 'grabbing' : 'grab';
        return () => void (document.body.style.cursor = 'auto');
    }, [hovered, dragged]);

    // Dragging across the page must not select text along the way, and the cursor
    // spotlight pauses (body.badge-dragging) so the GPU has room for the badge alone.
    useEffect(() => {
        if (!dragged) return;
        document.body.style.userSelect = 'none';
        document.body.classList.add('badge-dragging');
        return () => {
            document.body.style.userSelect = '';
            document.body.classList.remove('badge-dragging');
        };
    }, [dragged]);

    // Dev-only hooks so the flip can be reproduced and measured in automated checks:
    // __spinBadge spins the card, __strapLag returns the angle (degrees) between the
    // strap's end and the card's width as drawn (0 = the strap turns with the card).
    useEffect(() => {
        if (!import.meta.env.DEV) return undefined;
        window.__spinBadge = (speed = 9) => {
            wake();
            card.current?.setAngvel({ x: 0, y: speed, z: 0 }, true);
        };
        window.__strapLag = () => {
            const body = cardVisual.current && cardVisual.current.parent;
            if (!body) return null;
            const p = strapGeometry.attributes.position.array;
            const across = new THREE.Vector3(p[3] - p[0], p[4] - p[1], p[5] - p[2]).normalize();
            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(body.getWorldQuaternion(new THREE.Quaternion()));
            return (Math.acos(Math.min(1, Math.abs(across.dot(right)))) * 180) / Math.PI;
        };
        return () => {
            delete window.__spinBadge;
            delete window.__strapLag;
        };
    }, [strapGeometry]);

    // Rebuild the strap ribbon along the rope curve (points run clip -> anchor).
    // Its twist ramps from 0 at the anchor to the card's spin at the clip, so
    // the strap end turns with the clip instead of staying flat to the camera.
    // Expects strap.quat to hold the card's drawn orientation for this frame.
    const updateStrap = (points, angvel) => {
        const s = strap;
        const n = STRAP_SEGMENTS;

        // How far the card has turned around the bottom of the strap.
        s.tangent.subVectors(points[1], points[0]).normalize();
        s.facing.set(0, 0, 1).applyQuaternion(s.quat).projectOnPlane(s.tangent);
        s.camFacing.set(0, 0, 1).projectOnPlane(s.tangent);
        if (s.facing.lengthSq() > 1e-6 && s.camFacing.lengthSq() > 1e-6) {
            s.facing.normalize();
            s.camFacing.normalize();
            const angle = Math.atan2(s.cross.crossVectors(s.camFacing, s.facing).dot(s.tangent), s.camFacing.dot(s.facing));
            // Unwrap across +-PI so a full spin keeps twisting instead of snapping.
            const step = angle - s.lastAngle;
            if (step > Math.PI) s.offset -= 2 * Math.PI;
            else if (step < -Math.PI) s.offset += 2 * Math.PI;
            s.lastAngle = angle;
            // Whole turns relax only once the card has stopped spinning, the way a
            // real strap untwists, so the strap never trails a spin in progress.
            if (Math.abs(angvel.dot(s.tangent)) < 0.6) s.offset *= 0.94;
            s.twist = angle + s.offset;
        }

        const pos = strapGeometry.attributes.position.array;
        const half = STRAP_WIDTH / 2;
        for (let i = 0; i <= n; i++) {
            const p = points[i];
            s.tangent.subVectors(points[Math.min(n, i + 1)], points[Math.max(0, i - 1)]).normalize();
            s.normal.set(0, 0, 1).projectOnPlane(s.tangent);
            if (s.normal.lengthSq() < 1e-6) s.normal.set(1, 0, 0).projectOnPlane(s.tangent);
            s.normal.normalize();
            // the lower strap follows the clip almost 1:1, easing to 0 at the anchor
            s.spin.setFromAxisAngle(s.tangent, s.twist * (1 - (i / n) ** 2));
            s.normal.applyQuaternion(s.spin);
            s.across.crossVectors(s.tangent, s.normal).normalize().multiplyScalar(half);
            pos[i * 6] = p.x - s.across.x;
            pos[i * 6 + 1] = p.y - s.across.y;
            pos[i * 6 + 2] = p.z - s.across.z;
            pos[i * 6 + 3] = p.x + s.across.x;
            pos[i * 6 + 4] = p.y + s.across.y;
            pos[i * 6 + 5] = p.z + s.across.z;
        }
        strapGeometry.attributes.position.needsUpdate = true;
    };

    useFrame((state, delta) => {
        // Clamp delta so a slow first frame (large asset load on deploy, or a
        // backgrounded tab regaining focus) can't spike the lerp/physics and
        // fling the strap down where it settles stretched out.
        const dt = Math.min(delta, 1 / 60);
        if (import.meta.env.DEV) window.__badgeFrames = (window.__badgeFrames || 0) + 1;
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            // Keep the whole card inside the canvas, so it is never cut off at an edge.
            const halfH = Math.tan((state.camera.fov * Math.PI) / 360) * state.camera.position.z;
            const halfW = halfH * (state.size.width / state.size.height);
            card.current?.setNextKinematicTranslation({
                x: THREE.MathUtils.clamp(vec.x - dragged.x, -halfW - cardExtent.minX, halfW - cardExtent.maxX),
                y: THREE.MathUtils.clamp(vec.y - dragged.y, -halfH - cardExtent.minY, halfH - cardExtent.maxY),
                z: vec.z - dragged.z,
            });
        }
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clamped = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(ref.current.translation(), dt * (minSpeed + clamped * (maxSpeed - minSpeed)));
            });

            // update strap curve from world positions. The clip end is read from the
            // card as drawn (rapier interpolates between steps), so the strap sits
            // exactly on the clip and turns exactly with it.
            const body = cardVisual.current && cardVisual.current.parent;
            if (body) {
                body.updateWorldMatrix(true, false);
                body.getWorldQuaternion(strap.quat);
                curve.points[0].copy(body.localToWorld(strap.anchor.set(0, 1.5, 0)));
            } else {
                const r = card.current.rotation();
                strap.quat.set(r.x, r.y, r.z, r.w);
                curve.points[0].copy(j3.current.translation());
            }
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            // sample the curve into reused vectors (getPoints would allocate 33 per frame)
            for (let i = 0; i <= STRAP_SEGMENTS; i++) curve.getPoint(i / STRAP_SEGMENTS, strap.points[i]);
            updateStrap(strap.points, strap.angvel.copy(card.current.angvel()));

            // gentle rotational damping
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            // no wake-up: lets the rig fall asleep once it has settled
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false);

            // Asleep for ~0.75s (strap smoothing settled too): stop drawing until touched.
            const resting = !dragged && [card, j1, j2, j3].every((ref) => ref.current.isSleeping());
            stillFrames.current = resting ? stillFrames.current + 1 : 0;
            if (stillFrames.current === 45) onSleep?.();
        }
    });

    curve.curveType = 'chordal';

    // Base offsets to shift the entire chain/card in world space
    const x = offsetX;
    const yBase = 4 + offsetY; // default anchor height was 4; add vertical offset

    return (
        <>
            {/* Anchor chain — positions include offsets so the whole rig slides */}
            <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[x + 0, yBase + 0, 0]} />
            <RigidBody position={[x + 0.5, yBase + 0, 0]} ref={j1} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[x + 1, yBase + 0, 0]} ref={j2} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>
            <RigidBody position={[x + 1.5, yBase + 0, 0]} ref={j3} {...segmentProps}>
                <BallCollider args={[0.1]} />
            </RigidBody>

            <RigidBody
                position={[x + 2, yBase + 0, 0]}
                ref={card}
                {...segmentProps}
                type={dragged ? 'kinematicPosition' : 'dynamic'}
            >
                <CuboidCollider args={[0.8, 1.125, 0.01]} />
                <group
                    ref={cardVisual}
                    scale={2.25}
                    position={[0, -1.2, -0.05]}
                    onPointerOver={() => (hover(true), wake())}
                    onPointerOut={() => hover(false)}
                    onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                    onPointerDown={(e) => (
                        wake(),
                        e.target.setPointerCapture(e.pointerId),
                        drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))),
                        onGrab?.()
                    )}
                >
                    <mesh geometry={nodes.card.geometry}>
                        <meshPhysicalMaterial
                            map={materials.base.map}
                            map-anisotropy={4}
                            clearcoat={1}
                            clearcoatRoughness={0.15}
                            roughness={0.9}
                            metalness={0.8}
                        />
                    </mesh>
                    <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
                    <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                </group>
            </RigidBody>

            {/* Strap ribbon, rebuilt every frame in world space by updateStrap() */}
            <mesh geometry={strapGeometry} material={strapMaterial} frustumCulled={false} />
        </>
    );
}
