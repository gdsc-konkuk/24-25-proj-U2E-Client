import * as THREE from "three";
import earcut from "earcut";

interface GeoPolygonFillProps {
  coordinates: number[][]; // [ [lon, lat], [lon, lat], ... ]
  radius: number;
  color?: number;
}

export function GeoPolygonFill({
  coordinates,
  radius,
  color = 0x00cc88,
}: GeoPolygonFillProps): THREE.Mesh {
  // 중심점 계산 (간단한 중심 계산)
  const centroid = coordinates
    .reduce((acc, [lon, lat]) => [acc[0] + lon, acc[1] + lat], [0, 0])
    .map((v) => v / coordinates.length);

  // 2D 평면 기준으로 투영 (위도/경도를 중심 기준으로 로컬 평면에 투영)
  const projected2D: number[][] = coordinates.map(([lon, lat]) => [
    (lon - centroid[0]) * Math.cos((lat * Math.PI) / 180),
    lat - centroid[1],
  ]);

  // earcut용 평면 좌표
  const flatCoords = projected2D.flat();
  const indices = earcut(flatCoords);

  // 3D 좌표 (구면 변환)
  function convertToSphereCoords(
    [lon, lat]: number[],
    r: number
  ): [number, number, number] {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  }

  const vertices3D: number[] = coordinates
    .map((coord) => convertToSphereCoords(coord, radius))
    .flat();

  // geometry 구성
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices3D, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });

  return new THREE.Mesh(geometry, material);
}
