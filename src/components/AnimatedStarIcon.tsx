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

const lensRadius = 3;

// 2a) Lens
const lensGeom = new THREE.CircleGeometry(lensRadius, 64);
const lensMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.3,
  depthWrite: false
});
const lens = new THREE.Mesh(lensGeom, lensMat);
magnifier.add(lens);

// 2b) Rim
const rimGeom = new THREE.TorusGeometry(lensRadius, 0.15, 16, 100);
const rimMat  = new THREE.MeshBasicMaterial({ color: 0x333333 });
const rim     = new THREE.Mesh(rimGeom, rimMat);
magnifier.add(rim);

// 2c) Handle
// Create a cylinder whose pivot is at the top end
const handleLength = 4;
const handleGeom   = new THREE.CylinderGeometry(0.15, 0.15, handleLength, 12);
// move geometry down so its top sits at (0,0,0)
handleGeom.translate(0, -handleLength / 2, 0);

const handleMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
const handle    = new THREE.Mesh(handleGeom, handleMat);

// position it at a 45° angle on the rim
const angle = -Math.PI / 4;
handle.position.set(
  Math.cos(angle) * lensRadius,
  Math.sin(angle) * lensRadius,
  0
);
handle.rotation.z = angle;

magnifier.add(handle);

    // --- 3) Animation Timeline ---
    let startTime = Date.now();
    const PHASE_DURATION = 2000; // 2 seconds per phase

    function animate() {
      const elapsed = Date.now() - startTime;
      const phase = Math.floor(elapsed / PHASE_DURATION) % 3;
      const t = (elapsed % PHASE_DURATION) / PHASE_DURATION;

      if (phase === 0) {
        // Phase 1: Document fades in
        const scale = Math.min(t * 2, 1);
        docGroup.scale.setScalar(scale);
        magnifier.visible = false;
      } else if (phase === 1) {
        // Phase 2: Bars grow
        docGroup.scale.setScalar(1);
        bars.forEach((bar, i) => {
          const targetHeight = barHeights[i];
          const currentHeight = targetHeight * Math.min(t * 1.5, 1);
          bar.scale.y = currentHeight / targetHeight;
        });
        magnifier.visible = false;
      } else {
        // Phase 3: Magnifier appears and moves
        docGroup.scale.setScalar(1);
        bars.forEach((bar, i) => {
          bar.scale.y = 1;
        });
        magnifier.visible = true;
        
        // Move magnifier in a circular pattern
        const angle = t * Math.PI * 2;
        magnifier.position.x = Math.cos(angle) * 3;
        magnifier.position.y = Math.sin(angle) * 2;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '256px', height: '192px' }} />;
};

export default AnimatedStarIcon;