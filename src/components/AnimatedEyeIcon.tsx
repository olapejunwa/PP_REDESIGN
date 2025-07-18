import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedEyeIcon = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(64, 64);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Bullseye
    for (let i = 1; i <= 3; i++) {
        const geometry = new THREE.RingGeometry(i * 0.5, i * 0.5 + 0.2, 32);
        const material = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xffffff : 0x2563eb, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    // Arrow
    const arrowGeometry = new THREE.ConeGeometry(0.3, 1, 32);
    const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    arrow.rotation.x = Math.PI / 2;
    scene.add(arrow);

    const animate = function () {
      requestAnimationFrame(animate);
      arrow.position.z += 0.1;
      if (arrow.position.z > 2) {
        arrow.position.z = -5;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '64px', height: '64px' }} />;
};

export default AnimatedEyeIcon;
