/* index.js — Homepage showcase logic */
/* Depends on: shared.js (CTA_MAP, TYPE_ICONS, getBadgeIcon, formatCardDate) */

// ── Render showcase ───────────────────────────────────────────────────────────
function renderShowcase(assets) {
  const primary     = assets[0];
  const secondaries = assets.slice(1, 3);

  const primaryTags    = primary.tags || [];
  const primaryViewed  = localStorage.getItem(`signup_${primary.id}`) !== null;
  const primaryBtnText = primaryViewed
    ? 'View Content'
    : (CTA_MAP[primary.assetType] || 'Continue to Content') + ' &rarr;';
  const primaryBtnClass = primaryViewed ? 'bh-btn--ghost' : 'bh-btn--primary';

  document.getElementById('showcase-main').innerHTML = `
    <div class="showcase-content">
      <span class="tag-badge" style="align-self:flex-start;">
        ${getBadgeIcon(primary.assetType)}
        <span>${primary.assetType}</span>
      </span>
      <a href="/signup.html?id=${primary.id}" class="showcase-title-link">
        <h3 class="showcase-title">${primary.name}${primaryViewed ? '<span class="viewed-tick">&#10003; Viewed</span>' : ''}</h3>
      </a>
      <div class="showcase-sponsor-row">
        <span>Sponsored by <strong>${primary.sponsorName}</strong></span>
        <span style="color:var(--bh-gray-400);font-size:10px;">&bull;</span>
        <span style="display:inline-flex;align-items:center;gap:4px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;vertical-align:middle;">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${formatCardDate(primary.executionDate || primary.expirationDate, primary.assetType)}</span>
        </span>
      </div>
      <p class="showcase-desc-text">${primary.description}</p>
    </div>
    <div class="showcase-main-footer">
      <div class="showcase-tags">
        ${primaryTags.map(tag => `<span class="tag-topic">${tag}</span>`).join('')}
      </div>
      <a href="/signup.html?id=${primary.id}" class="bh-btn ${primaryBtnClass} bh-btn--sm" style="min-width:170px;text-align:center;text-decoration:none;">
        ${primaryBtnText}
      </a>
    </div>
  `;

  document.getElementById('showcase-sidebar').innerHTML = secondaries.map(sec => {
    const secViewed  = localStorage.getItem(`signup_${sec.id}`) !== null;
    const secCtaText = secViewed ? 'View Content &rarr;' : (CTA_MAP[sec.assetType] || 'Continue to Content') + ' &rarr;';
    return `
      <a href="/signup.html?id=${sec.id}" class="showcase-side-card">
        <div class="side-card-content">
          <span class="tag-badge" style="align-self:flex-start;">
            ${getBadgeIcon(sec.assetType)}
            <span>${sec.assetType}</span>
          </span>
          <h4 class="side-card-title">${sec.name}${secViewed ? '<span class="viewed-tick">&#10003; Viewed</span>' : ''}</h4>
          <div class="side-card-sponsor">
            <span>Sponsored by <strong>${sec.sponsorName}</strong></span>
            <span>&bull;</span>
            <span>${formatCardDate(sec.executionDate || sec.expirationDate, sec.assetType)}</span>
          </div>
        </div>
        <span class="side-card-cta">${secCtaText}</span>
      </a>
    `;
  }).join('');
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function loadTeasers() {
  const loader = document.getElementById('teaser-loading');
  const wrap   = document.getElementById('showcase-wrap');

  try {
    const response = await fetch('/assets');
    if (!response.ok) throw new Error('API fetch error');
    const json = await response.json();

    if (json.data && json.data.length > 0) {
      renderShowcase(json.data.slice(0, 3));
      wrap.style.display = 'grid';
    } else {
      loader.innerHTML = '<p style="color:var(--bh-gray-600);padding:24px 0;">No featured assets available.</p>';
      loader.style.display = 'block';
      return;
    }
  } catch (err) {
    console.error('Error fetching teaser assets:', err);
    loader.innerHTML = `<div style="padding:24px;background:#fff;border:1px solid var(--bh-red-100);color:var(--bh-red-800);border-radius:4px;text-align:center;">Failed to connect to the knowledge catalog API.</div>`;
    loader.style.display = 'block';
    return;
  }

  loader.style.display = 'none';
}

loadTeasers();
