/* shared.js — Constants and helpers used across index.js, listing.js, and signup.js */

// ── CTA label per asset type ──────────────────────────────────────────────────
const CTA_MAP = {
  'Live Webinar':      'Register for Webinar',
  'On-Demand Webinar': 'Watch On-Demand',
  'Whitepaper':        'Get Whitepaper',
  'on-demand podcast': 'Listen Now',
};

// ── Type badge icons (inline SVG) ─────────────────────────────────────────────
const TYPE_ICONS = {
  Webinar:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:middle;display:inline-block;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  Whitepaper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:middle;display:inline-block;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  Podcast:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:middle;display:inline-block;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
};

// ── Shared helpers ────────────────────────────────────────────────────────────
function getBadgeIcon(typeStr) {
  const lower = typeStr.toLowerCase();
  if (lower.includes('webinar'))    return TYPE_ICONS.Webinar;
  if (lower.includes('whitepaper')) return TYPE_ICONS.Whitepaper;
  if (lower.includes('podcast'))    return TYPE_ICONS.Podcast;
  return TYPE_ICONS.Webinar;
}

function formatCardDate(dateStr, typeText) {
  if (!dateStr) return 'Available On Demand';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const isLive = typeText.toLowerCase().includes('live webinar') || typeText.toLowerCase().includes('event');
  const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${isLive ? 'Goes Live:' : 'Released:'} ${formatted}`;
}
