import * as THREE from "three";
import {
  Line2,
  LineGeometry,
  LineMaterial,
} from "three/examples/jsm/Addons.js";
import {
  createGeometryArray,
  createCoordinateArray,
} from "../../utils/geoUtils";
import { GeoPolygonFill } from "./GeoPolygonFill";
import { GeoDataType, MaterialType } from "../../types/geo";

/** drawThreeGeo 함수 Props 타입 **/
interface Props {
  json: GeoDataType;
  radius: number;
  materialOptions?: MaterialType | null;
}

/** GeoJSON을 Three.js 오브젝트로 변환하는 함수 **/
export function drawThreeGeo({
  json,
  radius,
  materialOptions,
}: Props): THREE.Object3D {
  const container = new THREE.Object3D();
  container.userData.update = (t: unknown) => {
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].userData.update) {
        container.children[i].userData.update(t);
      }
    }
  };

  // GeoJSON의 방향과 구의 방향 맞추기.
  container.rotation.x = -Math.PI * 0.5;

  // 좌표 누적용 배열
  const x_values: number[] = [];
  const y_values: number[] = [];
  const z_values: number[] = [];
  const json_geom = createGeometryArray(json);

  // 보간된 좌표를 저장할 배열
  let coordinate_array: number[][] = [];
  for (let geom_num = 0; geom_num < json_geom.length; geom_num++) {
    const geom = json_geom[geom_num];
    switch (geom.type) {
      case "Point":
        convertToSphereCoords(geom.coordinates, radius);
        // Point 재질은 materialOptions?.pointMaterial 사용
        drawParticle(
          x_values[0],
          y_values[0],
          z_values[0],
          materialOptions?.pointMaterial
        );
        break;

      case "MultiPoint":
        for (
          let point_num = 0;
          point_num < geom.coordinates.length;
          point_num++
        ) {
          convertToSphereCoords(geom.coordinates[point_num], radius);
          drawParticle(
            x_values[0],
            y_values[0],
            z_values[0],
            materialOptions?.pointMaterial
          );
        }
        break;

      case "LineString":
        coordinate_array = createCoordinateArray(geom.coordinates);
        for (
          let point_num = 0;
          point_num < coordinate_array.length;
          point_num++
        ) {
          convertToSphereCoords(coordinate_array[point_num], radius);
        }

        drawLine(x_values, y_values, z_values);

        break;

      case "Polygon":
        for (
          let segment_num = 0;
          segment_num < geom.coordinates.length;
          segment_num++
        ) {
          const ring = geom.coordinates[segment_num];

          for (let i = 0; i < ring.length; i++) {
            convertToSphereCoords(ring[i], radius);
          }
          drawLine(x_values, y_values, z_values);

          // 면도 동일하게 원시 ring 사용
          const fill = GeoPolygonFill({
            coordinates: ring,
            radius,
            color: 0x000000,
          });
          container.add(fill);
        }
        break;
        {
          /*
      case "MultiLineString":
        for (
          let segment_num = 0;
          segment_num < geom.coordinates.length;
          segment_num++
        ) {
          coordinate_array = createCoordinateArray(
            geom.coordinates[segment_num]
          );
          for (
            let point_num = 0;
            point_num < coordinate_array.length;
            point_num++
          ) {
            convertToSphereCoords(coordinate_array[point_num], radius);
          }
          drawLine(x_values, y_values, z_values, materialOptions);
        }
        break;
      case "MultiPolygon":
        for (
          let polygon_num = 0;
          polygon_num < geom.coordinates.length;
          polygon_num++
        ) {
          for (
            let segment_num = 0;
            segment_num < geom.coordinates[polygon_num].length;
            segment_num++
          ) {
            coordinate_array = createCoordinateArray(
              geom.coordinates[polygon_num][segment_num]
            );
            for (
              let point_num = 0;
              point_num < coordinate_array.length;
              point_num++
            ) {
              convertToSphereCoords(coordinate_array[point_num], radius);
            }
            drawLine(x_values, y_values, z_values, materialOptions);
          }
        }
        break;*/
        }
      default:
        throw new Error("The geoJSON is not valid.");
    }
  }

  function convertToSphereCoords(
    coordinates_array: number[],
    sphere_radius: number
  ): void {
    const lon = coordinates_array[0];
    const lat = coordinates_array[1];

    x_values.push(
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((lon * Math.PI) / 180) *
        sphere_radius
    );
    y_values.push(
      Math.cos((lat * Math.PI) / 180) *
        Math.sin((lon * Math.PI) / 180) *
        sphere_radius
    );
    z_values.push(Math.sin((lat * Math.PI) / 180) * sphere_radius);
  }

  function drawParticle(
    x: number,
    y: number,
    z: number,
    options: THREE.PointsMaterialParameters | undefined
  ): void {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([x, y, z], 3)
    );

    if (options) {
      const particle_material = new THREE.PointsMaterial(options);
      const particle = new THREE.Points(geo, particle_material);
      container.add(particle);
    }
    clearArrays();
  }

  // drawLine의 매개변수 options를 선택적으로 받아 undefined도 허용합니다.
  function drawLine(
    x_values: number[],
    y_values: number[],
    z_values: number[]
  ): void {
    const lineGeo = new LineGeometry();
    const verts: number[] = [];
    for (let i = 0; i < x_values.length; i++) {
      verts.push(x_values[i], y_values[i], z_values[i]);
    }
    lineGeo.setPositions(verts);

    // 지정된 색상 목록에서 랜덤으로 선택
    const predefinedColors = [0x00ff5d, 0x27ffb2, 0x2cffee, 0x00d1ff, 0x008fff];
    const randomColorHex =
      predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
    const color = new THREE.Color(randomColorHex);

    const lineMaterial = new LineMaterial({
      color,
      linewidth: 3,
      transparent: true,
      blending: THREE.AdditiveBlending, // 💡 빛나는 느낌의 핵심
      opacity: 0.3, // 💡 강도 조절
      fog: false,
    });

    lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
    const line = new Line2(lineGeo, lineMaterial);
    line.computeLineDistances();
    container.add(line);

    clearArrays();
  }

  function clearArrays(): void {
    x_values.length = 0;
    y_values.length = 0;
    z_values.length = 0;
  }

  return container;
}

