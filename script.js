// TAB SWITCHING WITH ANIMATION
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
    
    document.getElementById('pageTitle').innerText = btn.querySelector('span').innerText;
  });
});

// ROI CALCULATOR LOGIC
function calculateROI() {
  const spend = parseFloat(document.getElementById('adSpend').value) || 0;
  const cpc = parseFloat(document.getElementById('cpc').value) || 1;
  const convRate = parseFloat(document.getElementById('convRate').value) || 0;
  const dealValue = parseFloat(document.getElementById('dealValue').value) || 0;

  const clicks = Math.round(spend / cpc);
  const deals = Math.round(clicks * (convRate / 100));
  const revenue = deals * dealValue;
  const profit = revenue - spend;
  const roas = spend > 0 ? ((revenue / spend) * 100).toFixed(0) : 0;
  const multiplier = spend > 0 ? (revenue / spend).toFixed(1) : 0;

  document.getElementById('resClicks').innerText = clicks.toLocaleString();
  document.getElementById('resDeals').innerText = deals.toLocaleString();
  document.getElementById('resRevenue').innerText = '$' + revenue.toLocaleString();
  document.getElementById('resProfit').innerText = '$' + profit.toLocaleString();
  document.getElementById('resROAS').innerText = roas + '% (' + multiplier + 'x)';
}

calculateROI();

// EDIT / DELETE / ADD FOR SALES TABLE
function addSaleRow() {
  const table = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
  const client = prompt("Enter Client Name:", "New Enterprise Client");
  const amount = prompt("Enter Deal Amount ($):", "10,000");
  const owner = prompt("Enter Sales Owner:", "Divy");

  if (client && amount) {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${client}</td>
      <td>${amount}</td>
      <td><span class="status-badge pending">In Negotiation</span></td>
      <td>${owner || 'Vedant'}</td>
      <td>
        <button class="action-btn edit" onclick="editRow(this)"><i class="fa-solid fa-pen"></i></button>
        <button class="action-btn delete" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
  }
}

function editRow(button) {
  const row = button.closest('tr');
  const clientCell = row.cells[0];
  const amountCell = row.cells[1];
  
  const newClient = prompt("Edit Client Name:", clientCell.innerText);
  const newAmount = prompt("Edit Deal Amount ($):", amountCell.innerText);

  if (newClient) clientCell.innerText = newClient;
  if (newAmount) amountCell.innerText = newAmount;
}

function deleteRow(button) {
  if (confirm("Are you sure you want to delete this item?")) {
    const row = button.closest('tr');
    row.remove();
  }
}

// EDIT / DELETE / ADD FOR LEADS TABLE
function addLeadRow() {
  const table = document.getElementById('leadsTable').getElementsByTagName('tbody')[0];
  const name = prompt("Enter Lead Name:", "Karan Shah");
  const email = prompt("Enter Lead Email:", "karan@corp.in");
  const source = prompt("Enter Lead Source:", "Google Ads");

  if (name && email) {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${source || 'Organic'}</td>
      <td><span class="badge positive">High (90)</span></td>
      <td>
        <button class="action-btn edit" onclick="editLeadRow(this)"><i class="fa-solid fa-pen"></i></button>
        <button class="action-btn delete" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
  }
}

function editLeadRow(button) {
  const row = button.closest('tr');
  const nameCell = row.cells[0];
  const emailCell = row.cells[1];
  
  const newName = prompt("Edit Lead Name:", nameCell.innerText);
  const newEmail = prompt("Edit Email:", emailCell.innerText);

  if (newName) nameCell.innerText = newName;
  if (newEmail) emailCell.innerText = newEmail;
}

// SOFT LIGHT BACKGROUND ANIMATION
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let points = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 30; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
  ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';

  points.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateCanvas);
}
animateCanvas();
