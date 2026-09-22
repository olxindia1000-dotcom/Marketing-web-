// --- Interactive Tab Switching Logic ---
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function triggerAlert(msg) {
  alert(msg);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Three.js 3D Arrow & Particle Growth Animation ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 3D Growth Shape (Golden Arrow / Cone Mesh)
const geometry = new THREE.ConeGeometry(2, 4, 3);
const material = new THREE.MeshStandardMaterial({
  color: 0xfbbf24,
  wireframe: true,
  roughness: 0.1
});
const growthArrow = new THREE.Mesh(geometry, material);
growthArrow.position.set(3, 0, -2);
growthArrow.rotation.z = -Math.PI / 4; // Upward Arrow Tilt
scene.add(growthArrow);

// Floating Particles Field
const particlesCount = 400;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.6
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

camera.position.z = 5;

// Animation Loop
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Rotate 3D Growth Arrow
  growthArrow.rotation.y = elapsedTime * 0.5;
  growthArrow.position.y = Math.sin(elapsedTime) * 0.2;

  // Rotate Particle Field
  particles.rotation.y = elapsedTime * 0.05;

  renderer.render(scene, camera);
}

animate();

// Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
