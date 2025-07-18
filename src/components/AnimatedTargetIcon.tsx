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

    camera.position.z = 10;

    // --- Animation Objects ---

    // 1. Receipts
    const receipts = [];
    const receiptMaterial = new THREE.MeshBasicMaterial({ color: 0x60a5fa, side: THREE.DoubleSide }); // Lighter blue for receipts
    const receiptGeometry = new THREE.PlaneGeometry(1.5, 3); // Tall rectangle shape

    for (let i = 0; i < 15; i++) {
      const receipt = new THREE.Mesh(receiptGeometry, receiptMaterial);
      receipt.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5
      );
      receipt.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(receipt);
      receipts.push(receipt);
    }

    // 2. Dashboard
    const dashboardGroup = new THREE.Group();
    const dashboardMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const dashboardGeometry = new THREE.PlaneGeometry(8, 5);
    const dashboard = new THREE.Mesh(dashboardGeometry, dashboardMaterial);
    dashboardGroup.add(dashboard);
    dashboardGroup.visible = false; // Initially hidden
    scene.add(dashboardGroup);
    
    // 3. Dashboard elements (charts)
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const bar1 = new THREE.Mesh(new THREE.PlaneGeometry(1, 2), barMaterial);
    bar1.position.set(-2.5, -0.5, 0.1);
    dashboardGroup.add(bar1);

    const bar2 = new THREE.Mesh(new THREE.PlaneGeometry(1, 3), barMaterial);
    bar2.position.set(0, 0, 0.1);
    dashboardGroup.add(bar2);
    
    const bar3 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.5), barMaterial);
    bar3.position.set(2.5, -0.75, 0.1);
    dashboardGroup.add(bar3);


    // --- Animation Logic ---
    let phase = 'scattering'; // scattering -> transforming -> revealing
    let phaseTime = 0;
    const clock = new THREE.Clock();

    const animate = function () {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      phaseTime += deltaTime;

      if (phase === 'scattering') {
        receipts.forEach(r => {
            r.visible = true;
            // Gently float around
            r.rotation.x += deltaTime * 0.2;
            r.rotation.y += deltaTime * 0.2;
        });
        if (phaseTime > 3) {
            phaseTime = 0;
            phase = 'transforming';
        }
      } else if (phase === 'transforming') {
          receipts.forEach(r => {
              r.position.lerp(new THREE.Vector3(0,0,0), deltaTime * 2);
              r.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), deltaTime * 2);
          });
          if (phaseTime > 2) {
              phaseTime = 0;
              phase = 'revealing';
              receipts.forEach(r => r.visible = false);
              dashboardGroup.visible = true;
              dashboardGroup.scale.set(0,0,0);
              bar1.scale.y = 0;
              bar2.scale.y = 0;
              bar3.scale.y = 0;
          }
      } else if (phase === 'revealing') {
          dashboardGroup.scale.lerp(new THREE.Vector3(1,1,1), deltaTime * 3);
          
          // Animate bars growing
          if(bar1.scale.y < 1) bar1.scale.y += deltaTime * 2;
          if(bar2.scale.y < 1) bar2.scale.y += deltaTime * 1.5;
          if(bar3.scale.y < 1) bar3.scale.y += deltaTime * 2.5;

          if (phaseTime > 4) {
              phaseTime = 0;
              phase = 'scattering';
              dashboardGroup.visible = false;
              // Reset receipts for next loop
              receipts.forEach(r => {
                r.position.set(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 5
                );
                r.scale.set(1,1,1);
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

export default AnimatedTargetIcon;
