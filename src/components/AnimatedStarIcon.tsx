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
      bar.position.set(barX[i], -4, 0.1); // Adjusted y-position for better framing
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
    const handleGeom = new THREE.CylinderGeometry(0.2, 0.2, 4, 12);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const handle = new THREE.Mesh(handleGeom, handleMat);
    handle.position.set(0, -lensRadius - 1.8, 0); // Positioned below the rim
    magnifier.add(handle);
    magnifier.rotation.z = -Math.PI / 4; // Rotated the whole magnifier for a better angle


    // --- Easing ---
    const easeOutQuad = t => t * (2 - t);

    // --- Animation Phases & Timing ---
    let phase = 0; // 0 = fadeIn, 1 = sweep, 2 = pulse, 3 = retreat, 4 = hold
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

      // Phase 0: Document fade-in (0.5s)
      if (phase === 0) {
        const p = Math.min(t / 0.5, 1);
        const e = easeOutQuad(p);
        docGroup.scale.set(e, e, e);
        if (p === 1) {
          phase = 1; t = 0;
        }
      }
      // Phase 1: Sweep magnifier (2.5s for slower zig-zag)
      else if (phase === 1) {
        if (!magnifier.visible) magnifier.visible = true;
        const p = Math.min(t / 2.5, 1);
        const e = easeOutQuad(p);
        const xStart = -12, xEnd = 12;
        const x = xStart + (xEnd - xStart) * e;
        
        // Zig-zag motion for y
        const y = Math.sin(p * Math.PI * 4) * 2; // 4 half-cycles = 2 full zig-zags

        magnifier.position.set(x, y, 0.2);

        // Highlight bars under lens
        bars.forEach(bar => {
          const dist = magnifier.position.distanceTo(bar.position);
          if (dist < lensRadius) {
            bar.material.emissiveIntensity = THREE.MathUtils.lerp(
              bar.material.emissiveIntensity, 0.5, delta * 5
            );
            bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, 1.2, delta * 5);
          } else {
            bar.material.emissiveIntensity = THREE.MathUtils.lerp(
              bar.material.emissiveIntensity, 0, delta * 5
            );
            bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, 1, delta * 5);
          }
        });

        if (p === 1) {
          phase = 2; t = 0;
        }
      }
      // Phase 2: Pulse over key KPI (0.6s)
      else if (phase === 2) {
        const keyBar = bars[1];
        magnifier.position.lerp(new THREE.Vector3(keyBar.position.x, 0, 0.2), delta * 5);
        const pulse = Math.sin((t / 0.6) * Math.PI * 2) * 0.2 + 1;
        magnifier.scale.set(pulse, pulse, 1);
        keyBar.material.emissiveIntensity = 0.7;
        keyBar.scale.y = 1.2;
        if (t > 0.6) {
          phase = 3; t = 0;
        }
      }
      // Phase 3: Retreat magnifier (1s)
      else if (phase === 3) {
        const p = Math.min(t / 1, 1);
        const e = easeOutQuad(p);
        const startX = bars[1].position.x, endX = 12;
        const x = startX + (endX - startX) * e;
        magnifier.position.set(x, 0, 0.2);
        if (p === 1) {
          phase = 4; t = 0;
        }
      }
      // Phase 4: Hold (1s) then reset
      else if (phase === 4) {
        if (t > 1) {
          phase = 0; t = 0;
          reset();
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => mount.removeChild(renderer.domElement);

  }, []);

  return <div ref={mountRef} style={{ width: 256, height: 192 }} />;
};

export default AnimatedStarIcon;
