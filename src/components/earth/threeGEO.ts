import * as THREE from "three";
import {
  Line2,
  LineGeometry,
  LineMaterial,
} from "three/examples/jsm/Addons.js";

/** GeoJSON 관련 타입 정의 **/
interface GeoProperties {
  featurecla: string;
  scalerank: number;
  min_zoom: number;
}

type GeoJSONGeometry =
  | { type: "Point"; coordinates: number[] }
  | { type: "MultiPoint"; coordinates: number[][] }
  | { type: "LineString"; coordinates: number[][] }
  | { type: "MultiLineString"; coordinates: number[][][] }
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

interface Feature {
  type: "Feature";
  properties: GeoProperties;
  geometry: GeoJSONGeometry;
}

interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

interface GeometryCollection {
  type: "GeometryCollection";
  geometries: GeoJSONGeometry[];
}

type GeoDataType =
  | GeoJSONGeometry
  | Feature
  | FeatureCollection
  | GeometryCollection;

/** 재질 옵션 타입 정의 **/
interface MaterialType {
  randomPins: boolean;
  randomPinsCount: number;
  /** 랜덤 핀에 사용할 Mesh 전용 재질 옵션 */
  pinMaterial: THREE.MeshBasicMaterialParameters;
  /** Point/MultiPoint용 재질 옵션 (선택적) */
  pointMaterial?: THREE.PointsMaterialParameters;
}

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
  container.userData.update = (t: any) => {
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
        drawLine(x_values, y_values, z_values, materialOptions);
        break;
      case "Polygon":
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
        break;
      default:
        throw new Error("The geoJSON is not valid.");
    }
  }

  // materialOptions가 존재하고 randomPins 플래그가 true면 랜덤 핀 추가.
  if (materialOptions && materialOptions.randomPins) {
    const pins = createRandomPins({
      radius,
      numPins: materialOptions.randomPinsCount || 50,
      materialOptions: materialOptions.pinMaterial || { color: 0xff0000 },
    });
    container.add(pins);
  }

  // --- 내부 함수들 ---
  function createGeometryArray(json: GeoDataType): GeoJSONGeometry[] {
    let geometry_array: GeoJSONGeometry[] = [];

    if ("geometry" in json && json.type === "Feature") {
      geometry_array.push(json.geometry);
    } else if ("features" in json && json.type === "FeatureCollection") {
      for (
        let feature_num = 0;
        feature_num < json.features.length;
        feature_num++
      ) {
        geometry_array.push(json.features[feature_num].geometry);
      }
    } else if ("geometries" in json && json.type === "GeometryCollection") {
      for (let geom_num = 0; geom_num < json.geometries.length; geom_num++) {
        geometry_array.push(json.geometries[geom_num]);
      }
    } else if ("type" in json) {
      // raw GeoJSON geometry
      geometry_array.push(json as GeoJSONGeometry);
    } else {
      throw new Error("The geoJSON is not valid.");
    }
    return geometry_array;
  }

  function createCoordinateArray(feature: number[][]): number[][] {
    // 인접 좌표 간 거리가 크면 보간하여 부드러운 곡선 생성.
    const temp_array: number[][] = [];
    let interpolation_array: number[][] = [];

    for (let point_num = 0; point_num < feature.length; point_num++) {
      const point1 = feature[point_num];
      const point2 = feature[point_num - 1];

      if (point_num > 0) {
        if (needsInterpolation(point2, point1)) {
          interpolation_array = [point2, point1];
          interpolation_array = interpolatePoints(interpolation_array);

          for (
            let inter_point_num = 0;
            inter_point_num < interpolation_array.length;
            inter_point_num++
          ) {
            temp_array.push(interpolation_array[inter_point_num]);
          }
        } else {
          temp_array.push(point1);
        }
      } else {
        temp_array.push(point1);
      }
    }
    return temp_array;
  }

  function needsInterpolation(point2: number[], point1: number[]): boolean {
    const lon1 = point1[0];
    const lat1 = point1[1];
    const lon2 = point2[0];
    const lat2 = point2[1];
    const lon_distance = Math.abs(lon1 - lon2);
    const lat_distance = Math.abs(lat1 - lat2);

    return lon_distance > 5 || lat_distance > 5;
  }

  function interpolatePoints(interpolation_array: number[][]): number[][] {
    let temp_array: number[][] = [];
    let point1: number[], point2: number[];

    for (
      let point_num = 0;
      point_num < interpolation_array.length - 1;
      point_num++
    ) {
      point1 = interpolation_array[point_num];
      point2 = interpolation_array[point_num + 1];

      if (needsInterpolation(point2, point1)) {
        temp_array.push(point1);
        temp_array.push(getMidpoint(point1, point2));
      } else {
        temp_array.push(point1);
      }
    }

    temp_array.push(interpolation_array[interpolation_array.length - 1]);

    if (temp_array.length > interpolation_array.length) {
      temp_array = interpolatePoints(temp_array);
    }
    return temp_array;
  }

  function getMidpoint(point1: number[], point2: number[]): number[] {
    const midpoint_lon = (point1[0] + point2[0]) / 2;
    const midpoint_lat = (point1[1] + point2[1]) / 2;
    return [midpoint_lon, midpoint_lat];
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
    z_values: number[],
    options?: MaterialType | null
  ): void {
    const lineGeo = new LineGeometry();
    const verts: number[] = [];
    for (let i = 0; i < x_values.length; i++) {
      verts.push(x_values[i], y_values[i], z_values[i]);
    }
    lineGeo.setPositions(verts);
    let hue = 0.3 + Math.random() * 0.2;
    if (Math.random() > 0.5) {
      hue -= 0.3;
    }
    const color = new THREE.Color().setHSL(hue, 1.0, 0.5);
    const lineMaterial = new LineMaterial({
      color,
      linewidth: 2,
      fog: true,
    });
    lineMaterial.resolution.set(window.innerWidth, window.innerHeight);
    const line = new Line2(lineGeo, lineMaterial);
    line.computeLineDistances();
    const rate = Math.random() * 0.0002;
    line.userData.update = (t: number) => {
      lineMaterial.dashOffset = t * rate;
    };
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
function createRandomPins({
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
