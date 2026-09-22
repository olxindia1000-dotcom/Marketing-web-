// --- Interactive Deal Alert ---
function dealAlert(serviceName) {
  alert(`For exclusive deals on "${serviceName}", please call our growth team directly at: +91 9316528918`);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- High-Level 3D Torus-Knot & Particle Halo Scene (Three.js) ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// High-Level 3D Geometry (Torus Knot Core)
const geometry = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);

// Dynamic Dual-Color Material (Light Blue Wireframe)
const material = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  wireframe: true,
  roughness: 0.1
});

const shape3D = new THREE.Mesh(geometry, material);
shape3D.position.set(3.8, 0, -2);
scene.add(shape3D);

// Electric Yellow Floating Halo Particles
const particlesCount = 450;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 18;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.04,
  color: 0xeab308,
  transparent: true,
  opacity: 0.7
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
scene.add(particleSystem);

// High-Level Lighting setup
const mainLight = new THREE.PointLight(0x0284c7, 2, 50);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);

const yellowLight = new THREE.PointLight(0xeab308, 1.5, 50);
yellowLight.position.set(-5, -5, 2);
scene.add(yellowLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

camera.position.z = 5;

// Interactive Mouse Dynamic Rotation
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5);
  mouseY = (e.clientY / window.innerHeight - 0.5);
});

// Render Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // High-Level Smooth 3D Rotation
  shape3D.rotation.y = elapsedTime * 0.4 + mouseX * 0.6;
  shape3D.rotation.x = elapsedTime * 0.3 + mouseY * 0.6;

  particleSystem.rotation.y = elapsedTime * 0.05;

  renderer.render(scene, camera);
}

animate();

// Responsive Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
