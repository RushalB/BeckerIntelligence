/* listing.js — Dynamic content rendering, filtering, sorting, and sidebar population for BHR Intelligence Hub */

// Asset Category & Topic Tag Mapping (maps the 10 catalog resources to executive domains)
const ASSET_METADATA_MAP = {
  "5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa": {
    category: "Clinical / Care Delivery",
    tags: ["AI Decision Support", "Clinical IT", "Artificial Intelligence"]
  },
  "f06de07ea2ec3e968986d3e66011213071b6f1c2457aefada4747475441891d4": {
    category: "Finance / Revenue",
    tags: ["Revenue Cycle", "Financial Recovery", "Optimization"]
  },
  "693799036391ac138c314b04f8984d2ccb8bc242ebb48c1ced88bce1af718e50": {
    category: "Workforce",
    tags: ["Workforce Crisis", "Nursing Retention", "HR Strategies"]
  },
  "1bccb3002b0a6f2811b93cf171db8bfa6fe3127d84a040bf6e91ff210847207a": {
    category: "Operations",
    tags: ["Supply Chain Resilience", "Resource Management", "Redundancy"]
  },
  "078436ec028e3615ce43f0072501097c1a3440324b8356d017d17e80d7f8c7db": {
    category: "Finance / Revenue",
    tags: ["CFO Strategies", "Capital Projects", "Tightening Margins"]
  },
  "864fd307dbf4fcc7c181dadb4c95158f54cd3347f27ef14aa49060425dae5bf6": {
    category: "Patient Experience",
    tags: ["Patient Experience", "Satisfaction Data", "Data-Driven Care"]
  },
  "4f8481cec60a5e839543b96a3f617465f4fdf1133bfd8ea08041ce0f4e6e8c59": {
    category: "Technology / IT",
    tags: ["EHR Optimization", "Digital Health", "Clinician Friction"]
  },
  "d324fc1701ece864d28954f586d4a313109779b21cb3762a439dc4ffb4dc4e0a": {
    category: "Clinical / Care Delivery",
    tags: ["Behavioral Health Integration", "Primary Care", "Whole-Person Care"]
  },
  "20daa36295eb84b020259bfbe1730a145e16df059e2ce52c0f102df38c9b687b": {
    category: "Technology / IT",
    tags: ["Cybersecurity", "Ransomware Defense", "IT Hardening"]
  },
  "fc83af2eae2b09b79331a127f1233d9b42fb65f15ed26240e6163f6bf1d1888f": {
    category: "Operations",
    tags: ["Lean Hospital Management", "Efficiency", "Waste Reduction"]
  }
};

// State Store
let allAssets = [];
let filteredAssets = [];
let isInitialLoad = true;

// Pagination State
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Filters State
let activeTypeFilter = 'all';
let searchQuery = '';
let sortKey = 'newest';

// Session Persistence Helpers
function saveSessionFilters() {
  const state = {
    activeTypeFilter,
    searchQuery,
    sortKey,
    currentPage
  };
  sessionStorage.setItem('bhr_listing_filters', JSON.stringify(state));
}

function loadSessionFilters() {
  const saved = sessionStorage.getItem('bhr_listing_filters');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      activeTypeFilter = state.activeTypeFilter || 'all';
      searchQuery = state.searchQuery || '';
      sortKey = state.sortKey || 'newest';
      currentPage = state.currentPage || 1;

      // Sync form input elements
      document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
        if (input) input.value = searchQuery;
      });

      const sortControl = document.getElementById('sort-control');
      if (sortControl) sortControl.value = sortKey;

      // Sync type filter pills
      document.querySelectorAll('#type-pills .pill-btn').forEach(btn => {
        btn.classList.remove('is-active');
        if (btn.getAttribute('data-type') === activeTypeFilter) {
          btn.classList.add('is-active');
        }
      });
    } catch (e) {
      console.error("Error loading session filters:", e);
    }
  }
}

// SVG Icons Map for Asset types
const TYPE_ICONS = {
  'Webinar': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; display:inline-block;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  'Whitepaper': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; display:inline-block;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  'Podcast': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; display:inline-block;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
};

