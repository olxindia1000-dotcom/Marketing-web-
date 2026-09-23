// --- Deal Alert System ---
function dealAlert(serviceName) {
  alert(`For exclusive deals on "${serviceName}", please call Vedant & Divy's team directly at: +91 9316528918`);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Dynamic Mouse & Touch Swipe Controller ---
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.swipe-container');

  containers.forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    const dots = container.querySelectorAll('.dot');

    // Mouse Drag Events
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => { isDown = false; });
    container.addEventListener('mouseup', () => { isDown = false; });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.8;
      container.scrollLeft = scrollLeft - walk;
    });

    // Dynamic Dot Indicator Sync
    container.addEventListener('scroll', () => {
      const card = container.querySelector('.card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 25;
      const activeIndex = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(container.scrollLeft / cardWidth))
      );

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
  });
});

// --- High-Level 3D Torus-Knot & Interactive Particles (Three.js) ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Interactive 3D Torus Knot Geometry
const geometry = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);

// Dynamic Material (Light Blue Wireframe)
const material = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  wireframe: true,
  roughness: 0.1
});

const shape3D = new THREE.Mesh(geometry, material);
shape3D.position.set(3.8, 0, -2);
scene.add(shape3D);

// Electric Yellow Halo Particle Cloud
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  size: 0.045,
  color: 0xeab308,
  transparent: true,
  opacity: 0.75
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
scene.add(particleSystem);

// Dual Light Rig Setup
const mainLight = new THREE.PointLight(0x0284c7, 2, 50);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);

const yellowLight = new THREE.PointLight(0xeab308, 1.8, 50);
yellowLight.position.set(-5, -5, 2);
scene.add(yellowLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

camera.position.z = 5;

// Dynamic Mouse Interactions
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

  // Smooth Interactive 3D Rotation
  shape3D.rotation.y = elapsedTime * 0.4 + mouseX * 0.6;
  shape3D.rotation.x = elapsedTime * 0.3 + mouseY * 0.6;

  particleSystem.rotation.y = elapsedTime * 0.05;

  renderer.render(scene, camera);
}

animate();

// Window Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
