import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingStar3D() {
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

    // Lighting — warm gold tones
    const ambientLight = new THREE.AmbientLight(0xfef3c7, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xf59e0b, 2.0);
    mainLight.position.set(3, 4, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xfbbf24, 0.8);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xfcd34d, 1.5, 8);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Build 5-point star shape
    const starShape = new THREE.Shape();
    const outerR = 1.0;
    const innerR = 0.42;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelSegments: 3,
    };

    const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    starGeo.center();

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0xb45309,
      emissiveIntensity: 0.15,
    });

    const starGroup = new THREE.Group();

    const starMesh = new THREE.Mesh(starGeo, starMat);
    starGroup.add(starMesh);

    // Subtle glow ring
    const glowRingGeo = new THREE.TorusGeometry(1.15, 0.03, 8, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.25,
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    starGroup.add(glowRing);

    starGroup.rotation.x = 0.3;
    scene.add(starGroup);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate star
      starGroup.rotation.y += 0.012;
      starGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.1;

      // Float
      starGroup.position.y = Math.sin(elapsed * 1.3) * 0.12;

      // Pulsing glow ring
      const pulse = 0.2 + Math.sin(elapsed * 2.5) * 0.1;
      (glowRing.material as THREE.MeshBasicMaterial).opacity = pulse;
      glowRing.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.05);

      // Pulsing emissive
      starMat.emissiveIntensity = 0.12 + Math.sin(elapsed * 3) * 0.08;

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
      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 select-none"
      title="5 estrellas"
    />
  );
}
