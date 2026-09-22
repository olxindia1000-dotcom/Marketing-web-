// --- Advanced Three.js Interactive 3D World ---

const canvas = document.getElementById('bg-canvas');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 1. Core 3D Interactive Geometric Shape (Icosahedron Mesh + Wireframe)
const coreGeometry = new THREE.IcosahedronGeometry(2.2, 2);

// Metallic Inner Mesh
const innerMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a192f,
  roughness: 0.2,
  metalness: 0.8,
  flatShading: true
});
const coreMesh = new THREE.Mesh(coreGeometry, innerMaterial);
scene.add(coreMesh);

// Cyan Wireframe Overlay
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00f2fe,
  wireframe: true,
  transparent: true,
  opacity: 0.35
});
const wireframeMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
wireframeMesh.scale.set(1.02, 1.02, 1.02);
scene.add(wireframeMesh);

// 2. Floating Data Particle Nodes (Data Streams Animation)
const particlesCount = 700;
const particlePositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  particlePositions[i] = (Math.random() - 0.5) * 20;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x4facfe,
  transparent: true,
  opacity: 0.7
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// 3. Dynamic Lighting Setup
const mainLight = new THREE.PointLight(0x00f2fe, 2, 50);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);

const purpleLight = new THREE.PointLight(0x7c3aed, 2, 50);
purpleLight.position.set(-5, -5, 2);
scene.add(purpleLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

camera.position.z = 6;

// Mouse Interaction & Smooth Interpolation
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5);
  mouseY = (event.clientY / window.innerHeight - 0.5);
});

// Scroll Dynamic Effect
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

// Render & Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Smooth Mouse Tracking (Lerp)
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  // 3D Object Rotations
  coreMesh.rotation.x = elapsedTime * 0.2 + targetY;
  coreMesh.rotation.y = elapsedTime * 0.3 + targetX;

  wireframeMesh.rotation.x = elapsedTime * 0.2 + targetY;
  wireframeMesh.rotation.y = elapsedTime * 0.3 + targetX;

  // Particle System Pulse and Rotation
  particleSystem.rotation.y = elapsedTime * 0.05;
  particleSystem.rotation.x = -targetY * 0.2;

  // Camera Reacts to Page Scroll Position
  camera.position.y = -scrollY * 0.002;
  camera.position.x = targetX * 0.5;

  renderer.render(scene, camera);
}

animate();

// Handle Window Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
