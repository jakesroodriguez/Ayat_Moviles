import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingCube3D() {
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
    const ambientLight = new THREE.AmbientLight(0xe0e7ff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.5);
    mainLight.position.set(3, 4, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x22c55e, 0.6);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    // Cube with brand-colored faces
    const cubeGroup = new THREE.Group();

    const cubeGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);

    // Assign different brand colors to each face
    const faceColors = [
      0x6366f1, // indigo — right
      0x4f46e5, // darker indigo — left
      0x22c55e, // emerald — top
      0x16a34a, // darker emerald — bottom
      0x8b5cf6, // violet — front
      0x7c3aed, // deeper violet — back
    ];

    const materials = faceColors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.5,
          roughness: 0.3,
        })
    );

    const cube = new THREE.Mesh(cubeGeo, materials);
    cubeGroup.add(cube);

    // Edge wireframe
    const edges = new THREE.EdgesGeometry(cubeGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    cubeGroup.add(wireframe);

    cubeGroup.rotation.x = 0.5;
    cubeGroup.rotation.y = 0.5;
    scene.add(cubeGroup);

    // Drag-to-rotate interaction
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousX = e.clientX;
      previousY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      container.style.cursor = "grabbing";
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      const deltaY = e.clientY - previousY;
      velocityX = deltaX * 0.01;
      velocityY = deltaY * 0.01;
      cubeGroup.rotation.y += velocityX;
      cubeGroup.rotation.x += velocityY;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerUp);
    container.style.cursor = "grab";

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        // Idle auto-rotation
        cubeGroup.rotation.y += 0.006;
        cubeGroup.rotation.x += 0.003;

        // Apply momentum decay
        if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
          cubeGroup.rotation.y += velocityX;
          cubeGroup.rotation.x += velocityY;
          velocityX *= 0.95;
          velocityY *= 0.95;
        }
      }

      // Float
      cubeGroup.position.y = Math.sin(elapsed * 1.1) * 0.1;

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
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerUp);
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
      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 select-none touch-none"
      title="Arrastra para rotar"
    />
  );
}
