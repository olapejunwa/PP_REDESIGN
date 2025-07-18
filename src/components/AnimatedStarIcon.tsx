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
