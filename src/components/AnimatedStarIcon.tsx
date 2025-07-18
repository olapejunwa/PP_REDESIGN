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

    // 1. Unfolding Paper
    const reportGroup = new THREE.Group();
    const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const paperGeometry = new THREE.PlaneGeometry(8, 10);
    
    const leftHalf = new THREE.Mesh(paperGeometry, paperMaterial);
    leftHalf.position.x = -4;
    
    const rightHalf = new THREE.Mesh(paperGeometry, paperMaterial);
    rightHalf.position.x = 4;

    const hinge = new THREE.Group();
    hinge.add(leftHalf);
    hinge.add(rightHalf);
    
    reportGroup.add(hinge);
    scene.add(reportGroup);
    
    // 2. Report Metrics (KPIs, Charts)
    const metricsGroup = new THREE.Group();
    metricsGroup.visible = false;
    reportGroup.add(metricsGroup);

    // Simple bar chart
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.1), barMaterial);
    bar1.position.set(-2, -2, 0.1);
    metricsGroup.add(bar1);

    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 0.1), barMaterial);
    bar2.position.set(0, -1.5, 0.1);
    metricsGroup.add(bar2);

    const bar3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.1), barMaterial);
    bar3.position.set(2, -2.25, 0.1);
    metricsGroup.add(bar3);

    // 3. Checkmark
    const checkmarkMaterial = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0 });
    const checkmarkShape = new THREE.Shape();
    checkmarkShape.moveTo(-1.5, 0);
    checkmarkShape.lineTo(0, 1.5);
    checkmarkShape.lineTo(2.5, -1);
    checkmarkShape.lineTo(2, -1.5);
    checkmarkShape.lineTo(0, 0.5);
    checkmarkShape.lineTo(-1, -0.5);
    const checkmarkGeometry = new THREE.ShapeGeometry(checkmarkShape);
    const checkmark = new THREE.Mesh(checkmarkGeometry, checkmarkMaterial);
    checkmark.position.set(0, 1, 0.2);
    checkmark.visible = false;
    metricsGroup.add(checkmark);


    // --- Animation Logic ---
    let phase = 'unfolding'; // unfolding -> metrics -> checkmark -> folding
    let phaseTime = 0;
    const clock = new THREE.Clock();

    const animate = function () {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      phaseTime += deltaTime;

      if (phase === 'unfolding') {
        rightHalf.rotation.y = THREE.MathUtils.lerp(rightHalf.rotation.y, 0, deltaTime * 5);
        if (phaseTime > 2) {
          phaseTime = 0;
          phase = 'metrics';
          metricsGroup.visible = true;
          metricsGroup.children.forEach(c => c.scale.set(0,0,0));
        }
      } else if (phase === 'metrics') {
        metricsGroup.children.forEach(child => {
            child.scale.lerp(new THREE.Vector3(1,1,1), deltaTime * 4);
        });
        if (phaseTime > 1.5) {
          phaseTime = 0;
          phase = 'checkmark';
          checkmark.visible = true;
        }
      } else if (phase === 'checkmark') {
        checkmarkMaterial.emissiveIntensity = (Math.sin(phaseTime * 5) + 1) / 2; // Glow
        if (phaseTime > 2.5) {
          phaseTime = 0;
          phase = 'folding';
        }
      } else if (phase === 'folding') {
        metricsGroup.visible = false;
        checkmark.visible = false;
        checkmarkMaterial.emissiveIntensity = 0;
        rightHalf.rotation.y = THREE.MathUtils.lerp(rightHalf.rotation.y, -Math.PI, deltaTime * 5);
        if (phaseTime > 2) {
          phaseTime = 0;
          phase = 'unfolding';
        }
      }
      
      reportGroup.rotation.y += deltaTime * 0.1;
      renderer.render(scene, camera);
    };
    
    // Initial state
    rightHalf.rotation.y = -Math.PI;
    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '192px', height: '192px' }} />;
};

export default AnimatedStarIcon;
