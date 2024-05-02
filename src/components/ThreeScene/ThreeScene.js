import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene({ model }) {
  const containerRef = useRef();
  const controlsRef = useRef();
  let columnWidth = 700;
  let canvasHeight = 520;
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      columnWidth / canvasHeight,
      0.1,
      300
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(columnWidth, canvasHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(0, 0, 4.2);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      model,
      function (gltf) {
        const obj = gltf.scene;
        const scaleFactor = 1;
        obj.scale.set(scaleFactor, scaleFactor, scaleFactor);

        obj.position.y = -0.23;
        obj.position.x = -0.07;
        scene.add(obj);

        // Rotate the object on the Z-axis
        const angleInRadians = Math.PI / 2; 
        obj.rotation.y += angleInRadians;
        const angleInRadiansZ = Math.PI / 130;
        obj.rotation.z += angleInRadiansZ;

        const boundingBox = new THREE.Box3().setFromObject(obj);
        const objectHeight = boundingBox.max.y - boundingBox.min.y;

        const distance =
          objectHeight / Math.tan((camera.fov / 1.6) * (Math.PI / 210));
        camera.position.z = distance;
      },
      undefined,
      function (error) {
        console.error("Error loading model:", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    controls.enableZoom = false;

    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 27;
    controls.maxAzimuthAngle = Math.PI / 16;
    
    const animate = () => {
      requestAnimationFrame(animate);
      camera.aspect = columnWidth / canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(columnWidth, canvasHeight);
      renderer.render(scene, camera);
      controls.update();
    };

    animate();

    const handleResize = () => {
      columnWidth = containerRef.current.offsetWidth;
      camera.aspect = columnWidth / canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(columnWidth, canvasHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      controlsRef.current.dispose();
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [model]);

  return <div ref={containerRef} />;
}

export default ThreeScene;
