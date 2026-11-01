import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight interactive 3D hero element: an animated particle wave
 * that reacts to pointer movement. Renders one static frame and skips
 * animation entirely under prefers-reduced-motion.
 */
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const COUNT = 2600;
    const positions = new Float32Array(COUNT * 3);
    const baseX = new Float32Array(COUNT);
    const baseZ = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      baseX[i] = x;
      baseZ[i] = z;
      phase[i] = Math.random() * Math.PI * 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dark = document.documentElement.classList.contains("dark");
    const material = new THREE.PointsMaterial({
      size: 0.045,
      color: dark ? 0x60a5fa : 0x2563eb,
      transparent: true,
      opacity: 0.75,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const render = (t: number) => {
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] =
          Math.sin(baseX[i] * 0.7 + t * 0.0012 + phase[i]) * 0.55 +
          Math.cos(baseZ[i] * 0.9 + t * 0.0009) * 0.3;
      }
      pos.needsUpdate = true;
      points.rotation.y += (pointer.x * 0.35 - points.rotation.y) * 0.04;
      points.rotation.x += (pointer.y * 0.2 - points.rotation.x) * 0.04;
      renderer.render(scene, camera);
    };

    render(0);
    if (!reduced) {
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (visible) render(t);
      };
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-64 w-full sm:h-80 lg:h-[26rem]"
      role="img"
      aria-label="Interactive 3D particle wave visualization"
    />
  );
}
