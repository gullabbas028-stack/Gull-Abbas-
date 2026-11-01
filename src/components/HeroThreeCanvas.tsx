import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 1. Procedural 3D Wave Particle Grid
    const numRows = 70;
    const numCols = 70;
    const count = numRows * numCols;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color(0x00d4ff); // Electric cyan
    const colorB = new THREE.Color(0x7b2ffe); // Neon purple
    const colorC = new THREE.Color(0x0077ff); // Azure blue

    const spacing = 1.4;
    const xOffset = (numCols * spacing) / 2;
    const zOffset = (numRows * spacing) / 2;

    let index = 0;
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const x = c * spacing - xOffset;
        const z = r * spacing - zOffset;
        positions[index * 3] = x;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = z;

        // Radial color gradient
        const distFromCenter = Math.sqrt(x * x + z * z) / 35;
        const mixed = colorA.clone().lerp(distFromCenter > 0.5 ? colorB : colorC, Math.min(distFromCenter, 1));
        colors[index * 3] = mixed.r;
        colors[index * 3 + 1] = mixed.g;
        colors[index * 3 + 2] = mixed.b;

        index++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create custom point texture for soft luminous round particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 212, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(123, 47, 254, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.95,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. Floating architectural geometric wireframe icosahedrons
    const polyGroup = new THREE.Group();
    const polyGeo = new THREE.IcosahedronGeometry(4, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(16, 8, -5);
    polyGroup.add(polyMesh);

    const polyGeo2 = new THREE.OctahedronGeometry(3, 0);
    const polyMat2 = new THREE.MeshBasicMaterial({
      color: 0x7b2ffe,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const polyMesh2 = new THREE.Mesh(polyGeo2, polyMat2);
    polyMesh2.position.set(-18, 6, -10);
    polyGroup.add(polyMesh2);

    scene.add(polyGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 6;
      camera.position.y = 18 + targetY * 4;
      camera.lookAt(0, 0, 0);

      // Animate particle wave elevations
      const posAttr = particleGeometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      let idx = 0;
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          const x = posArray[idx * 3];
          const z = posArray[idx * 3 + 2];

          // Complex dual-wave frequency with mouse interaction factor
          const wave1 = Math.sin(x * 0.18 + delta * 1.5) * 2.2;
          const wave2 = Math.cos(z * 0.18 + delta * 1.2) * 2.2;
          const distMouse = Math.sqrt((x - targetX * 25) ** 2 + (z - targetY * 25) ** 2);
          const mouseRipple = Math.sin(Math.max(0, 15 - distMouse) * 0.6) * 1.8;

          posArray[idx * 3 + 1] = wave1 + wave2 + mouseRipple;
          idx++;
        }
      }
      posAttr.needsUpdate = true;

      // Rotate geometric shapes
      polyMesh.rotation.x += 0.003;
      polyMesh.rotation.y += 0.005;
      polyMesh2.rotation.x -= 0.004;
      polyMesh2.rotation.z += 0.004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      polyGeo2.dispose();
      polyMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
