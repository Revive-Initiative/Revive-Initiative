// Revive Initiative — JSON data layer
// Fetches /data/*.json (manually maintained for now; swap for the
// Google Sheets API later by replacing fetchWaterData()'s implementation).

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

async function fetchWaterData() {
  return fetchJSON('/data/water.json');
}

async function fetchCampaignsData() {
  return fetchJSON('/data/campaigns.json');
}

function formatLiters(n) {
  return new Intl.NumberFormat('en-US').format(n) + ' L';
}

function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

// ---- Home page: progress bar + impact counters ----
async function renderHomeWaterProgress() {
  const el = document.getElementById('water-progress-root');
  if (!el) return;
  try {
    const data = await fetchWaterData();
    const pct = Math.min(100, (data.current_liters / data.goal_liters) * 100);
    el.innerHTML = `
      <div class="flex justify-between text-sm font-semibold text-brand-blue mb-2">
        <span>${formatLiters(data.current_liters)} raised</span>
        <span>${pct.toFixed(1)}%</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${pct.toFixed(0)}" aria-valuemin="0" aria-valuemax="100" aria-label="Water Relief Initiative progress">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="flex justify-between text-xs text-gray-500 mt-2">
        <span>Goal: ${formatLiters(data.goal_liters)}</span>
        <span>Remaining: ${formatLiters(data.goal_liters - data.current_liters)}</span>
      </div>
      <p class="text-xs text-gray-400 mt-3">Last updated ${data.last_updated}</p>
    `;
  } catch (e) {
    el.innerHTML = '<p class="text-sm text-gray-500">Progress data is temporarily unavailable.</p>';
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeWaterProgress();
});
