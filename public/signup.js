/* signup.js — Registration form logic, API wiring, success state, sidebar related */

// ── Stock cover images per content type (Unsplash) ───────────────────────────
const COVER_IMAGES = {
  'Live Webinar':      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=440&auto=format&fit=crop&q=80',
  'On-Demand Webinar': 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&h=440&auto=format&fit=crop&q=80',
  'Whitepaper':        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=440&auto=format&fit=crop&q=80',
  'on-demand podcast': 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&h=440&auto=format&fit=crop&q=80',
};
// Fallback for any unrecognised type
const COVER_FALLBACK = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=440&auto=format&fit=crop&q=80';

// ── CTA copy per content type ─────────────────────────────────────────────────
// PRIMARY_CTA: shown inside the success card after the user registers for THIS asset
const PRIMARY_CTA = {
  'Live Webinar':      { label: 'Add to Calendar',  action: 'calendar' },
  'On-Demand Webinar': { label: 'Watch Now',         action: 'watch'    },
  'Whitepaper':        { label: 'Download PDF',      action: 'download' },
  'on-demand podcast': { label: 'Listen Now',        action: 'listen'   },
};

// RELATED_CTA: shown on each card in the sidebar related section
const RELATED_CTA = {
  'Live Webinar':      'Register for Webinar',
  'On-Demand Webinar': 'Watch On-Demand',
  'Whitepaper':        'Get Whitepaper',
  'on-demand podcast': 'Listen On-Demand',
};

// ── Fallback used only when no ?id= param and API is unreachable ──────────────
const FALLBACK_ASSET = {
  id: '5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa',
  name: 'The future of AI in clinical decision support',
  description: 'A live webinar exploring how AI-powered tools are transforming clinical decision-making at the bedside and reducing physician burnout.',
  executionDate: '2026-06-10T14:00:00.000Z',
  sponsorName: 'Epic Systems',
  assetType: 'Live Webinar',
  speakers: [
    { firstName: 'Linda', lastName: 'Nguyen', jobTitle: 'Director of Clinical Informatics', companyName: 'Mayo Clinic' },
    { firstName: 'Priya', lastName: 'Sharma',  jobTitle: 'Chief Medical Officer',            companyName: 'Tenet Healthcare' },
  ],
};

let currentAsset = null;

// ── Utilities ─────────────────────────────────────────────────────────────────
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return 'Published: ' + d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_').slice(0, 50).toLowerCase();
}

