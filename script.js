// Tab Switching System
document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and tabs
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Activate clicked button
    button.classList.add('active');

    // Get tab ID and activate tab
    const tabId = button.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`).classList.add('active');

    // Update Header Title
    const titles = {
      analytics: 'Analytics Dashboard',
      sales: 'Sales Telemetry',
      leads: 'Lead Pipeline',
      automation: 'Marketing Automation',
      calculator: 'ROI Calculator'
    };
    document.getElementById('page-title').innerText = titles[tabId];
  });
});

// Real-Time ROI Calculation Logic
function calculateROI() {
  const spend = parseFloat(document.getElementById('adSpend').value) || 0;
  const cpl = parseFloat(document.getElementById('cpl').value) || 1;
  const closeRate = parseFloat(document.getElementById('closeRate').value) || 0;
  const custValue = parseFloat(document.getElementById('custValue').value) || 0;

  // Formulas
  const leads = Math.floor(spend / cpl);
  const deals = Math.floor(leads * (closeRate / 100));
  const revenue = deals * custValue;
  const roi = spend > 0 ? (((revenue - spend) / spend) * 100).toFixed(0) : 0;

  // Render Updates
  document.getElementById('resLeads').innerText = leads.toLocaleString('en-IN');
  document.getElementById('resDeals').innerText = deals.toLocaleString('en-IN');
  document.getElementById('resRevenue').innerText = '₹' + revenue.toLocaleString('en-IN');
  document.getElementById('resROI').innerText = roi + '%';
}

// Initial calculation load
window.onload = calculateROI;
