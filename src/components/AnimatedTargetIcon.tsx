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

    // Create scattered pieces that will form a chart
    const pieces = [];
    const finalPositions = [
      { x: -2, y: -1, width: 0.8, height: 2 },    // Left bar
      { x: 0, y: -0.5, width: 0.8, height: 3 },   // Middle bar (tallest)
      { x: 2, y: -0.8, width: 0.8, height: 2.4 }  // Right bar
    ];

    // Create scattered pieces
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.PlaneGeometry(finalPositions[i].width, finalPositions[i].height);
      const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
      const piece = new THREE.Mesh(geometry, material);
      
      // Start at random scattered positions
      piece.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        0
      );
      
      // Store final position
      piece.userData.finalPosition = {
        x: finalPositions[i].x,
        y: finalPositions[i].y,
        z: 0
      };
      
      // Add random rotation
      piece.rotation.z = (Math.random() - 0.5) * Math.PI;
      piece.userData.finalRotation = 0;
      
      scene.add(piece);
      pieces.push(piece);
    }

    // Create chart base/background
    const baseGeometry = new THREE.PlaneGeometry(6, 4);
    const baseMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xf8f9fa, 
      transparent: true, 
      opacity: 0 
    });
    const chartBase = new THREE.Mesh(baseGeometry, baseMaterial);
    chartBase.position.z = -0.1;
    scene.add(chartBase);

    // Animation state
    let animationTime = 0;
    const animationDuration = 3; // 3 seconds total
    const clock = new THREE.Clock();

    const animate = function () {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      animationTime += deltaTime;
      
      // Calculate animation progress (0 to 1)
      const progress = Math.min(animationTime / animationDuration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      
      // Animate pieces moving to their final positions
      pieces.forEach((piece) => {
        const startPos = piece.userData.startPosition || {
          x: piece.position.x,
          y: piece.position.y,
          z: piece.position.z
        };
        
        // Store start position on first frame
        if (!piece.userData.startPosition) {
          piece.userData.startPosition = { ...startPos };
          piece.userData.startRotation = piece.rotation.z;
        }
        
        // Interpolate position
        piece.position.x = startPos.x + (piece.userData.finalPosition.x - startPos.x) * easeProgress;
        piece.position.y = startPos.y + (piece.userData.finalPosition.y - startPos.y) * easeProgress;
        piece.position.z = startPos.z + (piece.userData.finalPosition.z - startPos.z) * easeProgress;
        
        // Interpolate rotation
        piece.rotation.z = piece.userData.startRotation + (piece.userData.finalRotation - piece.userData.startRotation) * easeProgress;
      });
      
      // Fade in chart background as pieces assemble
      chartBase.material.opacity = easeProgress * 0.1;
      
      // Reset animation after completion + pause
      if (animationTime > animationDuration + 2) {
        animationTime = 0;
        // Reset pieces to new random positions
        pieces.forEach((piece) => {
          piece.position.set(
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 8,
            0
          );
          piece.rotation.z = (Math.random() - 0.5) * Math.PI;
          piece.userData.startPosition = null; // Reset for next cycle
        });
        chartBase.material.opacity = 0;
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