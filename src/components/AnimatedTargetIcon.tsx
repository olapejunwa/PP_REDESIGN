import React, { useRef, useEffect } from 'react';
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

    camera.position.z = 8;

    // --- Chart Bars ---
    const pieces = [];
    const finalPositions = [
      { x: -2, y: -1.5, width: 0.8, height: 2 },   // Left bar
      { x: 0, y: -1, width: 0.8, height: 3 },     // Middle bar (tallest)
      { x: 2, y: -1.3, width: 0.8, height: 2.4 }  // Right bar
    ];

    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.PlaneGeometry(finalPositions[i].width, finalPositions[i].height);
      const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
      const piece = new THREE.Mesh(geometry, material);
      
      piece.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, 0);
      piece.userData.finalPosition = new THREE.Vector3(finalPositions[i].x, finalPositions[i].y, 0);
      
      piece.rotation.z = (Math.random() - 0.5) * Math.PI;
      piece.userData.finalRotation = 0;
      
      scene.add(piece);
      pieces.push(piece);
    }

    // --- Chart Axes ---
    const axisMaterial = new THREE.LineBasicMaterial({
        color: 0xadb5bd, // A light gray color for the axes
        transparent: true,
        opacity: 0
    });

    // Y-Axis
    const yAxisPoints = [new THREE.Vector3(-3.5, -3, -0.1), new THREE.Vector3(-3.5, 2, -0.1)];
    const yAxisGeom = new THREE.BufferGeometry().setFromPoints(yAxisPoints);
    const yAxis = new THREE.Line(yAxisGeom, axisMaterial.clone());
    scene.add(yAxis);

    // X-Axis
    const xAxisPoints = [new THREE.Vector3(-3.5, -3, -0.1), new THREE.Vector3(3.5, -3, -0.1)];
    const xAxisGeom = new THREE.BufferGeometry().setFromPoints(xAxisPoints);
    const xAxis = new THREE.Line(xAxisGeom, axisMaterial.clone());
    scene.add(xAxis);


    // --- Animation Logic ---
    let animationTime = 0;
    const animationDuration = 3; // 3 seconds total
    const clock = new THREE.Clock();

    const animate = function () {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      animationTime += deltaTime;
      
      const progress = Math.min(animationTime / animationDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      
      // Animate pieces moving to their final positions
      pieces.forEach((piece) => {
        if (!piece.userData.startPosition) {
          piece.userData.startPosition = piece.position.clone();
          piece.userData.startRotation = piece.rotation.z;
        }
        
        piece.position.lerpVectors(piece.userData.startPosition, piece.userData.finalPosition, easeProgress);
        piece.rotation.z = THREE.MathUtils.lerp(piece.userData.startRotation, piece.userData.finalRotation, easeProgress);
      });
      
      // Fade in axes as pieces assemble
      xAxis.material.opacity = easeProgress;
      yAxis.material.opacity = easeProgress;
      
      // Reset animation after completion + pause
      if (animationTime > animationDuration + 2) {
        animationTime = 0;
        pieces.forEach((piece) => {
          piece.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, 0);
          piece.rotation.z = (Math.random() - 0.5) * Math.PI;
          piece.userData.startPosition = null; // Reset for next cycle
        });
        xAxis.material.opacity = 0;
        yAxis.material.opacity = 0;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    }
  }, []);

  return <div ref={mountRef} style={{ width: '192px', height: '192px' }} />;
};

export default AnimatedTargetIcon;
