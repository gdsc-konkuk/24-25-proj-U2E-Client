import * as THREE from "three";

interface StarfieldProps {
  numStars?: number;
}

const generateStarfield = ({
  numStars = 2000,
}: StarfieldProps): THREE.Points => {
  const verts: number[] = [];
  const colors: number[] = [];

  const randomSpherePoint = () => {
    const radius = Math.random() * 25 + 25;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return { x, y, z };
  };

  for (let i = 0; i < numStars; i++) {
    const { x, y, z } = randomSpherePoint();
    verts.push(x, y, z);
    const color = new THREE.Color().setHSL(0.6, 0.2, Math.random());
    colors.push(color.r, color.g, color.b);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    fog: false,
  });

  return new THREE.Points(geometry, material);
};

export default generateStarfield;
