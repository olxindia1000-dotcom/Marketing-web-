// Tab Switcher Navigation Function
function switchTab(tabId, el) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

  el.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');

  const headers = {
    analytics: 'Analytics Telemetry',
    sales: 'Sales Operations',
    leads: 'Lead Pipeline',
    automation: 'Marketing Automation',
    calculator: 'Growth & ROI Calculator'
  };

  document.getElementById('title-text').innerText = headers[tabId];
}

// Dynamic ROI Calculator Logic
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

// Initial Calculation Load
window.onload = calculateROI;
