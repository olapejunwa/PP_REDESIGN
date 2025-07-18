import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface AnimatedTargetIconProps {
  scatterRadius?: number;
  animationDuration?: number;
  staggerDelay?: number;
  className?: string;
}

const AnimatedTargetIcon: React.FC<AnimatedTargetIconProps> = ({
  scatterRadius = 8,
  animationDuration = 2.5,
  staggerDelay = 0.2,
  className
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(192, 192);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Chart elements configuration
    const chartElements = [
      // Chart bars
      {
        type: 'bar',
        geometry: new THREE.PlaneGeometry(0.6, 1.8),
        material: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        finalPosition: new THREE.Vector3(-1.5, -0.5, 0),
        animationDelay: 0
      },
      {
        type: 'bar',
        geometry: new THREE.PlaneGeometry(0.6, 2.8),
        material: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        finalPosition: new THREE.Vector3(0, -0.1, 0),
        animationDelay: staggerDelay
      },
      {
        type: 'bar',
        geometry: new THREE.PlaneGeometry(0.6, 2.2),
        material: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        finalPosition: new THREE.Vector3(1.5, -0.3, 0),
        animationDelay: staggerDelay * 2
      },
      // Y-Axis
      {
        type: 'axis',
        geometry: new THREE.PlaneGeometry(0.08, 4),
        material: new THREE.MeshBasicMaterial({ color: 0x6b7280 }),
        finalPosition: new THREE.Vector3(-2.5, 0, -0.1),
        animationDelay: staggerDelay * 3
      },
      // X-Axis
      {
        type: 'axis',
        geometry: new THREE.PlaneGeometry(4.5, 0.08),
        material: new THREE.MeshBasicMaterial({ color: 0x6b7280 }),
        finalPosition: new THREE.Vector3(-0.25, -2, -0.1),
        animationDelay: staggerDelay * 4
      },
      // Grid lines (optional decorative elements)
      {
        type: 'grid',
        geometry: new THREE.PlaneGeometry(4, 0.02),
        material: new THREE.MeshBasicMaterial({ color: 0xe5e7eb, transparent: true, opacity: 0.5 }),
        finalPosition: new THREE.Vector3(-0.25, 0.5, -0.2),
        animationDelay: staggerDelay * 5
      },
      {
        type: 'grid',
        geometry: new THREE.PlaneGeometry(4, 0.02),
        material: new THREE.MeshBasicMaterial({ color: 0xe5e7eb, transparent: true, opacity: 0.5 }),
        finalPosition: new THREE.Vector3(-0.25, 1, -0.2),
        animationDelay: staggerDelay * 6
      }
    ];

    // Create mesh objects and set initial scattered positions
    const meshes: Array<{
      mesh: THREE.Mesh;
      finalPosition: THREE.Vector3;
      scatteredPosition: THREE.Vector3;
      animationDelay: number;
      startTime?: number;
    }> = [];

    chartElements.forEach((element) => {
      const mesh = new THREE.Mesh(element.geometry, element.material);
      
      // Generate random scattered position
      const scatteredPosition = new THREE.Vector3(
        (Math.random() - 0.5) * scatterRadius * 2,
        (Math.random() - 0.5) * scatterRadius * 2,
        (Math.random() - 0.5) * 2
      );
      
      // Set initial position to scattered
      mesh.position.copy(scatteredPosition);
      
      // Add random rotation for more dramatic scatter effect
      mesh.rotation.z = (Math.random() - 0.5) * Math.PI;
      
      scene.add(mesh);
      
      meshes.push({
        mesh,
        finalPosition: element.finalPosition,
        scatteredPosition,
        animationDelay: element.animationDelay
      });
    });

    // Animation variables
    let animationStartTime = 0;
    const clock = new THREE.Clock();
    let isAnimating = true;

    // Easing function (ease-out cubic)
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      if (animationStartTime === 0) {
        animationStartTime = elapsedTime;
      }
      
      const totalElapsed = elapsedTime - animationStartTime;
      
      // Animate each mesh with staggered timing
      meshes.forEach((item) => {
        const elementStartTime = item.animationDelay;
        const elementElapsed = Math.max(0, totalElapsed - elementStartTime);
        const progress = Math.min(elementElapsed / animationDuration, 1);
        
        if (progress > 0) {
          // Apply easing
          const easedProgress = easeOutCubic(progress);
          
          // Interpolate position
          item.mesh.position.lerpVectors(
            item.scatteredPosition,
            item.finalPosition,
            easedProgress
          );
          
          // Interpolate rotation back to 0
          const initialRotation = item.mesh.userData.initialRotation || item.mesh.rotation.z;
          if (!item.mesh.userData.initialRotation) {
            item.mesh.userData.initialRotation = item.mesh.rotation.z;
          }
          
          item.mesh.rotation.z = THREE.MathUtils.lerp(
            initialRotation,
            0,
            easedProgress
          );
          
          // Fade in effect
          if (item.mesh.material instanceof THREE.MeshBasicMaterial) {
            const targetOpacity = item.mesh.material.userData.targetOpacity || 1;
            if (!item.mesh.material.userData.targetOpacity) {
              item.mesh.material.userData.targetOpacity = item.mesh.material.opacity;
              item.mesh.material.transparent = true;
              item.mesh.material.opacity = 0;
            }
            
            item.mesh.material.opacity = THREE.MathUtils.lerp(
              0,
              targetOpacity,
              easedProgress
            );
          }
        }
      });
      
      // Check if animation is complete
      const totalAnimationTime = animationDuration + (meshes.length - 1) * staggerDelay;
      if (totalElapsed > totalAnimationTime + 1.5 && isAnimating) {
        // Reset animation after a pause
        setTimeout(() => {
          // Reset all elements to scattered positions
          meshes.forEach((item) => {
            // Generate new random scattered position
            item.scatteredPosition.set(
              (Math.random() - 0.5) * scatterRadius * 2,
              (Math.random() - 0.5) * scatterRadius * 2,
              (Math.random() - 0.5) * 2
            );
            
            item.mesh.position.copy(item.scatteredPosition);
            item.mesh.rotation.z = (Math.random() - 0.5) * Math.PI;
            item.mesh.userData.initialRotation = item.mesh.rotation.z;
            
            if (item.mesh.material instanceof THREE.MeshBasicMaterial) {
              item.mesh.material.opacity = 0;
            }
          });
          
          // Restart animation
          animationStartTime = 0;
          clock.start();
        }, 500);
      }
      
      renderer.render(scene, camera);
    };

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation and show final state
      meshes.forEach((item) => {
        item.mesh.position.copy(item.finalPosition);
        item.mesh.rotation.z = 0;
        if (item.mesh.material instanceof THREE.MeshBasicMaterial) {
          item.mesh.material.opacity = item.mesh.material.userData.targetOpacity || 1;
        }
      });
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Cleanup function
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      meshes.forEach((item) => {
        item.mesh.geometry.dispose();
        if (item.mesh.material instanceof THREE.Material) {
          item.mesh.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, [scatterRadius, animationDuration, staggerDelay]);

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ width: '192px', height: '192px' }}
      role="img"
      aria-label="Animated chart formation"
    />
  );
};

export default AnimatedTargetIcon;