/** 랜덤 핀 생성 함수
 *  - 구의 반지름 위에 임의의 위도/경도 좌표를 생성한 후, 작은 구 모양의 Mesh를 핀으로 만들어 배치합니다.
 *  - materialOptions의 randomPins, randomPinsCount, pinMaterial 옵션에 따라 호출할 수 있습니다.
 */
{
  /*function createRandomPins({
radius = 5,
materialOptions = { color: 0xff0000 },
}: {
radius?: number;
numPins?: number;
materialOptions?: THREE.MeshBasicMaterialParameters;
}): THREE.Object3D {
const pinsContainer = new THREE.Object3D();

// 여기서는 단일 핀만 생성 (필요시 numPins 만큼 반복 처리)
const lat = 37.56667;
const lon = 126.97806;

const x =
  Math.cos((lat * Math.PI) / 180) * Math.cos((lon * Math.PI) / 180) * radius;
const y =
  Math.cos((lat * Math.PI) / 180) * Math.sin((lon * Math.PI) / 180) * radius;
const z = Math.sin((lat * Math.PI) / 180) * radius;

const geometry = new THREE.SphereGeometry(0.05, 16, 16);
const material = new THREE.MeshBasicMaterial(materialOptions);
const pin = new THREE.Mesh(geometry, material);

pin.userData.isPin = true;
pin.position.set(x, y, z);

const normal = new THREE.Vector3(x, y, z).normalize();
pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

pinsContainer.add(pin);

return pinsContainer;
}
*/
}
