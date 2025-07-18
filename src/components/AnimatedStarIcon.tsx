import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedStarIcon = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = 256;
    const height = 192;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pt = new THREE.PointLight(0xffffff, 0.8);
    pt.position.set(10, 10, 10);
    scene.add(pt);

    // --- 1) Document Group (fade-in) ---
    const docGroup = new THREE.Group();
    docGroup.scale.set(0, 0, 0);
    scene.add(docGroup);

    // Document plane
    const docMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const docGeom = new THREE.PlaneGeometry(10, 12);
    const documentMesh = new THREE.Mesh(docGeom, docMat);
    docGroup.add(documentMesh);

    // Bars on document
    const barGroup = new THREE.Group();
    const barHeights = [3, 4.5, 2.5];
    const barX = [-3, 0, 3];
    const bars = [];
    barHeights.forEach((h, i) => {
      const geom = new THREE.BoxGeometry(1, h, 1);
      geom.translate(0, h / 2, 0); // pivot at base
      const mat = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x000000 });
      const bar = new THREE.Mesh(geom, mat);
      bar.position.set(barX[i], -4, 0.1);
      barGroup.add(bar);
      bars.push(bar);
    });
    docGroup.add(barGroup);

    // --- 2) Magnifier Group (hidden initially) ---
    const magnifier = new THREE.Group();
    magnifier.visible = false;
    scene.add(magnifier);

    // Lens (semi-transparent)
    const lensRadius = 3;
    const lensGeom = new THREE.CircleGeometry(lensRadius, 64);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, transparent: true, opacity: 0.2
    });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    magnifier.add(lens);

    // Rim
    const rimGeom = new THREE.TorusGeometry(lensRadius, 0.15, 16, 100);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const rim = new THREE.Mesh(rimGeom, rimMat);
    magnifier.add(rim);

    // Handle
    const handleGroup = new THREE.Group();
    const handleGeom = new THREE.CylinderGeometry(0.2, 0.2, 4, 12);
    handleGeom.translate(0, -2, 0); // Set pivot to the top
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const handle = new THREE.Mesh(handleGeom, handleMat);
    handleGroup.add(handle);
    handleGroup.position.set(lensRadius * 0.707, -lensRadius * 0.707, 0); // Position on the rim
    handleGroup.rotation.z = -Math.PI / 4; // Rotate to angle
    magnifier.add(handleGroup);


    // --- Easing ---
    const easeOutQuad = t => t * (2 - t);

    // --- Animation Phases & Timing ---
    let phase = 0; // 0=fadeIn, 1=sweep, 2=moveToCenter, 3=pulse, 4=hold
    let t = 0;
    const clock = new THREE.Clock();

    function reset() {
      docGroup.scale.set(0, 0, 0);
      magnifier.visible = false;
      magnifier.position.set(0, 0, 0);
      magnifier.scale.set(1, 1, 1);
      bars.forEach(bar => {
        bar.material.emissiveIntensity = 0;
        bar.scale.y = 1;
      });
    }
    reset();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      t += delta;

      if (phase === 0) { // Phase 0: Document fade-in (0.5s)
        const p = Math.min(t / 0.5, 1);
        const e = easeOutQuad(p);
        docGroup.scale.set(e, e, e);
        if (p === 1) { phase = 1; t = 0; }
      } 
      else if (phase === 1) { // Phase 1: Sweep magnifier (2.5s)
        if (!magnifier.visible) magnifier.visible = true;
        const p = Math.min(t / 2.5, 1);
        const e = easeOutQuad(p);
        const x = -12 + (24 * e);
        const y = Math.sin(p * Math.PI * 4) * 2;
        magnifier.position.set(x, y, 0.2);

        bars.forEach(bar => {
          const dist = magnifier.position.distanceTo(bar.position);
          bar.material.emissiveIntensity = THREE.MathUtils.lerp(bar.material.emissiveIntensity, dist < lensRadius ? 0.5 : 0, delta * 5);
          bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, dist < lensRadius ? 1.2 : 1, delta * 5);
        });

        if (p === 1) { phase = 2; t = 0; }
      } 
      else if (phase === 2) { // Phase 2: Move to Center (0.5s)
        const p = Math.min(t / 0.5, 1);
        const e = easeOutQuad(p);
        const startPos = new THREE.Vector3(12, 0, 0.2);
        const endPos = new THREE.Vector3(bars[1].position.x, 0, 0.2);
        magnifier.position.lerpVectors(startPos, endPos, e);
        if (p === 1) { phase = 3; t = 0; }
      }
      else if (phase === 3) { // Phase 3: Pulse over key KPI (1.2s)
        const pulse = Math.sin((t / 0.6) * Math.PI * 2) * 0.1 + 1;
        magnifier.scale.set(pulse, pulse, 1);
        bars[1].material.emissiveIntensity = 0.7;
        bars[1].scale.y = 1.2;
        if (t > 1.2) { phase = 4; t = 0; }
      } 
      else if (phase === 4) { // Phase 4: Hold (1.5s) then reset
        magnifier.scale.set(1, 1, 1);
        if (t > 1.5) { phase = 0; t = 0; reset(); }
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => mount.removeChild(renderer.domElement);

  }, []);

  return <div ref={mountRef} style={{ width: 256, height: 192 }} />;
};

export default AnimatedStarIcon;
