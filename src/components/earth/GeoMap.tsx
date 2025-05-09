import * as THREE from "three";
import { drawThreeGeo } from "./threeGEO";

interface GeoMapProps {
  radius?: number;
  geoJsonUrl: string;
  pinColor?: number;
  onLoaded?: (object: THREE.Object3D) => void;
}

const GeoMap = async ({ radius = 2, geoJsonUrl, onLoaded }: GeoMapProps) => {
  const container = new THREE.Object3D();

  try {
    const res = await fetch(geoJsonUrl);
    const text = await res.text();
    const data = JSON.parse(text);

    const geoObject = drawThreeGeo({
      json: data,
      radius,
    });

    container.add(geoObject);
    onLoaded?.(container);
  } catch (error) {
    console.error("GeoJSON 로드 실패:", error);
  }

  return container;
};

export default GeoMap;
