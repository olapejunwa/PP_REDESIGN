import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DataNodeNetworkBloom = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ─── Scene, Camera, Renderer ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    mount.appendChild(renderer.domElement);

    // ─── Lights ─────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const point = new THREE.PointLight(0xffffff, 0.8);
    point.position.set(10, 10, 10);
    scene.add(point);

    // ─── 1) Document Fade-In ────────────────────────────────────────────────────
    const docMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const docGeom = new THREE.PlaneGeometry(8, 10);
    const documentMesh = new THREE.Mesh(docGeom, docMat);
    scene.add(documentMesh);

    // ─── 2) Network Group (nodes, lines, arrow, central) ───────────────────────
    const network = new THREE.Group();
    network.visible = false;
    scene.add(network);

    // — Central KPI Node —
    const centralMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
    const central = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      centralMat
    );
    network.add(central);

    // — Outer Data Nodes —
    const nodeCount = 12;
    const radius = 6;
    const outerNodes = [];
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 12, 12),
        nodeMat
      );
      node.position.set(x, y, 0.1);
      node.scale.set(0, 0, 0);
      outerNodes.push(node);
      network.add(node);
    }

    // — Connection Lines —
    const lines = [];
    const lineMat = new THREE.LineBasicMaterial({ color: 0xcccccc });
    outerNodes.forEach((node) => {
      const pts = [node.position.clone(), central.position.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, lineMat);
      line.visible = false;
      lines.push(line);
      network.add(line);
    });

    // — Rising Trend Arrow —
    const arrowGroup = new THREE.Group();
    // compute start/end
    const start = new THREE.Vector3(-4, -4, 0);
    const end   = new THREE.Vector3( 4,  4, 0);
    const dir   = new THREE.Vector3().subVectors(end, start).normalize();
    const len   = start.distanceTo(end);
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    // shaft
    const shaftGeo = new THREE.CylinderGeometry(0.05, 0.05, len, 8);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xff7f0e });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.copy(midpoint);
    shaft.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir
    );
    arrowGroup.add(shaft);

    // head
    const headGeo = new THREE.ConeGeometry(0.2, 0.8, 16);
    const head = new THREE.Mesh(headGeo, shaftMat);
    head.position.copy(end);
    head.quaternion.copy(shaft.quaternion);
    arrowGroup.add(head);

    arrowGroup.scale.set(0, 0, 0);
    arrowGroup.visible = false;
    network.add(arrowGroup);

    // ─── Easing Functions ───────────────────────────────────────────────────────
    const easeOutBack = (t) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    // ─── Animation Phases & Timing ──────────────────────────────────────────────
    const docFadeDur       = 0.4;
    const spawnInterval    = 0.2;
    const connectInterval  = 0.15;
    const arrowDur         = 0.5;
    const pulseDur         = 1;
    const holdDur          = 1;

    let phase = 0, timer = 0;
    const clock = new THREE.Clock();

    function resetAll() {
      docMat.opacity = 0;
      network.visible = false;
      outerNodes.forEach(n => n.scale.set(0, 0, 0));
      lines.forEach(l => (l.visible = false));
      arrowGroup.visible = false;
      arrowGroup.scale.set(0, 0, 0);
      central.scale.set(1, 1, 1);
    }

    function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();
      timer += dt;

      // ── Phase 0: Document Fade-In ───────────────────────────────────────────
      if (phase === 0) {
        const t = Math.min(timer / docFadeDur, 1);
        docMat.opacity = t;
        if (t === 1) {
          phase = 1;
          timer = 0;
          network.visible = true;
        }
      }
      // ── Phase 1: Spawn Nodes ────────────────────────────────────────────────
      else if (phase === 1) {
        outerNodes.forEach((node, i) => {
          const startT = i * spawnInterval;
          if (timer >= startT) {
            const localT = Math.min((timer - startT) / spawnInterval, 1);
            const s = easeOutBack(localT);
            node.scale.set(s, s, s);
          }
        });
        if (timer >= nodeCount * spawnInterval) {
          phase = 2;
          timer = 0;
        }
      }
      // ── Phase 2: Connect Lines & Arrow ──────────────────────────────────────
      else if (phase === 2) {
        lines.forEach((line, i) => {
          if (timer >= i * connectInterval) line.visible = true;
        });
        if (timer >= nodeCount * connectInterval) {
          arrowGroup.visible = true;
          phase = 3;
          timer = 0;
        }
      }
      // ── Phase 3: Arrow Pop ─────────────────────────────────────────────────
      else if (phase === 3) {
        const t = Math.min(timer / arrowDur, 1);
        const s = easeOutBack(t);
        arrowGroup.scale.set(s, s, s);
        if (t === 1) {
          phase = 4;
          timer = 0;
        }
      }
      // ── Phase 4: Center Pulse ───────────────────────────────────────────────
      else if (phase === 4) {
        const p = Math.sin((timer / pulseDur) * Math.PI * 2) * 0.2 + 1;
        central.scale.set(p, p, p);
        if (timer >= pulseDur) {
          phase = 5;
          timer = 0;
        }
      }
      // ── Phase 5: Hold, then Reset ───────────────────────────────────────────
      else if (phase === 5) {
        if (timer >= holdDur) {
          phase = 0;
          timer = 0;
          resetAll();
        }
      }

      // gentle background rotation
      network.rotation.y += dt * 0.02;

      renderer.render(scene, camera);
    }

    // kick things off
    resetAll();
    animate();

    // cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: 300, height: 300 }} />;
};

export default DataNodeNetworkBloom;
