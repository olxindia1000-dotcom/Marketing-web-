// --- Tab Navigation Switcher ---
document.querySelectorAll('.nav-btn').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach((btn) => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.remove('active'));

    button.classList.add('active');

    const targetTab = button.getAttribute('data-tab');
    document.getElementById(`tab-${targetTab}`).classList.add('active');

    const headers = {
      analytics: 'Analytics Telemetry',
      sales: 'Sales Operations',
      leads: 'Lead Pipeline',
      automation: 'Automation Builder',
      calculator: 'Growth & ROI Calculator'
    };

    document.getElementById('page-title').innerText = headers[targetTab];
  });
});

// --- Dynamic Touch & Mouse Drag Swipe Controller ---
document.addEventListener('DOMContentLoaded', () => {
  const swipeContainers = document.querySelectorAll('.swipe-container');

  swipeContainers.forEach((container) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    const dots = container.querySelectorAll('.dot');

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

    container.addEventListener('scroll', () => {
      const card = container.querySelector('.card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 20;
      const activeIdx = Math.min(
        dots.length - 1,
        Math.max(0, Math.round(container.scrollLeft / cardWidth))
      );

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIdx);
      });
    });
  });

  runCalculator();
});

// --- Dynamic ROI Calculation Algorithm ---
function runCalculator() {
  const spend = parseFloat(document.getElementById('adSpend').value) || 0;
  const cpl = parseFloat(document.getElementById('cpl').value) || 1;
  const closeRate = parseFloat(document.getElementById('closeRate').value) || 0;
  const custValue = parseFloat(document.getElementById('custValue').value) || 0;

  const leads = Math.floor(spend / cpl);
  const deals = Math.floor(leads * (closeRate / 100));
  const revenue = deals * custValue;
  const roi = spend > 0 ? (((revenue - spend) / spend) * 100).toFixed(0) : 0;

  document.getElementById('resLeads').innerText = leads.toLocaleString('en-IN');
  document.getElementById('resDeals').innerText = deals.toLocaleString('en-IN');
  document.getElementById('resRevenue').innerText = '₹' + revenue.toLocaleString('en-IN');
  document.getElementById('resROI').innerText = roi + '%';
}

// --- Interactive 3D WebGL Background (Three.js) ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle Cloud
const particleCount = 400;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 15;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.04,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.6
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 5;

// Animation Loop
function animate3D() {
  requestAnimationFrame(animate3D);
  particles.rotation.y += 0.0015;
  particles.rotation.x += 0.001;
  renderer.render(scene, camera);
}

animate3D();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
