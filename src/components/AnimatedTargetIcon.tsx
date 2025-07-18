import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Define TypeScript types for the component's props
interface AnimatedTargetIconProps {
  /** The radius from the center where elements will scatter. Default: 8 */
  scatterRadius?: number;
  /** The total duration of the formation animation in seconds. Default: 2 */
  animationDuration?: number;
}

const AnimatedTargetIcon: React.FC<AnimatedTargetIconProps> = ({
  scatterRadius = 8,
  animationDuration = 2,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Reduced Motion Check ---
    // Provides a fallback for users who prefer less motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(192, 192);
    mount.appendChild(renderer.domElement);

    // --- Chart Elements ---
    const elements: THREE.Object3D[] = [];
    const finalState = {
      positions: [
        { x: -2, y: -1.5, z: 0 }, // Left bar
        { x: 0, y: -1, z: 0 },   // Middle bar
        { x: 2, y: -1.3, z: 0 },  // Right bar
      ],
      geometries: [
        new THREE.BoxGeometry(0.8, 2, 0.8),
        new THREE.BoxGeometry(0.8, 3, 0.8),
        new THREE.BoxGeometry(0.8, 2.4, 0.8),
      ],
    };

    // Create Chart Bars
    finalState.geometries.forEach((geom, i) => {
      geom.translate(0, finalState.geometries[i].parameters.height / 2, 0); // Set pivot to base
      const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
      const bar = new THREE.Mesh(geom, material);
      elements.push(bar);
    });

    // Create Chart Axes
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0xadb5bd });
    const xAxisGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5, -3, 0), new THREE.Vector3(3.5, -3, 0)]);
    const yAxisGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5, -3, 0), new THREE.Vector3(-3.5, 2, 0)]);
    const xAxis = new THREE.Line(xAxisGeom, axisMaterial);
    const yAxis = new THREE.Line(yAxisGeom, axisMaterial);
    elements.push(xAxis, yAxis);
    
    // Define final positions for all elements
    const allFinalPositions = [
        ...finalState.positions,
        { x: 0, y: 0, z: -0.1 }, // X-Axis final position
        { x: 0, y: 0, z: -0.1 }  // Y-Axis final position
    ];

    // --- Initial State & Animation Data ---
    elements.forEach((el, i) => {
      // Store final state in userData
      el.userData.finalPosition = new THREE.Vector3(allFinalPositions[i].x, allFinalPositions[i].y, allFinalPositions[i].z);
      el.userData.finalRotation = new THREE.Euler(0, 0, 0);

      if (prefersReducedMotion) {
        // If reduced motion is preferred, start at the final state
        el.position.copy(el.userData.finalPosition);
        el.rotation.copy(el.userData.finalRotation);
      } else {
        // Otherwise, start scattered
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * scatterRadius;
        el.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * scatterRadius);
        el.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      }
      
      // Store start state for interpolation
      el.userData.startPosition = el.position.clone();
      el.userData.startRotation = el.rotation.clone();

      scene.add(el);
    });


    // --- Animation Loop ---
    let animationTime = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      animationTime += deltaTime;
      
      // Staggered animation progress for each element
      elements.forEach((el, i) => {
        const staggerDelay = i * 0.05;
        const progress = Math.min(Math.max(0, (animationTime - staggerDelay) / animationDuration), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // Ease-out quint

        // Interpolate position and rotation from start to final state
        el.position.lerpVectors(el.userData.startPosition, el.userData.finalPosition, easeProgress);
        el.quaternion.slerpQuaternions(new THREE.Quaternion().setFromEuler(el.userData.startRotation), new THREE.Quaternion().setFromEuler(el.userData.finalRotation), easeProgress);
      });
      
      // Reset animation loop after a pause
      if (animationTime > animationDuration + 2.5) {
        animationTime = 0;
        if (!prefersReducedMotion) {
            elements.forEach((el) => {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * scatterRadius;
                el.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * scatterRadius);
                el.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                el.userData.startPosition = el.position.clone();
                el.userData.startRotation = el.rotation.clone();
            });
        }
      }
      
      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Render once in the final state if reduced motion is on
      renderer.render(scene, camera);
    }

    // --- Cleanup ---
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose of Three.js objects to free up memory
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    }
  }, [scatterRadius, animationDuration]); // Re-run effect if props change

  return <div ref={mountRef} style={{ width: '192px', height: '192px' }} />;
};

export default AnimatedTargetIcon;
