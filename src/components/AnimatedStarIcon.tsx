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

    camera.position.z = 10; // Pulled camera back

    // Scattered numbers
    const numbers = [];
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8); // Larger boxes
      const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = (Math.random() - 0.5) * 14;
      cube.position.y = (Math.random() - 0.5) * 14;
      scene.add(cube);
      numbers.push(cube);
    }
    
    // Magnifying glass
    const group = new THREE.Group();
    const ringGeometry = new THREE.RingGeometry(1.8, 2.2, 32); // Larger ring
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    group.add(ring);

    const handleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32); // Larger handle
    const handleMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = -3;
    group.add(handle);
    scene.add(group);


    const animate = function () {
      requestAnimationFrame(animate);
      group.position.x = Math.sin(Date.now() * 0.0008) * 5;
      
      numbers.forEach(num => {
          if (num.position.distanceTo(group.position) < 2.5) {
              num.material.color.set(0x2563eb);
          } else {
              num.material.color.set(0xcccccc);
          }
      });

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
