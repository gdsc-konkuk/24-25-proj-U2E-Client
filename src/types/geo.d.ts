export interface GeoProperties {
  featurecla: string;
  scalerank: number;
  min_zoom: number;
}

export type GeoJSONGeometry =
  | { type: "Point"; coordinates: number[] }
  | { type: "MultiPoint"; coordinates: number[][] }
  | { type: "LineString"; coordinates: number[][] }
  | { type: "MultiLineString"; coordinates: number[][][] }
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

export interface Feature {
  type: "Feature";
  properties: GeoProperties;
  geometry: GeoJSONGeometry;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface GeometryCollection {
  type: "GeometryCollection";
  geometries: GeoJSONGeometry[];
}

export type GeoDataType =
  | GeoJSONGeometry
  | Feature
  | FeatureCollection
  | GeometryCollection;
