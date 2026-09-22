// --- Interactive Deal Alert System ---
function dealAlert(serviceName) {
  alert(`For exclusive deals on "${serviceName}", please contact our sales team directly at: +91 9316528918`);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Smooth 3D WebGL Canvas Animation (Light Three.js Scene) ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Light Theme 3D Object (Icosahedron Wireframe)
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2563eb,
  wireframe: true,
  roughness: 0.2
});

const shape3D = new THREE.Mesh(geometry, material);
shape3D.position.set(3.5, 0, -2);
scene.add(shape3D);

// Floating Blue Light Particles
const particlesCount = 300;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 16;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.035,
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.5
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
scene.add(particleSystem);

// Lighting for Light Theme
const mainLight = new THREE.PointLight(0x2563eb, 1.5, 50);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

camera.position.z = 5;

// Mouse Movement Effect
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

  // Smooth 3D Rotation
  shape3D.rotation.y = elapsedTime * 0.3 + mouseX * 0.5;
  shape3D.rotation.x = elapsedTime * 0.2 + mouseY * 0.5;

  particleSystem.rotation.y = elapsedTime * 0.04;

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
