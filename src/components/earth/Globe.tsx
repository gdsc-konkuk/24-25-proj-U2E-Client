import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styled from "styled-components";

import generateStarfield from "./Starfield";
import loadGeoMap from "./GeoMap";
import Warning from "./Warning";
import { latLonToVector3 } from "../../utils/geoUtils";

interface Pin {
  pinId: number;
  latitude: number;
  longitude: number;
  pinColor: string;
  region: string;
  climate: string;
}

//  더미 핀 데이터 리스트 (실제 API 대체 예정)
const dummyPinList: Pin[] = [
  {
    pinId: 1,
    latitude: 37.5665,
    longitude: 126.978,
    pinColor: "Yellow",
    region: "South Korea",
    climate: "RAIN",
  },
  {
    pinId: 2,
    latitude: 48.8566,
    longitude: 2.3522,
    pinColor: "Red",
    region: "France",
    climate: "HEAT",
  },
  {
    pinId: 3,
    latitude: 40.7128,
    longitude: -74.006,
    pinColor: "Blue",
    region: "USA",
    climate: "FINE_DUST",
  },
];

const Globe = ({ pinList }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [screenPins, setScreenPins] = useState<
    { pinId: number; x: number; y: number }[]
  >([]);

  // Three.js 기반 지구본 초기화 및 렌더링
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.3);

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 지구본과 핀을 포함하는 그룹 생성
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#8becff",
      transparent: true,
      opacity: 0.4,
    });
    const edges = new THREE.EdgesGeometry(globeGeometry);
    const globeWireframe = new THREE.LineSegments(edges, lineMaterial);
    globeGroup.add(globeWireframe);

    const stars = generateStarfield({ numStars: 1000 });
    scene.add(stars);

    loadGeoMap({
      geoJsonUrl: "/land.json",
      radius: 2,
      onLoaded: (geoObj) => globeGroup.add(geoObj),
    });

    const pinObjs: THREE.Object3D[] = [];

    if (!pinList || pinList.length === 0) return;

    // 📍 모든 핀을 지구본에 추가
    dummyPinList.forEach((pin) => {
      const pinObj = new THREE.Object3D();
      pinObj.userData = { ...pin, isPin: true };
      pinObj.position.copy(latLonToVector3(pin.latitude, pin.longitude, 2.01));
      globeGroup.add(pinObj);
      pinObjs.push(pinObj);
    });

    // 애니메이션 루프 (지구 회전 + 핀 위치 추적)
    const animate = () => {
      requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.001;

      const nextScreenPins: { pinId: number; x: number; y: number }[] = [];
      pinObjs.forEach((pinObj) => {
        const world = new THREE.Vector3();
        pinObj.getWorldPosition(world);
        const projected = world.project(camera);
        const x = ((projected.x + 1) / 2) * width;
        const y = ((-projected.y + 1) / 2) * height;
        nextScreenPins.push({ pinId: pinObj.userData.pinId, x, y });
      });

      // 📌 모든 핀의 화면 좌표 상태 업데이트
      setScreenPins(nextScreenPins);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    //지구본을 왼쪽에 배치
    globeGroup.position.x = -1.5;

    return () => {
      renderer.dispose();
    };
  }, []);

  // 렌더링: Three.js 캔버스 + DOM으로 핀 위치 표시
  return (
    <GlobeContainer ref={mountRef}>
      {screenPins.map((pin) => (
        <PinOverlayPositioner key={pin.pinId} x={pin.x} y={pin.y}>
          <Warning />
        </PinOverlayPositioner>
      ))}
    </GlobeContainer>
  );
};

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: "relative";
`;

const PinOverlayPositioner = styled.div.attrs<{ x: number; y: number }>(
  (props) => ({
    style: {
      left: `${props.x}px`,
      top: `${props.y}px`,
    },
  })
)`
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  z-index: 1000;
`;

export default Globe;
