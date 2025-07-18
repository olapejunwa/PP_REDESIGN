import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FileChartPop = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 5, 20);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pt = new THREE.PointLight(0xffffff, 0.8);
    pt.position.set(10, 15, 10);
    scene.add(pt);

    // File halves
    const fileGroup = new THREE.Group();
    scene.add(fileGroup);
    const w = 8, h = 10;
    const mat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, side: THREE.DoubleSide });

    const leftGeom = new THREE.PlaneGeometry(w, h);
    leftGeom.translate(w / 2, 0, 0);
    const left = new THREE.Mesh(leftGeom, mat);
    left.position.x = -w/2;
    fileGroup.add(left);

    const rightGeom = new THREE.PlaneGeometry(w, h);
    rightGeom.translate(-w / 2, 0, 0);
    const right = new THREE.Mesh(rightGeom, mat);
    right.position.x = w/2;
    fileGroup.add(right);

    // Chart group (hidden initially)
    const chart = new THREE.Group();
    chart.visible = false;
    fileGroup.add(chart);

    // Bar chart
    const barMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });
    [1.5, 2.5, 3.5].forEach((height, i) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1, height, 1), barMat);
      bar.position.set(-3 + i*3, height/2 - 2, 0);
      chart.add(bar);
    });

    // Line graph + arrow
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff7f0e, linewidth: 2 });
    const points = [
      new THREE.Vector3(-4, -2, 0),
      new THREE.Vector3(-2, -1, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(4, 2, 0),
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, lineMat);
    chart.add(line);

    // Arrow head
    const arrowHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 1, 16),
      new THREE.MeshStandardMaterial({ color: 0xff7f0e })
    );
    arrowHead.position.copy(points[points.length - 1]);
    arrowHead.rotation.z = -Math.PI / 4;
    chart.add(arrowHead);

    // Animation timing
    const clock = new THREE.Clock();
    let phase = 0; // 0=open, 1=show chart, 2=reset
    let t = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      t += dt;

      if (phase === 0) {
        // unfold over 1.5s
        const p = Math.min(t / 1.5, 1);
        left.rotation.y  = p * Math.PI / 2;
        right.rotation.y = -p * Math.PI / 2;
        if (p === 1) { phase = 1; t = 0; chart.visible = true; }
      } else if (phase === 1) {
        // pop chart scale in 1s
        const p = Math.min(t / 1, 1);
        const s = p;
        chart.scale.set(s, s, s);
        if (p === 1) phase = 2;
      } else if (phase === 2 && t > 2) {
        // reset after 2s
        phase = 3; t = 0;
      } else if (phase === 3) {
        // fold back over 1.5s
        const p = Math.min(t / 1.5, 1);
        const q = 1 - p;
        left.rotation.y  = q * Math.PI / 2;
        right.rotation.y = -q * Math.PI / 2;
        chart.scale.set(0, 0, 0);
        chart.visible = false;
        if (p === 1) { phase = 0; t = 0; }
      }

      // gentle rotation
      fileGroup.rotation.y += dt * 0.05;
      renderer.render(scene, camera);
    };

    // start closed
    left.rotation.y = 0;
    right.rotation.y = 0;
    chart.scale.set(0,0,0);
    animate();

    return () => mount.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ width: 200, height: 200 }} />;
};

export default FileChartPop;