// Helper to format Date string
function formatCardDate(dateStr, typeText) {
  if (!dateStr) return 'Available On Demand';
  
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  
  const isLive = typeText.toLowerCase().includes('live webinar') || typeText.toLowerCase().includes('event');
  
  const options = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  
  const prefix = isLive ? 'Goes Live:' : 'Released:';
  return `${prefix} ${d.toLocaleDateString('en-US', options)}`;
}

// Helper to check local registry state
function hasAccess(assetId) {
  return localStorage.getItem(`signup_${assetId}`) !== null;
}

// Render the Curated "Featured Intelligence" Sidebar Panel
function renderFeaturedSidebar() {
  const sidebarList = document.getElementById('featured-list');
  if (!sidebarList) return;

  // Curate 3 high-importance executive resources from stub listings
  const featuredIds = [
    "5af0e596b3c7e95aaafe42e01222f91666354f9152238bcf443b2c4c4ac46cfa", // AI
    "078436ec028e3615ce43f0072501097c1a3440324b8356d017d17e80d7f8c7db", // CFO
    "fc83af2eae2b09b79331a127f1233d9b42fb65f15ed26240e6163f6bf1d1888f"  // Lean Mgmt
  ];

  const featuredAssets = allAssets.filter(a => featuredIds.includes(a.id));
  
  sidebarList.innerHTML = featuredAssets.map((asset, index) => {
    const meta = ASSET_METADATA_MAP[asset.id] || { category: "Intelligence" };
    return `
      <a href="/signup.html?id=${asset.id}" class="featured-item">
        <span class="featured-num">0${index + 1}</span>
        <div class="featured-item-body">
          <span class="featured-meta">${meta.category}</span>
          <span class="featured-title">${asset.name}</span>
        </div>
      </a>
    `;
  }).join('');
}

// Render "Last Reviewed" sidebar widget — max 1 entry, hidden if empty
function renderSidebarAccessList() {
  const widget = document.getElementById('access-tracker-widget');
  const list = document.getElementById('viewed-content-list');
  if (!list) return;

  // Find the most recently stored signup key
  let lastKey = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('signup_')) {
      lastKey = key;
      break; // take the first one found; order reflects insertion for our use case
    }
  }

  if (!lastKey) {
    if (widget) widget.style.display = 'none';
    return;
  }

  if (widget) widget.style.display = 'block';

  const assetId = lastKey.replace('signup_', '');
  try {
    const regData = JSON.parse(localStorage.getItem(lastKey)) || {};
    const asset = allAssets.find(a => a.id === assetId);
    const assetName = asset ? asset.name : (regData.assetName || 'Recent Briefing');

    list.innerHTML = `
      <div class="recent-text-link">
        <a href="/signup.html?id=${assetId}" class="title-link">${assetName}</a>
      </div>`;
  } catch (e) {
    const asset = allAssets.find(a => a.id === assetId);
    const assetName = asset ? asset.name : 'Recent Briefing';
    list.innerHTML = `
      <div class="recent-text-link">
        <a href="/signup.html?id=${assetId}" class="title-link">${assetName}</a>
      </div>`;
  }
}

// Parse URL filter params (e.g. ?type=Webinar)
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  
  if (typeParam) {
    const cleanType = typeParam.toLowerCase();
    
    // Set active class on the visual pill
    document.querySelectorAll('#type-pills .pill-btn').forEach(btn => {
      btn.classList.remove('is-active');
      const dataType = btn.getAttribute('data-type');
      
      if (dataType === cleanType) {
        btn.classList.add('is-active');
        activeTypeFilter = cleanType;
      }
    });

    // Highlighting BHR section navbar highlights
    document.querySelectorAll('.bh-sectnav__item').forEach(el => {
      el.classList.remove('is-active');
      if (el.getAttribute('href').includes(`type=${typeParam}`)) {
        el.classList.add('is-active');
      }
    });
  }
}

