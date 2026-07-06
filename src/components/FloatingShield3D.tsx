import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingShield3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xc7d2fe, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.6);
    mainLight.position.set(2, 3, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa78bfa, 0.7);
    fillLight.position.set(-4, -1, 2);
    scene.add(fillLight);

    const specLight = new THREE.PointLight(0xc4b5fd, 1.2, 10);
    specLight.position.set(0, 2, 3);
    scene.add(specLight);

    // Shield shape using IcosahedronGeometry for faceted look
    const shieldGroup = new THREE.Group();

    const icosaGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      metalness: 0.7,
      roughness: 0.25,
      flatShading: true,
    });
    const shield = new THREE.Mesh(icosaGeo, shieldMat);
    shieldGroup.add(shield);

    // Wireframe overlay for premium look
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireShield = new THREE.Mesh(icosaGeo, wireMat);
    wireShield.scale.setScalar(1.02);
    shieldGroup.add(wireShield);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.2,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    shieldGroup.add(glow);

    scene.add(shieldGroup);

    // Mouse tracking for parallax tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth parallax follow
      targetRotY = mouseX * 0.6;
      targetRotX = -mouseY * 0.4;

      shieldGroup.rotation.y += (targetRotY - shieldGroup.rotation.y) * 0.08;
      shieldGroup.rotation.x += (targetRotX - shieldGroup.rotation.x) * 0.08;

      // Subtle idle rotation
      shieldGroup.rotation.y += 0.003;
      shieldGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.08;

      // Float
      shieldGroup.position.y = Math.sin(elapsed * 1.0) * 0.12;

      // Pulse glow
      glow.scale.setScalar(0.5 + Math.sin(elapsed * 2) * 0.08);
      (glow.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(elapsed * 2) * 0.08;

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 cursor-pointer select-none"
      title="Garantía y protección"
    />
  );
}
