// --- STATE MANAGEMENT ---
let leadsData = [
  { id: 1, name: "Rajesh Sharma", channel: "Google Search Ads", status: "New Lead", value: 65000 },
  { id: 2, name: "Priya Patel", channel: "Meta Funnel", status: "In Review", value: 120000 },
  { id: 3, name: "Anil Mehta", channel: "Organic SEO", status: "Won", value: 240000 }
];

let ruleCount = 2;

// --- TAB NAVIGATION ---
function switchTab(tabId, element) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

  element.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');

  const headers = {
    analytics: { title: 'Analytics Telemetry', desc: 'Real-time digital growth & performance metric dashboard' },
    sales: { title: 'Sales Operations', desc: 'Track deals, closed revenue, and average contract performance' },
    leads: { title: 'Leads Pipeline Tracker', desc: 'Manage inbound opportunities and lead conversion stages' },
    automation: { title: 'Marketing Automation', desc: 'Manage automated workflow rules and system execution triggers' },
    calculator: { title: 'Growth & ROI Calculator', desc: 'Simulate ad spend returns and revenue projections' }
  };

  document.getElementById('title-text').innerText = headers[tabId].title;
  document.getElementById('title-desc').innerText = headers[tabId].desc;
}

// --- LEADS MANAGEMENT ---
function renderLeads(data = leadsData) {
  const tbody = document.getElementById('leads-table-body');
  tbody.innerHTML = '';

  data.forEach(lead => {
    const badgeClass = lead.status === 'New Lead' ? 'new' : lead.status === 'In Review' ? 'review' : 'closed';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${lead.name}</strong></td>
      <td>${lead.channel}</td>
      <td><span class="status-badge ${badgeClass}">${lead.status}</span></td>
      <td>₹${lead.value.toLocaleString('en-IN')}</td>
      <td><button onclick="deleteLead(${lead.id})" class="text-btn" style="color:#ef4444;">Delete</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('lead-count-badge').innerText = `${data.length} Total Leads`;
}

function searchLeads() {
  const query = document.getElementById('lead-search').value.toLowerCase();
  const filtered = leadsData.filter(l => 
    l.name.toLowerCase().includes(query) || l.channel.toLowerCase().includes(query)
  );
  renderLeads(filtered);
}

function openLeadModal() { document.getElementById('lead-modal').classList.add('show'); }
function closeLeadModal() { document.getElementById('lead-modal').classList.remove('show'); }

function saveLead(e) {
  e.preventDefault();
  const name = document.getElementById('modal-lead-name').value;
  const channel = document.getElementById('modal-lead-channel').value;
  const value = parseFloat(document.getElementById('modal-lead-value').value) || 0;
  const status = document.getElementById('modal-lead-status').value;

  const newLead = { id: Date.now(), name, channel, status, value };
  leadsData.push(newLead);
  renderLeads();
  closeLeadModal();

  // Log automation trigger
  addLog(`[System ${getCurrentTime()}] Automation triggered: Lead Welcome Workflow queued for ${name}`);
  e.target.reset();
}

function deleteLead(id) {
  leadsData = leadsData.filter(l => l.id !== id);
  renderLeads();
}

// --- SALES FILTER ---
function filterSales(period, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const rev = document.getElementById('sales-revenue');
  const deals = document.getElementById('sales-deals');
  const acv = document.getElementById('sales-acv');

  if (period === 'month') {
    rev.innerText = '₹18,40,000';
    deals.innerText = '62';
    acv.innerText = '₹29,670';
  } else if (period === 'week') {
    rev.innerText = '₹4,80,000';
    deals.innerText = '16';
    acv.innerText = '₹30,000';
  } else {
    rev.innerText = '₹48,90,000';
    deals.innerText = '186';
    acv.innerText = '₹26,290';
  }
}

// --- AUTOMATION ENGINE ---
function toggleWorkflow(ruleName, element) {
  const statusText = element.checked ? "ACTIVATED" : "DEACTIVATED";
  addLog(`[System ${getCurrentTime()}] Workflow Rule "${ruleName}" has been ${statusText}`);
}

function runAutomationTest(ruleName) {
  addLog(`[System ${getCurrentTime()}] Executing test run for "${ruleName}"...`);
  setTimeout(() => {
    addLog(`[System ${getCurrentTime()}] SUCCESS: "${ruleName}" executed successfully.`);
  }, 1000);
}

function openRuleModal() { document.getElementById('rule-modal').classList.add('show'); }
function closeRuleModal() { document.getElementById('rule-modal').classList.remove('show'); }

function saveRule(e) {
  e.preventDefault();
  ruleCount++;
  const name = document.getElementById('modal-rule-name').value;
  const trigger = document.getElementById('modal-rule-trigger').value;
  const action = document.getElementById('modal-rule-action').value;

  const grid = document.getElementById('automation-rules-grid');
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header-flex">
      <span class="status-badge new">WORKFLOW #${ruleCount}</span>
      <label class="switch">
        <input type="checkbox" checked onchange="toggleWorkflow('${name}', this)">
        <span class="slider round"></span>
      </label>
    </div>
    <h3 style="margin-top:15px;">${name}</h3>
    <p style="color:var(--text-muted); font-size:0.85rem; margin-top:8px;">
      <strong>Trigger:</strong> ${trigger}<br>
      <strong>Action:</strong> ${action}
    </p>
    <button onclick="runAutomationTest('${name}')" class="secondary-btn" style="margin-top:15px; width:100%;">
      ▶ Run Test Trigger
    </button>
  `;
  grid.appendChild(card);
  closeRuleModal();
  addLog(`[System ${getCurrentTime()}] Created new custom workflow: "${name}"`);
  e.target.reset();
}

function clearLogs() {
  document.getElementById('terminal-logs').innerHTML = '';
}

function addLog(msg) {
  const logBox = document.getElementById('terminal-logs');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerText = msg;
  logBox.prepend(entry);
}

function getCurrentTime() {
  return new Date().toTimeString().split(' ')[0];
}

// --- ANALYTICS FILTER ---
function updateAnalyticsChart() {
  const filter = document.getElementById('analytics-filter').value;
  const graph = document.getElementById('traffic-graph');
  
  if (filter === '3m') {
    graph.innerHTML = `
      <div class="graph-bar" style="height: 60%;"><span>Mar</span><div class="bar-val">180k</div></div>
      <div class="graph-bar" style="height: 80%;"><span>Apr</span><div class="bar-val">240k</div></div>
      <div class="graph-bar" style="height: 100%;"><span>May</span><div class="bar-val">284k</div></div>
    `;
  } else {
    graph.innerHTML = `
      <div class="graph-bar" style="height: 40%;"><span>Jan</span><div class="bar-val">120k</div></div>
      <div class="graph-bar" style="height: 60%;"><span>Feb</span><div class="bar-val">180k</div></div>
      <div class="graph-bar" style="height: 75%;"><span>Mar</span><div class="bar-val">210k</div></div>
      <div class="graph-bar" style="height: 90%;"><span>Apr</span><div class="bar-val">250k</div></div>
      <div class="graph-bar" style="height: 100%;"><span>May</span><div class="bar-val">284k</div></div>
    `;
  }
}

// --- CALCULATOR ---
function calculateROI() {
  const spend = parseFloat(document.getElementById('spend').value) || 0;
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

// --- INITIAL LOAD ---
window.onload = function() {
  renderLeads();
  calculateROI();
};