// Load resources catalog from Express REST Endpoint
async function fetchAssets() {
  const loader = document.getElementById('catalog-loading');
  const grid = document.getElementById('catalog-grid');
  const emptyState = document.getElementById('catalog-empty');
  const resultsMeta = document.getElementById('result-counter');
  
  loader.style.display = 'block';
  grid.style.display = 'none';
  emptyState.style.display = 'none';

  try {
    const response = await fetch('/assets');
    if (!response.ok) throw new Error("API call failed");

    const json = await response.json();
    
    if (json.data && json.data.length > 0) {
      allAssets = json.data;
      applyFiltersAndSort();
      renderFeaturedSidebar();
    } else {
      resultsMeta.innerText = "Showing 0 assets";
      emptyState.style.display = 'block';
    }
  } catch (err) {
    console.error("Error loading assets:", err);
    resultsMeta.innerText = "Error loading library catalog.";
    grid.innerHTML = `<div style="padding: 40px; background:#fff; border:1px solid var(--bh-red-100); color:var(--bh-red-800); border-radius:4px; text-align:center; margin-bottom: 24px;">Failed to connect to the knowledge API. Please ensure your Express service is active on Port 3000.</div>`;
    grid.style.display = 'block';
  } finally {
    loader.style.display = 'none';
  }
}

// Apply Filters, Debounced Search, and Sort Logic
function applyFiltersAndSort() {
  // 1. Filter by content type pill
  filteredAssets = allAssets.filter(asset => {
    if (activeTypeFilter === 'all') return true;
    
    const typeStr = asset.assetType.toLowerCase();
    
    if (activeTypeFilter === 'webinar') {
      return typeStr.includes('webinar');
    }
    if (activeTypeFilter === 'whitepaper') {
      return typeStr.includes('whitepaper');
    }
    if (activeTypeFilter === 'podcast') {
      return typeStr.includes('podcast');
    }
    return true;
  });

  // 2. Filter by search query (keywords match Title, Description, Sponsor, and Dynamic tags/categories)
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filteredAssets = filteredAssets.filter(asset => {
      const meta = ASSET_METADATA_MAP[asset.id] || { category: "", tags: [] };
      const categoryMatch = meta.category.toLowerCase().includes(q);
      const tagsMatch = meta.tags.some(tag => tag.toLowerCase().includes(q));

      return (
        asset.name.toLowerCase().includes(q) ||
        asset.sponsorName.toLowerCase().includes(q) ||
        asset.description.toLowerCase().includes(q) ||
        categoryMatch ||
        tagsMatch
      );
    });
  }

  // 3. Sorting
  filteredAssets.sort((a, b) => {
    if (sortKey === 'name') {
      return a.name.localeCompare(b.name);
    }
    
    const dateA = new Date(a.executionDate || a.lastModifiedDate || a.createdDate || 0);
    const dateB = new Date(b.executionDate || b.lastModifiedDate || b.createdDate || 0);
    
    if (sortKey === 'newest') {
      return dateB - dateA;
    } else if (sortKey === 'oldest') {
      return dateA - dateB;
    }
    return 0;
  });

  // Reset to first page if not initial load
  if (isInitialLoad) {
    isInitialLoad = false;
  } else {
    currentPage = 1;
  }
  saveSessionFilters();
  updatePillCounts();
  renderCatalogGrid();
}

// Icons for pill buttons (inline SVG, inherits currentColor)
const PILL_ICONS = {
  all: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  webinar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  whitepaper: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
  podcast: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
};

const PILL_LABELS = {
  all: 'All Assets',
  webinar: 'Webinars',
  whitepaper: 'Whitepapers',
  podcast: 'Podcasts'
};

