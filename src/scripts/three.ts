/**
 * 3D TOY CANVAS — Three.js
 * Di-bundle oleh Astro (import dari npm, bukan CDN).
 */
import * as THREE from 'three';

const container = document.getElementById('three-canvas-container') as HTMLElement | null;
if (!container) {
  throw new Error('Container 3D tidak ditemukan');
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 4.5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const geometry = new THREE.DodecahedronGeometry(1.5, 0);
const material = new THREE.MeshToonMaterial({
  color: 0x88ab8e,
  transparent: true,
  opacity: 0.95,
});
const toyMesh = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const lines = new THREE.LineSegments(edges, lineMaterial);
toyMesh.add(lines);

scene.add(toyMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffe66d, 1.2);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate3D() {
  requestAnimationFrame(animate3D);
  toyMesh.rotation.x += 0.005;
  toyMesh.rotation.y += 0.008;

  toyMesh.rotation.y += (mouseX * 1.2 - toyMesh.rotation.y) * 0.05;
  toyMesh.rotation.x += (-mouseY * 1.2 - toyMesh.rotation.x) * 0.05;

  renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
  if (container) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
});
