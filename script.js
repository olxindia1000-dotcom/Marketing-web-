// --- INITIAL DATA STORES ---
let metricsData = {
  traffic: { val: "312,450", trend: "+28.4% ↑" },
  session: { val: "5m 14s", trend: "+15.2% ↑" },
  bounce: { val: "24.1%", trend: "-6.8% ↓" },
  conversions: { val: "14,820", trend: "+32.1% ↑" }
};

let salesData = [
  { id: 1, client: "Apex Tech Labs", amount: "$12,400", status: "Completed", date: "2026-09-20" },
  { id: 2, client: "Nexus Media", amount: "$8,150", status: "Pending", date: "2026-09-22" }
];

let leadsData = [
  { id: 1, name: "Aarav Sharma", email: "aarav@tech.in", source: "Google Ads", stage: "Qualified" },
  { id: 2, name: "Priya Patel", email: "priya@design.com", source: "LinkedIn", stage: "Proposal" }
];

let workflowsData = [
  { id: 1, title: "WhatsApp Instant Nurture", trigger: "On Lead Added", action: "Send WhatsApp Intro" },
  { id: 2, title: "Lead Scoring Bot", trigger: "Form Submitted", action: "Calculate Score & Tag" }
];

// --- TAB SWITCHING ---
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

// --- RENDERERS ---
function renderSalesTable() {
  const tbody = document.getElementById('salesTableBody');
  tbody.innerHTML = salesData.map(item => `
    <tr>
      <td><strong>${item.client}</strong></td>
      <td>${item.amount}</td>
      <td><span class="status-badge">${item.status}</span></td>
      <td>${item.date}</td>
      <td><button class="btn-edit" onclick="deleteSale(${item.id})">Delete</button></td>
    </tr>
  `).join('');
}

function renderLeadsTable() {
  const tbody = document.getElementById('leadsTableBody');
  tbody.innerHTML = leadsData.map(item => `
    <tr>
      <td><strong>${item.name}</strong></td>
      <td>${item.email}</td>
      <td>${item.source}</td>
      <td>${item.stage}</td>
      <td><button class="btn-edit" onclick="deleteLead(${item.id})">Delete</button></td>
    </tr>
  `).join('');
}

function renderWorkflows() {
  const container = document.getElementById('workflowList');
  container.innerHTML = workflowsData.map(wf => `
    <div class="content-card" style="margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4>${wf.title}</h4>
          <p style="font-size:12px; color:#64748b;">Trigger: ${wf.trigger} | Action: ${wf.action}</p>
        </div>
        <button class="btn btn-primary" onclick="testWorkflow('${wf.title}')">▶ Test Work</button>
      </div>
    </div>
  `).join('');
}

function renderChart() {
  const container = document.getElementById('barChart');
  const values = [40, 75, 55, 90, 65, 85, 100];
  container.innerHTML = values.map(v => `
    <div class="chart-bar" style="height: ${v}%;"></div>
  `).join('');
}

function randomizeTrafficData() {
  renderChart();
  logTerminal("GRAPH: Telemetry chart data points refreshed.");
}

// --- MODAL FUNCTIONS ---
function openEditMetricModal(key) {
  const modal = document.getElementById('genericModal');
  document.getElementById('modalTitle').innerText = "Edit Metric Parameter";
  document.getElementById('modalBody').innerHTML = `
    <div class="form-group">
      <label>New Metric Value</label>
      <input type="text" id="inputVal" value="${metricsData[key].val}">
    </div>
    <div class="form-group">
      <label>Trend Indicator</label>
      <input type="text" id="inputTrend" value="${metricsData[key].trend}">
    </div>
  `;
  
  document.getElementById('modalSaveBtn').onclick = () => {
    metricsData[key].val = document.getElementById('inputVal').value;
    metricsData[key].trend = document.getElementById('inputTrend').value;
    document.getElementById(`val-${key}`).innerText = metricsData[key].val;
    document.getElementById(`trend-${key}`).innerText = metricsData[key].trend;
    closeModal();
  };

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('genericModal').classList.remove('active');
}

// --- TERMINAL & TESTS ---
function logTerminal(msg) {
  const terminal = document.getElementById('terminalLogs');
  const time = new Date().toLocaleTimeString();
  terminal.innerHTML += `<div>[${time}] ${msg}</div>`;
  terminal.scrollTop = terminal.scrollHeight;
}

function clearLogs() {
  document.getElementById('terminalLogs').innerHTML = '';
}

function testWorkflow(name) {
  logTerminal(`INITIATING: Test trigger for "${name}"...`);
  setTimeout(() => logTerminal(`SUCCESS: Automation task completed.`), 800);
}

function runGlobalTest() {
  logTerminal(`SYSTEM STRESS TEST: Checking all system nodes...`);
  setTimeout(() => logTerminal(`ALL SYSTEMS OPERATIONAL (100% Status)`), 1000);
}

// --- ROI CALCULATOR ---
function calculateROI() {
  const spend = parseFloat(document.getElementById('roiSpend').value) || 0;
  const cpl = parseFloat(document.getElementById('roiCpl').value) || 1;
  const conv = parseFloat(document.getElementById('roiConv').value) || 0;
  const deal = parseFloat(document.getElementById('roiDeal').value) || 0;

  const leads = Math.floor(spend / cpl);
  const closedDeals = Math.floor(leads * (conv / 100));
  const revenue = closedDeals * deal;
  const roi = spend > 0 ? (((revenue - spend) / spend) * 100).toFixed(0) : 0;

  document.getElementById('resLeads').innerText = leads;
  document.getElementById('resDeals').innerText = closedDeals;
  document.getElementById('resRevenue').innerText = `$${revenue.toLocaleString()}`;
  document.getElementById('resROI').innerText = `${roi}%`;
}

// --- BACKGROUND CANVAS ANIMATION ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let points = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 40; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';

  points.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
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

// INITIAL SETUP
renderSalesTable();
renderLeadsTable();
renderWorkflows();
renderChart();
