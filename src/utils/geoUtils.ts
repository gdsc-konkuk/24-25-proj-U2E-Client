import { Feature, GeoJSONGeometry, GeoDataType } from "../types/geo.ts";

export function createGeometryArray(json: GeoDataType): GeoJSONGeometry[] {
  const geometry_array: GeoJSONGeometry[] = [];

  if ("geometry" in json && json.type === "Feature") {
    geometry_array.push(json.geometry);
  } else if ("features" in json && json.type === "FeatureCollection") {
    json.features.forEach((f: Feature) => geometry_array.push(f.geometry));
  } else if ("geometries" in json && json.type === "GeometryCollection") {
    geometry_array.push(...json.geometries);
  } else if ("type" in json) {
    geometry_array.push(json as GeoJSONGeometry);
  } else {
    throw new Error("Invalid GeoJSON");
  }

  return geometry_array;
}

export function needsInterpolation(
  point2: number[],
  point1: number[]
): boolean {
  const lon_distance = Math.abs(point1[0] - point2[0]);
  const lat_distance = Math.abs(point1[1] - point2[1]);
  return lon_distance > 5 || lat_distance > 5;
}

export function getMidpoint(p1: number[], p2: number[]): number[] {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

export function interpolatePoints(points: number[][]): number[][] {
  const result: number[][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    result.push(p1);
    if (needsInterpolation(p2, p1)) {
      result.push(getMidpoint(p1, p2));
    }
  }

  result.push(points[points.length - 1]);

  return result.length > points.length ? interpolatePoints(result) : result;
}

export function createCoordinateArray(feature: number[][]): number[][] {
  const result: number[][] = [];

  for (let i = 0; i < feature.length; i++) {
    const p1 = feature[i];
    const p2 = feature[i - 1];

    if (i > 0 && needsInterpolation(p2, p1)) {
      const interpolated = interpolatePoints([p2, p1]);
      result.push(...interpolated);
    } else {
      result.push(p1);
    }
  }

  return result;
}
