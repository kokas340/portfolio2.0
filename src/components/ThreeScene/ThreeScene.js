import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene({ model }) {
  const containerRef = useRef();
  const controlsRef = useRef();
  let columnWidth = 600; 
  let canvasHeight = 300;
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, columnWidth / canvasHeight, 0.5, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(columnWidth, canvasHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 0.6);
    scene.add(directionalLight);

    const loader = new OBJLoader();
    loader.load(
      model,
      function (obj) {
        const scaleFactor = 0.05;
        obj.scale.set(scaleFactor, scaleFactor, scaleFactor);

        
        obj.rotateX(-Math.PI / 2); 

      
        obj.position.y = -0.8;
        obj.position.x = -0.2; 
        scene.add(obj);

        
        const boundingBox = new THREE.Box3().setFromObject(obj);
        const objectHeight = boundingBox.max.y - boundingBox.min.y;

        
        const distance = objectHeight / Math.tan((camera.fov / 1.6) * (Math.PI / 200));
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
    controls.minPolarAngle = Math.PI / 2; 
    controls.maxPolarAngle = Math.PI / 2; 
    controls.minAzimuthAngle = -Math.PI / 20; 
    controls.maxAzimuthAngle = Math.PI / 9; 
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
