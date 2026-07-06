import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingGear3D() {
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
    const ambientLight = new THREE.AmbientLight(0x8b8ec9, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    directionalLight.position.set(3, 4, 5);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 0.8);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // Gear group
    const gearGroup = new THREE.Group();

    // Main torus (gear body)
    const torusGeo = new THREE.TorusGeometry(1, 0.3, 16, 48);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.85,
      roughness: 0.2,
    });
    const torus = new THREE.Mesh(torusGeo, gearMat);
    gearGroup.add(torus);

    // Gear teeth (small boxes around the torus)
    const toothCount = 12;
    const toothGeo = new THREE.BoxGeometry(0.18, 0.35, 0.22);
    const toothMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.9,
      roughness: 0.15,
    });
    for (let i = 0; i < toothCount; i++) {
      const angle = (i / toothCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(Math.cos(angle) * 1.3, Math.sin(angle) * 1.3, 0);
      tooth.rotation.z = angle;
      gearGroup.add(tooth);
    }

    // Center hub
    const hubGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      metalness: 0.95,
      roughness: 0.1,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.rotation.x = Math.PI / 2;
    gearGroup.add(hub);

    gearGroup.rotation.x = 0.4;
    gearGroup.rotation.y = 0.2;
    scene.add(gearGroup);

    // Interaction state
    let isHovered = false;
    let baseSpeed = 0.008;

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Floating animation
    let animationId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const speed = isHovered ? baseSpeed * 4 : baseSpeed;

      gearGroup.rotation.z += speed;
      // Gentle float
      gearGroup.position.y = Math.sin(elapsed * 1.2) * 0.15;
      gearGroup.position.x = Math.cos(elapsed * 0.8) * 0.08;

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
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
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
      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 cursor-pointer select-none"
      title="Servicios de reparación"
    />
  );
}
