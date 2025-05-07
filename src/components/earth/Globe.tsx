import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import generateStarfield from "./Starfield";
import loadGeoMap from "./GeoMap";
import { GeoPolygonFill } from "./GeoPolygonFill";

const Globe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // container 엘리먼트 확인
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer 초기화
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.3);

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    scene.background = null;
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // globeGroup 생성 (지구본 관련 오브젝트들을 담음)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 지구본 wireframe 생성
    const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#8becff",
      transparent: true,
      opacity: 0.4,
    });
    const edges = new THREE.EdgesGeometry(globeGeometry);
    const globeWireframe = new THREE.LineSegments(edges, lineMaterial);
    globeGroup.add(globeWireframe);

    // 스타필드 추가
    const stars = generateStarfield({ numStars: 1000 });
    scene.add(stars);

    // Raycaster & 마우스 이벤트 처리 (핀 위에 마우스가 있을 경우 globeGroup 회전 멈춤)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHoveringPin = false;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      isHoveringPin = intersects.some(
        (intersect) => intersect.object.userData.isPin
      );
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove, false);

    loadGeoMap({
      geoJsonUrl: "/land.json",
      radius: 2,
      pinColor: 0x00ff00,
      onLoaded: (geoObj) => globeGroup.add(geoObj),
    });

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isHoveringPin) {
        globeGroup.rotation.y += 0.001;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 변경 처리
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 클린업
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Globe;