// ── File / calendar download helpers ─────────────────────────────────────────
function triggerBlob(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function generateICS(asset) {
  const start = asset.executionDate ? new Date(asset.executionDate) : new Date();
  const end   = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour
  const fmt   = d => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  const ics   = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', "PRODID:-//Becker's Hospital Review//EN",
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${asset.name}`,
    `DESCRIPTION:Presented by ${asset.sponsorName}. Registered via Becker's Hospital Review.`,
    'STATUS:CONFIRMED',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  triggerBlob(ics, 'text/calendar', 'event.ics');
}

function triggerPDFDownload(asset) {
  const content = [
    asset.name,
    `Presented by ${asset.sponsorName}`,
    '',
    asset.description || '',
    '',
    "Access granted via Becker's Hospital Review.",
  ].join('\n');
  triggerBlob(content, 'application/octet-stream', sanitizeFilename(asset.name) + '.pdf');
}

// ── Primary CTA action (fires when user clicks the post-registration button) ──
function handlePrimaryCTA() {
  const btn  = document.getElementById('primary-cta-btn');
  const type = currentAsset.assetType;

  if (type === 'Whitepaper') {
    triggerPDFDownload(currentAsset);

  } else if (type === 'Live Webinar') {
    generateICS(currentAsset);

  } else {
    // On-Demand Webinar / podcast — simulate loading
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Loading…';
    setTimeout(() => {
      btn.textContent = type === 'on-demand podcast' ? 'Now playing' : 'Now watching';
    }, 1000);
  }
}

// ── Render asset UI ───────────────────────────────────────────────────────────
function renderAssetUI(asset) {
  document.getElementById('asset-title').innerText       = asset.name;
  document.getElementById('asset-sponsor').innerText     = asset.sponsorName;
  document.getElementById('asset-description').innerText = asset.description;
  document.getElementById('asset-type-text').innerText   = asset.assetType;

  // Date row — executionDate preferred, fall back to createdDate
  const dateRow = document.getElementById('asset-date-row');
  const publishDate = asset.executionDate || asset.createdDate;
  if (publishDate) {
    document.getElementById('asset-date-string').innerText = formatDate(publishDate);
    dateRow.style.display = '';
  } else {
    dateRow.style.display = 'none';
  }

  // Cover stock image — swap in type-specific photo
  const coverEl = document.querySelector('.asset-cover-illustration');
  if (coverEl) {
    // Remove any previously injected elements (safe for repeat calls)
    coverEl.querySelectorAll('.cover-bg-img, .cover-type-label').forEach(el => el.remove());

    const img = document.createElement('img');
    img.className = 'cover-bg-img';
    img.src = COVER_IMAGES[asset.assetType] || COVER_FALLBACK;
    img.alt = '';
    img.loading = 'eager';
    coverEl.insertBefore(img, coverEl.firstChild);

    const typeLabel = document.createElement('span');
    typeLabel.className = 'cover-type-label';
    typeLabel.textContent = asset.assetType;
    coverEl.appendChild(typeLabel);
  }

  // Speakers — hide section if none
  const speakersSection = document.getElementById('speakers-section');
  const speakerList     = document.getElementById('speaker-list');
  if (asset.speakers && asset.speakers.length > 0) {
    speakerList.innerHTML = asset.speakers.map(sp => `
      <div class="speaker-card">
        <div class="speaker-avatar">
          <span class="speaker-avatar-init">${sp.firstName[0]}${sp.lastName[0]}</span>
        </div>
        <div class="speaker-details">
          <span class="speaker-name">${sp.firstName} ${sp.lastName}</span>
          <span class="speaker-title-text">${sp.jobTitle} · ${sp.companyName}</span>
        </div>
      </div>
    `).join('');
    speakersSection.style.display = '';
  } else {
    speakersSection.style.display = 'none';
  }

  // If already registered on this device, restore success state immediately
  const saved = localStorage.getItem(`signup_${asset.id}`);
  if (saved) showSuccess(JSON.parse(saved));
}

// ── Success state ─────────────────────────────────────────────────────────────
function showSuccess(data) {
  document.getElementById('reg-form-content').style.display = 'none';
  document.getElementById('success-state').style.display    = 'block';
  document.getElementById('conf-name').innerText  = `${data.person.firstName} ${data.person.lastName}`;
  document.getElementById('conf-email').innerText = data.person.email;

  // Show type-appropriate primary CTA
  const ctaDef = PRIMARY_CTA[currentAsset.assetType];
  if (ctaDef) {
    const btn  = document.getElementById('primary-cta-btn');
    const wrap = document.getElementById('success-cta-wrap');
    btn.textContent = ctaDef.label + ' →';
    btn.onclick     = handlePrimaryCTA;
    wrap.style.display = 'block';
  }

  // Load related content into sidebar
  loadSidebarRelated();
}

// ── Sidebar related ───────────────────────────────────────────────────────────
async function loadSidebarRelated() {
  try {
    const res  = await fetch('/assets');
    const json = await res.json();
    const all  = json.data.filter(a => a.id !== currentAsset.id);

    // Priority: 1) same assetType, 2) same sponsor different type, 3) everything else
    const sameType    = all.filter(a => a.assetType === currentAsset.assetType);
    const sameSponsor = all.filter(a =>
      a.assetType    !== currentAsset.assetType &&
      a.sponsorName  === currentAsset.sponsorName
    );
    const others = all.filter(a =>
      a.assetType   !== currentAsset.assetType &&
      a.sponsorName !== currentAsset.sponsorName
    );
    const related = [...sameType, ...sameSponsor, ...others].slice(0, 3);

    document.getElementById('sidebar-related-list').innerHTML =
      related.map(relatedCardHTML).join('');
    document.getElementById('sidebar-related').style.display = 'block';
  } catch (e) { /* silently omit related if API unavailable */ }
}

function relatedCardHTML(asset) {
  const ctaLabel = RELATED_CTA[asset.assetType] || 'View';
  return `
    <a href="/signup.html?id=${asset.id}" class="sidebar-rel-card">
      <span class="sidebar-rel-badge">${asset.assetType}</span>
      <p class="sidebar-rel-title">${asset.name}</p>
      <span class="sidebar-rel-cta">${ctaLabel} &rarr;</span>
    </a>
  `;
}

// ── Inline form error display ─────────────────────────────────────────────────
function showFormError(message) {
  const errorBox = document.getElementById('validation-errors');
  const card     = document.getElementById('reg-card');
  errorBox.innerHTML    = message;
  errorBox.style.display = 'block';
  card.classList.add('reg-card--error');
  // auto-clear the card border after 4 s
  setTimeout(() => card.classList.remove('reg-card--error'), 4000);
}

// ── Form submit ───────────────────────────────────────────────────────────────
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Collect + validate fields
  const fieldIds = ['email', 'firstName', 'lastName', 'jobTitle', 'companyName'];
  const values   = {};
  const errors   = [];

  fieldIds.forEach(id => {
    const el  = document.getElementById(id);
    const val = el.value.trim();
    el.classList.remove('error');
    if (!val) {
      el.classList.add('error');
      errors.push(`${el.labels[0]?.textContent || id} is required.`);
    }
    values[id] = val;
  });

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    document.getElementById('email').classList.add('error');
    errors.push('Please enter a valid work email address.');
  }

  const errorBox = document.getElementById('validation-errors');
  if (errors.length) {
    showFormError(errors.join('<br>'));
    return;
  }
  errorBox.style.display = 'none';
  document.getElementById('reg-card').classList.remove('reg-card--error');

  const btn = document.getElementById('submit-btn');
  btn.disabled    = true;
  btn.textContent = 'Registering…';

  try {
    const res = await fetch(`/assets/${currentAsset.id}/signup`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ person: {
        firstName:   values.firstName,
        lastName:    values.lastName,
        email:       values.email,
        jobTitle:    values.jobTitle,
        companyName: values.companyName,
      }}),
    });

    if (!res.ok) {
      // Parse the { "error": "..." } body the API always returns on 4xx
      let message = res.status >= 500
        ? 'Something went wrong on our end. Please try again shortly.'
        : 'Registration could not be completed. Please check your details.';
      try {
        const body = await res.json();
        if (body.error) message = body.error;
      } catch (_) {}
      throw new Error(message);
    }

    const result = await res.json();
    localStorage.setItem(`signup_${currentAsset.id}`, JSON.stringify({
      ...result.data,
      assetName: currentAsset.name,
      assetType: currentAsset.assetType
    }));
    showSuccess(result.data);

  } catch (err) {
    showFormError(err.message || 'An error occurred. Please try again.');
    btn.disabled    = false;
    btn.textContent = 'Continue to Content →';
  }
});

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  const id       = getQueryParam('id');
  const skeleton = document.getElementById('skeleton-screen');
  const content  = document.getElementById('asset-content');

  if (id) {
    skeleton.style.display = 'block';
    content.style.display  = 'none';

    try {
      const res  = await fetch(`/assets/${id}`);
      if (!res.ok) throw new Error('Asset not found');
      const json = await res.json();
      currentAsset = json.data;
    } catch (e) {
      skeleton.style.display = 'none';
      content.style.display  = 'block';
      document.getElementById('asset-title').innerText       = 'Asset unavailable';
      document.getElementById('asset-description').innerText = 'This asset could not be loaded. Please return to the listing.';
      document.getElementById('asset-type-text').innerText   = '';
      document.getElementById('asset-date-row').style.display = 'none';
      document.getElementById('speakers-section').style.display = 'none';
      return;
    }

    skeleton.style.display = 'none';
    content.style.display  = 'block';

  } else {
    // No ?id= — use fallback for local dev / demo
    currentAsset = FALLBACK_ASSET;
    skeleton.style.display = 'none';
    content.style.display  = 'block';
  }

  renderAssetUI(currentAsset);
}

init();
