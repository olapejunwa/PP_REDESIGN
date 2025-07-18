import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedTargetIcon = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(192, 192);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 10; // Pulled camera back to fit larger elements

    // "Waste" text
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
      const textGeometry = new THREE.TextGeometry('WASTE', {
        font: font,
        size: 2, // Increased font size
        height: 0.25,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-5, 2, 0); // Adjusted position
      scene.add(textMesh);
    });

    // Downward trending line
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 4 }); // Thicker line
    const points = [];
    points.push(new THREE.Vector3(-4, 0, 0)); // Wider line
    points.push(new THREE.Vector3(0, -2, 0));
    points.push(new THREE.Vector3(4, -1.5, 0));
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    
    let lineProgress = 0;

    const animate = function () {
      requestAnimationFrame(animate);
      
      lineProgress += 0.01;
      if (lineProgress > 1) lineProgress = 0;
      
      const subPoints = points.slice(0, Math.floor(lineProgress * points.length) + 1);
      if(subPoints.length > 1) {
        const lastSegmentProgress = (lineProgress * points.length) % 1;
        const lastPoint = subPoints[subPoints.length - 1];
        const secondLastPoint = subPoints[subPoints.length - 2];
        const interpolatedPoint = new THREE.Vector3().lerpVectors(secondLastPoint, lastPoint, lastSegmentProgress);
        const dynamicPoints = [...subPoints.slice(0, -1), interpolatedPoint];
        line.geometry.setFromPoints(dynamicPoints);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '192px', height: '192px' }} />;
};

export default AnimatedTargetIcon;
