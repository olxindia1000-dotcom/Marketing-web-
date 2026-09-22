// --- Three.js 3D Interactive Scene Setup ---
const canvas = document.getElementById('bg-canvas');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create 3D Interactive Object (Floating Geometric Shape)
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x00f2fe,
  wireframe: true,
  roughness: 0.1
});

const shape3D = new THREE.Mesh(geometry, material);
scene.add(shape3D);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

camera.position.z = 5;

// Mouse Movement Effect (Interactive 3D Control)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Auto rotation
  shape3D.rotation.x += 0.003;
  shape3D.rotation.y += 0.005;

  // React to mouse movement
  shape3D.rotation.y += mouseX * 0.05;
  shape3D.rotation.x += mouseY * 0.05;

  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});