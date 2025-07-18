import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ReportSheetUnfold = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ─── Scene & Camera ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(192, 192);
    mount.appendChild(renderer.domElement);

    // ─── Lights ─────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const point = new THREE.PointLight(0xffffff, 0.8);
    point.position.set(10, 10, 10);
    scene.add(point);

    // ─── Report Sheet ───────────────────────────────────────────────────────────
    const report = new THREE.Group();
    scene.add(report);

    const width = 8, height = 10;
    // Left half pivots on its right edge
    const leftGeom = new THREE.PlaneGeometry(width, height);
    leftGeom.translate(width / 2, 0, 0);
    const leftMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const leftHalf = new THREE.Mesh(leftGeom, leftMat);
    leftHalf.position.x = -width / 2;
    report.add(leftHalf);

    // Right half pivots on its left edge
    const rightGeom = new THREE.PlaneGeometry(width, height);
    rightGeom.translate(-width / 2, 0, 0);
    const rightMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, side: THREE.DoubleSide });
    const rightHalf = new THREE.Mesh(rightGeom, rightMat);
    rightHalf.position.x = width / 2;
    report.add(rightHalf);

    // ─── Metrics “Pop” Group ───────────────────────────────────────────────────
    const metrics = new THREE.Group();
    metrics.scale.set(0, 0, 0);
    report.add(metrics);

    const barMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });
    [
      { x: -2, base: -2, h: 2 },
      { x:  0, base: -1.5, h: 3 },
      { x:  2, base: -2.25, h: 1.5 }
    ].forEach(({ x, base, h }) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, h, 0.1), barMat);
      mesh.position.set(x, base + h / 2, 0.1);
      metrics.add(mesh);
    });

    // ─── Checkmark with Glow ────────────────────────────────────────────────────
    const checkMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0
    });
    const shape = new THREE.Shape();
    shape.moveTo(-1.5, 0);
    shape.lineTo(0, 1.5);
    shape.lineTo(2.5, -1);
    const checkGeom = new THREE.ShapeGeometry(shape);
    const check = new THREE.Mesh(checkGeom, checkMat);
    check.position.set(0, 2, 0.2);
    check.visible = false;
    report.add(check);

    // ─── Animation Helpers ─────────────────────────────────────────────────────
    const easeOutQuad = t => t * (2 - t);
    const easeOutBack = t => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const clock = new THREE.Clock();

    let phase = 0;      // 0 = unfold, 1 = metrics, 2 = check, 3 = refold
    let timer = 0;
    const durations = [2, 1.5, 2.5, 2];  // seconds for each phase

    function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      timer += dt;

      // ── Phase 0: Unfold ───────────────────────
      if (phase === 0) {
        const t = Math.min(timer / durations[0], 1);
        const e = easeOutQuad(t);
        leftHalf.rotation.y  =  e * Math.PI / 2;
        rightHalf.rotation.y = -e * Math.PI / 2;
        if (t === 1) { phase = 1; timer = 0; }
      }
      // ── Phase 1: Metrics Pop ─────────────────
      else if (phase === 1) {
        const t = Math.min(timer / durations[1], 1);
        const e = easeOutBack(t);
        metrics.scale.set(e, e, e);
        if (t === 1) { phase = 2; timer = 0; check.visible = true; }
      }
      // ── Phase 2: Checkmark Glow ──────────────
      else if (phase === 2) {
        checkMat.emissiveIntensity = (Math.sin(timer * 5) + 1) * 0.25 + 0.25;
        if (timer > durations[2]) { phase = 3; timer = 0; checkMat.emissiveIntensity = 0; }
      }
      // ── Phase 3: Refold ───────────────────────
      else if (phase === 3) {
        const t = Math.min(timer / durations[3], 1);
        const e = easeOutQuad(1 - t);
        leftHalf.rotation.y  =  e * Math.PI / 2;
        rightHalf.rotation.y = -e * Math.PI / 2;
        metrics.scale.set(0, 0, 0);
        check.visible = false;
        if (t === 1) { phase = 0; timer = 0; }
      }

      // Slow group rotation for a little 3D flair
      report.rotation.y += dt * 0.1;

      renderer.render(scene, camera);
    }

    // Start closed
    leftHalf.rotation.y  = 0;
    rightHalf.rotation.y = 0;
    animate();

    // ─── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '192px', height: '192px' }} />;
};

export default ReportSheetUnfold;
