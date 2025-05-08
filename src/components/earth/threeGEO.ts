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
import { GeoDataType } from "../../types/geo";

/** drawThreeGeo 함수 Props 타입 **/
interface Props {
  json: GeoDataType;
  radius: number;
}

/** GeoJSON을 Three.js 오브젝트로 변환하는 함수 **/
export function drawThreeGeo({ json, radius }: Props): THREE.Object3D {
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
        drawParticle(x_values[0], y_values[0], z_values[0]);
        break;

      case "MultiPoint":
        for (
          let point_num = 0;
          point_num < geom.coordinates.length;
          point_num++
        ) {
          convertToSphereCoords(geom.coordinates[point_num], radius);
          drawParticle(x_values[0], y_values[0], z_values[0]);
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

  function drawParticle(x: number, y: number, z: number): void {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([x, y, z], 3)
    );

    clearArrays();
  }

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