function updatePillCounts() {
  // Count against search-filtered pool (before type filter) so each pill shows
  // how many of that type match the current search query
  const q = searchQuery.trim().toLowerCase();
  const searchPool = q === '' ? allAssets : allAssets.filter(asset => {
    const meta = ASSET_METADATA_MAP[asset.id] || { category: '', tags: [] };
    return (
      asset.name.toLowerCase().includes(q) ||
      asset.sponsorName.toLowerCase().includes(q) ||
      (asset.description || '').toLowerCase().includes(q) ||
      meta.category.toLowerCase().includes(q) ||
      meta.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const counts = {
    all: searchPool.length,
    webinar: searchPool.filter(a => a.assetType.toLowerCase().includes('webinar')).length,
    whitepaper: searchPool.filter(a => a.assetType.toLowerCase().includes('whitepaper')).length,
    podcast: searchPool.filter(a => a.assetType.toLowerCase().includes('podcast')).length
  };

  document.querySelectorAll('#type-pills .pill-btn').forEach(btn => {
    const type = btn.getAttribute('data-type');
    const count = counts[type] ?? 0;
    btn.innerHTML = `
      <span class="pill-icon">${PILL_ICONS[type] || ''}</span>
      <span class="pill-label">${PILL_LABELS[type] || type}</span>
      <span class="pill-count">${count}</span>
    `;
  });
}

// Render dynamic Row items in list
function renderCatalogGrid() {
  const grid = document.getElementById('catalog-grid');
  const emptyState = document.getElementById('catalog-empty');
  const paginationCtrls = document.getElementById('pagination-controls');
  const resultsMeta = document.getElementById('result-counter');
  
  if (filteredAssets.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    paginationCtrls.style.display = 'none';
    resultsMeta.innerHTML = "Showing <strong>0</strong> assets";
    return;
  }

  emptyState.style.display = 'none';
  grid.style.display = 'block';

  // Calculate pagination parameters
  const totalItems = filteredAssets.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  
  const hasActiveFilters = searchQuery.trim() !== '' || activeTypeFilter !== 'all';
  const clearLink = hasActiveFilters
    ? ` <button class="clear-filters-link">&#x2715; Clear</button>`
    : '';
  resultsMeta.innerHTML = `Showing <strong>${startIndex + 1}–${endIndex}</strong> of <strong>${totalItems}</strong> assets${clearLink}`;

  const activePageItems = filteredAssets.slice(startIndex, endIndex);

  // Render Horizontal Asset Rows
  grid.innerHTML = activePageItems.map(asset => {
    const typeStr = asset.assetType.toLowerCase();
    let typeClass = 'type-webinar';
    let badgeIcon = TYPE_ICONS['Webinar'];

    if (typeStr.includes('whitepaper')) {
      typeClass = 'type-whitepaper';
      badgeIcon = TYPE_ICONS['Whitepaper'];
    } else if (typeStr.includes('podcast')) {
      typeClass = 'type-podcast';
      badgeIcon = TYPE_ICONS['Podcast'];
    }

    // Load category and sub-topic tags
    const meta = ASSET_METADATA_MAP[asset.id] || { 
      category: "Resource / Briefing", 
      tags: ["Intelligence"] 
    };

    const userViewed = hasAccess(asset.id);
    const actionBtnText = userViewed ? 'View Content' : 'Continue to Content &rarr;';
    const actionBtnClass = userViewed ? 'bh-btn--ghost' : 'bh-btn--primary';

    return `
      <article class="asset-row">
        <div class="row-content">
          <span class="tag-badge ${typeClass}" style="align-self:flex-start; display: inline-flex; align-items: center; gap: 5px; margin-bottom: 6px;">
            ${badgeIcon}
            <span>${asset.assetType}</span>
          </span>
          <a href="/signup.html?id=${asset.id}" class="row-title-link">
            <h3 class="row-title">${asset.name}${userViewed ? '<span class="viewed-tick">&#10003; Viewed</span>' : ''}</h3>
          </a>
          <div class="row-sponsor" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span>Sponsored by <strong>${asset.sponsorName}</strong></span>
            <span class="row-sponsor-divider" style="color: var(--bh-gray-400); font-size: 10px;">&bull;</span>
            <span class="row-date" style="margin-left: 0;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${formatCardDate(asset.executionDate || asset.expirationDate, asset.assetType)}</span>
            </span>
          </div>
          <p class="row-desc">${asset.description}</p>
        </div>
        
        <div class="row-footer">
          <div class="row-tags">
            ${meta.tags.map(tag => `<span class="tag-topic">${tag}</span>`).join('')}
          </div>
          
          <div class="row-actions">
            <a href="/signup.html?id=${asset.id}" class="bh-btn ${actionBtnClass} bh-btn--sm" style="min-width: 170px; text-align: center;">
              ${actionBtnText}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Handle pagination triggers
  if (totalPages > 1) {
    paginationCtrls.style.display = 'flex';
    document.getElementById('page-number-display').innerText = `Page ${currentPage} of ${totalPages}`;
    
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    
    if (currentPage === 1) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');
    
    if (currentPage === totalPages) nextBtn.classList.add('disabled');
    else nextBtn.classList.remove('disabled');
  } else {
    paginationCtrls.style.display = 'none';
  }
}

// Debounce for executive keyword search box
function clearAllFilters() {
  document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
    if (input) input.value = '';
  });
  searchQuery = '';
  document.querySelectorAll('.topic-browse-btn').forEach(t => t.classList.remove('is-active'));
  document.querySelectorAll('#type-pills .pill-btn').forEach(b => b.classList.remove('is-active'));
  document.querySelector('#type-pills [data-type="all"]').classList.add('is-active');
  activeTypeFilter = 'all';
  document.getElementById('sort-control').value = 'newest';
  sortKey = 'newest';
  currentPage = 1;
  sessionStorage.removeItem('bhr_listing_filters');
  applyFiltersAndSort();
}

let searchDebounceTimer;
function handleSearchInput(e) {
  clearTimeout(searchDebounceTimer);
  const value = e.target.value;
  searchQuery = value;

  // Sync values between both mobile and desktop inputs
  document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
    if (input !== e.target) {
      input.value = value;
    }
  });

  searchDebounceTimer = setTimeout(() => {
    applyFiltersAndSort();
  }, 300);
}

// Bind interactive event handlers
function setupEventHandlers() {
  document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
    input.addEventListener('input', handleSearchInput);
  });

  document.getElementById('sort-control').addEventListener('change', function(e) {
    sortKey = e.target.value;
    applyFiltersAndSort();
  });

  document.getElementById('type-pills').addEventListener('click', function(e) {
    const btn = e.target.closest('.pill-btn');
    if (!btn) return;
    
    document.querySelectorAll('#type-pills .pill-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    
    activeTypeFilter = btn.getAttribute('data-type');
    
    // Align visual highlights in upper section nav (match by href since innerText now has icon/count)
    document.querySelectorAll('.bh-sectnav__item').forEach(el => {
      el.classList.remove('is-active');
      const href = el.getAttribute('href') || '';
      if (activeTypeFilter === 'all' && href === '/listing.html') el.classList.add('is-active');
      if (activeTypeFilter === 'webinar' && href.includes('type=Webinar')) el.classList.add('is-active');
      if (activeTypeFilter === 'whitepaper' && href.includes('type=Whitepaper')) el.classList.add('is-active');
    });

    applyFiltersAndSort();
  });

  document.getElementById('prev-page-btn').addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      saveSessionFilters();
      renderCatalogGrid();
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }
  });

  document.getElementById('next-page-btn').addEventListener('click', function() {
    const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      saveSessionFilters();
      renderCatalogGrid();
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }
  });

  document.getElementById('reset-filters-btn').addEventListener('click', clearAllFilters);

  document.getElementById('result-counter').addEventListener('click', function(e) {
    if (e.target.closest('.clear-filters-link')) clearAllFilters();
  });

  // Clear active topic buttons when the user types manually
  document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
    input.addEventListener('input', function() {
      document.querySelectorAll('.topic-browse-btn').forEach(t => t.classList.remove('is-active'));
    }, true);
  });

  // Browse by Topic sidebar buttons
  document.querySelectorAll('.topic-browse-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const query = this.getAttribute('data-query');
      const isAlreadyActive = this.classList.contains('is-active');

      // Clear active state on all topic buttons
      document.querySelectorAll('.topic-browse-btn').forEach(t => t.classList.remove('is-active'));
      const searchInputs = document.querySelectorAll('#search-input, #search-input-mobile');

      if (isAlreadyActive) {
        searchQuery = '';
        searchInputs.forEach(input => { input.value = ''; });
      } else {
        this.classList.add('is-active');
        searchQuery = query;
        searchInputs.forEach(input => { input.value = query; });
      }
      applyFiltersAndSort();
      
      // Scroll to catalog section nicely
      document.querySelector('.catalog-layout').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Initial Bootstrapper
async function initializeCatalog() {
  loadSessionFilters();
  parseUrlParams();
  await fetchAssets();
  renderSidebarAccessList();
  setupEventHandlers();
}

initializeCatalog();
