import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedStarIcon = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(192, 192);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 10;

    // --- Animation Objects ---

    // 1. Chart Bars
    const chartGroup = new THREE.Group();
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    
    const barGeometries = [
        new THREE.BoxGeometry(1.5, 4, 1.5),
        new THREE.BoxGeometry(1.5, 6, 1.5),
        new THREE.BoxGeometry(1.5, 3, 1.5)
    ];

    const bars = barGeometries.map((geom, index) => {
        const bar = new THREE.Mesh(geom, barMaterial);
        bar.position.set((index - 1) * 2.5, 0, 0);
        chartGroup.add(bar);
        return bar;
    });
    scene.add(chartGroup);


    // 2. Lightbulb
    const lightbulbGroup = new THREE.Group();
    const bulbMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffff00, 
        emissive: 0xffff00, 
        emissiveIntensity: 0, // Initially off
        metalness: 0.5,
        roughness: 0.5
    });
    const bulbGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 1;
    lightbulbGroup.add(bulb);
    
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const baseGeometry = new THREE.CylinderGeometry(1, 1, 1.5, 32);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.5;
    lightbulbGroup.add(base);
    
    lightbulbGroup.visible = false;
    scene.add(lightbulbGroup);

    // Add a point light to make the bulb glow
    const pointLight = new THREE.PointLight(0xffff00, 0, 100);
    lightbulbGroup.add(pointLight);


    // --- Animation Logic ---
    let phase = 'chart_growing'; // chart_growing -> morphing -> glowing -> reset
    let phaseTime = 0;
    const clock = new THREE.Clock();

    const animate = function () {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      phaseTime += deltaTime;

      if (phase === 'chart_growing') {
          chartGroup.visible = true;
          lightbulbGroup.visible = false;
          bars[0].scale.y = Math.min(1, phaseTime / 1);
          bars[1].scale.y = Math.min(1, phaseTime / 1.5);
          bars[2].scale.y = Math.min(1, phaseTime / 1.2);

          if (phaseTime > 2) {
              phaseTime = 0;
              phase = 'morphing';
          }
      } else if (phase === 'morphing') {
          // Move bars to center and shrink
          bars.forEach(bar => {
              bar.position.lerp(new THREE.Vector3(0, 0, 0), deltaTime * 3);
              bar.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), deltaTime * 3);
          });
          
          if (phaseTime > 1.5) {
              phaseTime = 0;
              phase = 'glowing';
              chartGroup.visible = false;
              lightbulbGroup.visible = true;
              bulbMaterial.emissiveIntensity = 0;
              pointLight.intensity = 0;
          }

      } else if (phase === 'glowing') {
          // Pulse the lightbulb
          const intensity = (Math.sin(phaseTime * 3) + 1) / 2; // Pulsing effect
          bulbMaterial.emissiveIntensity = intensity * 2;
          pointLight.intensity = intensity * 5;

          if (phaseTime > 4) {
              phaseTime = 0;
              phase = 'reset';
          }
      } else if (phase === 'reset') {
          // Fade out lightbulb
          bulbMaterial.emissiveIntensity *= 0.9;
          pointLight.intensity *= 0.9;

          if (phaseTime > 1.5) {
              phaseTime = 0;
              phase = 'chart_growing';
              // Reset bars
              bars.forEach((bar, index) => {
                bar.position.set((index - 1) * 2.5, 0, 0);
                bar.scale.set(1, 0, 1); // Reset scale for next growth animation
              });
          }
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

export default AnimatedStarIcon;
