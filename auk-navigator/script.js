/* ============================================================
   AUK NAVIGATOR — SCRIPT.JS
   Al-Qalam University, Katsina · Campus Navigation System
   ============================================================ */

// ── LOCATION DATABASE ─────────────────────────────────────
const locations = [
  { id: 0,  name: "University Library",                    cat: "Academic",   lat: 12.942189126715368, lng: 7.598735511805239 },
  { id: 1,  name: "AUK Science Labs (Physics, Chem, Bio, Micro, SLT)", cat: "Lab", lat: 12.944025423413379, lng: 7.597262497054059 },
  { id: 2,  name: "Gidan Hausa",                           cat: "Cultural",   lat: 12.94458605228857,  lng: 7.5984198478861735 },
  { id: 3,  name: "Senate Building",                       cat: "Admin",      lat: 12.944144435496021, lng: 7.598917366584141 },
  { id: 4,  name: "Block J — College of Education",        cat: "Academic",   lat: 12.940634205905074, lng: 7.598894171197383 },
  { id: 5,  name: "School Mosque",                         cat: "Facility",   lat: 12.943030410921988, lng: 7.5998797180143445 },
  { id: 6,  name: "Football Field",                        cat: "Sports",     lat: 12.945415895404928, lng: 7.601588435960898 },
  { id: 7,  name: "Mosque Toilet",                         cat: "Facility",   lat: 12.942614736662177, lng: 7.599802503573592 },
  { id: 8,  name: "Humanities Studies Block H",            cat: "Academic",   lat: 12.941172322817021, lng: 7.598736968045122 },
  { id: 9,  name: "School Clinic",                         cat: "Health",     lat: 12.940196653242213, lng: 7.598802168841364 },
  { id: 10, name: "Kwankassiya Hostel",                    cat: "Hostel",     lat: 12.94108204302298,  lng: 7.595565188093713 },
  { id: 11, name: "Main Campus Gate (Gate 1)",             cat: "Gate",       lat: 12.944396634645443, lng: 7.602090968160514 },
  { id: 12, name: "Second Campus Gate (Gate 2)",           cat: "Gate",       lat: 12.940015825957566, lng: 7.599161391179505 },
  { id: 13, name: "Basketball Field",                      cat: "Sports",     lat: 12.944999374007404, lng: 7.600699993744524 },
  { id: 14, name: "Long Tennis Field",                     cat: "Sports",     lat: 12.945018683190654, lng: 7.600078053045236 },
  { id: 15, name: "Biological Garden",                     cat: "Academic",   lat: 12.943278839383343, lng: 7.601229524727266 },
  { id: 16, name: "SLT Department Block B",                cat: "Academic",   lat: 12.942885128855721, lng: 7.598636203885681 },
  { id: 17, name: "Nursing Science Lecture Halls",         cat: "Academic",   lat: 12.94222176545315,  lng: 7.595906119003388 },
  { id: 18, name: "SLT Lecture Halls",                     cat: "Academic",   lat: 12.942744663256484, lng: 7.596297554589543 },
  { id: 19, name: "Katsina Islamic Foundation",            cat: "Facility",   lat: 12.943685583219317, lng: 7.602044088564637 },
  { id: 20, name: "Student Affairs Division",              cat: "Admin",      lat: 12.942853562123661, lng: 7.598247284787104 },
  { id: 21, name: "Sitting Area",                          cat: "Facility",   lat: 12.943407872589265, lng: 7.597308510625994 },
  { id: 22, name: "Adebayoro Garki Hall",                  cat: "Academic",   lat: 12.943114728861902, lng: 7.595832214855692 },
  { id: 23, name: "Multipurpose Hall",                     cat: "Academic",   lat: 12.944885038423415, lng: 7.599181720180506 },
  { id: 24, name: "Ado Bayero Office Complex — Allied Health Sciences", cat: "Health", lat: 12.943017922678324, lng: 7.596914775158526 },
  { id: 25, name: "Block E — Natural & Applied Sciences",  cat: "Academic",   lat: 12.942813145141784, lng: 7.597341218718768 },
  { id: 26, name: "Microbiology Department",               cat: "Academic",   lat: 12.944068676138636, lng: 7.59589310247342 },
  { id: 27, name: "Staff Quarters",                        cat: "Facility",   lat: 12.940450829060243, lng: 7.599752042892087 },
  { id: 28, name: "Public Toilet",                         cat: "Facility",   lat: 12.942984332317081, lng: 7.596160222404254 },
  { id: 29, name: "Auditorium — Computing & Info Sciences", cat: "Academic",  lat: 12.942453695528258, lng: 7.597469999850925 },
  { id: 30, name: "Block A — Sociology & Political Science", cat: "Academic", lat: 12.943220587844976, lng: 7.598722699582997 },
  { id: 31, name: "Block C — Economics & Business Admin",  cat: "Academic",   lat: 12.943187972941669, lng: 7.597948799948998 },
  { id: 32, name: "Cafeteria",                             cat: "Facility",   lat: 12.942257479986655, lng: 7.599808969037279 },
  { id: 33, name: "ICT Centre",                            cat: "Academic",   lat: 12.941691688244195, lng: 7.6000880867600165 },
  { id: 34, name: "Block D — Accounting",                  cat: "Academic",   lat: 12.943093722369916, lng: 7.597282388030624 },
  { id: 35, name: "AUK Girls Hostel",                      cat: "Hostel",     lat: 12.941222994885825, lng: 7.597553678440891 },
  { id: 36, name: "Block F — Public Administration",       cat: "Academic",   lat: 12.942758151033939, lng: 7.597852319171638 },
  { id: 37, name: "Office for General Studies (GSP)",      cat: "Admin",      lat: 12.942570018020104, lng: 7.5955958585793108 },
];

// ── CATEGORY COLOUR MAP ───────────────────────────────────
const catColor = {
  Academic:  '#60a5fa',
  Admin:     '#a78bfa',
  Facility:  '#f5a623',
  Health:    '#f87171',
  Sports:    '#34d399',
  Hostel:    '#fb923c',
  Lab:       '#22d3ee',
  Cultural:  '#f472b6',
  Gate:      '#94a3b8',
};

function colorFor(cat) { return catColor[cat] || '#94a3b8'; }

// ── MAP INIT ──────────────────────────────────────────────
const CAMPUS_CENTER = [12.9428, 7.5987];
const KATSINA_BOUNDS = [[12.9000, 7.5000], [13.1000, 7.7000]];
const MOCK_LOCATION  = { lat: 12.9431, lng: 7.5990 }; // fallback for desktop

const map = L.map('map', {
  center: CAMPUS_CENTER,
  zoom: 17,
  minZoom: 15,
  maxZoom: 20,
  zoomControl: true,
});

// Primary satellite layer (Esri World Imagery)
const esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { maxZoom: 20, maxNativeZoom: 19, attribution: '© Esri World Imagery', crossOrigin: true }
);

// Google satellite fallback for high-zoom
const googleSat = L.tileLayer(
  'https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  { subdomains: '0123', maxZoom: 21, maxNativeZoom: 20, attribution: '© Google', crossOrigin: true }
);

esriSat.addTo(map);
esriSat.on('tileerror', () => { if (!map.hasLayer(googleSat)) { map.removeLayer(esriSat); googleSat.addTo(map); } });

// Move zoom controls to bottom-right
map.zoomControl.setPosition('bottomright');

// ── MARKER ICONS ──────────────────────────────────────────
function makeIcon(loc) {
  const c = colorFor(loc.cat);
  return L.divIcon({
    className: '',
    html: `<div style="
      width:11px;height:11px;
      background:${c};
      border:2.5px solid rgba(255,255,255,0.9);
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,0.55),0 0 0 3px ${c}33;
    "></div>`,
    iconSize: [11, 11],
    iconAnchor: [5.5, 5.5],
    popupAnchor: [0, -10],
  });
}

// ── PLACE MARKERS ─────────────────────────────────────────
const markers = {};

locations.forEach(loc => {
  const m = L.marker([loc.lat, loc.lng], { icon: makeIcon(loc) }).addTo(map);

  m.bindPopup(`
    <div class="popup-inner">
      <strong>${loc.name}</strong>
      <em>${loc.cat}</em>
      <button class="popup-nav-btn" onclick="setDestFromPopup(${loc.id})">Navigate Here</button>
    </div>
  `, { maxWidth: 220, closeButton: true });

  m.bindTooltip(shortLabel(loc.name), {
    permanent: false,
    direction: 'top',
    className: 'auk-label',
    offset: [0, -10],
  });

  m.on('click', () => m.openPopup());
  markers[loc.id] = m;
});

function shortLabel(name) {
  const base = name.split(/[—(]/)[0].trim();
  return base.length > 30 ? base.slice(0, 29) + '…' : base;
}

// Show/hide tooltips based on zoom
const LABEL_ZOOM = 18;
map.on('zoomend', () => {
  const z = map.getZoom();
  Object.values(markers).forEach(m => { z >= LABEL_ZOOM ? m.openTooltip() : m.closeTooltip(); });
});
map.fire('zoomend');

// ── DOM REFS ──────────────────────────────────────────────
const searchInput     = document.getElementById('searchInput');
const searchDropdown  = document.getElementById('searchDropdown');
const startSelect     = document.getElementById('startSelect');
const destSelect      = document.getElementById('destSelect');
const routeBtn        = document.getElementById('routeBtnModern');
const clearBtn        = document.getElementById('clearBtnModern');
const liveBtn         = document.getElementById('liveLocationBtn');
const liveStatus      = document.getElementById('liveStatus');
const startLabel      = document.getElementById('startLabel');
const destLabel       = document.getElementById('destLabel');
const distanceLabel   = document.getElementById('distanceLabel');
const locationList    = document.getElementById('locationList');
const panel           = document.getElementById('panel');
const closePanelBtn   = document.getElementById('closePanelBtn');
const fab             = document.getElementById('mobilePrompt');

// ── POPULATE SELECTS + DIRECTORY ──────────────────────────
locations.forEach(loc => {
  const optStart = new Option(loc.name, loc.id);
  const optDest  = new Option(loc.name, loc.id);
  startSelect.appendChild(optStart);
  destSelect.appendChild(optDest);

  const item = document.createElement('div');
  item.className = 'dir-item';
  item.innerHTML = `
    <div class="dir-dot"></div>
    <div class="dir-name">${loc.name}</div>
  `;
  item.onclick = () => {
    destSelect.value = loc.id;
    destLabel.textContent = loc.name;
    searchInput.value = shortLabel(loc.name);
    map.setView([loc.lat, loc.lng], 18);
    markers[loc.id].openPopup();
    if (activeStart) drawRoute();
  };
  locationList.appendChild(item);
});

// ── STATE ─────────────────────────────────────────────────
let activeStart  = null; // { lat, lng }
let userMarker   = null;
let routeControl = null;
let liveWatchId  = null;
let liveActive   = false;

// ── SEARCH AUTOCOMPLETE ───────────────────────────────────
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchDropdown.innerHTML = '';
  if (!q) { searchDropdown.classList.remove('open'); return; }

  const hits = locations.filter(l => l.name.toLowerCase().includes(q));
  if (!hits.length) { searchDropdown.classList.remove('open'); return; }

  hits.slice(0, 10).forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.onclick = () => {
      searchInput.value = shortLabel(loc.name);
      searchDropdown.classList.remove('open');
      destSelect.value = loc.id;
      destLabel.textContent = loc.name;
      map.setView([loc.lat, loc.lng], 18);
      markers[loc.id].openPopup();
      if (activeStart) drawRoute();
    };
    searchDropdown.appendChild(li);
  });
  searchDropdown.classList.add('open');
});

document.addEventListener('click', e => {
  if (!e.target.closest('.autocomplete-wrap')) searchDropdown.classList.remove('open');
});
searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') searchDropdown.classList.remove('open'); });

// ── SELECT CHANGES ────────────────────────────────────────
startSelect.addEventListener('change', () => {
  const id = parseInt(startSelect.value, 10);
  if (isNaN(id)) return;
  const loc = locations[id];
  setStart({ lat: loc.lat, lng: loc.lng }, loc.name);
  if (destSelect.value !== '') drawRoute();
});

destSelect.addEventListener('change', () => {
  const id = parseInt(destSelect.value, 10);
  if (isNaN(id)) return;
  destLabel.textContent = locations[id].name;
  if (activeStart) drawRoute();
});

// ── MAP CLICK → SET START ─────────────────────────────────
map.on('click', e => {
  setStart({ lat: e.latlng.lat, lng: e.latlng.lng }, `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`);
  const destId = parseInt(destSelect.value, 10);
  if (!isNaN(destId)) drawRoute();
});

function setStart(coords, labelText) {
  activeStart = coords;
  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.marker([coords.lat, coords.lng], {
    icon: L.divIcon({
      className: '',
      html: '<div class="user-dot"></div>',
      iconSize: [18, 18], iconAnchor: [9, 9],
    }),
    zIndexOffset: 1000,
  }).addTo(map).bindPopup('<div class="popup-inner"><strong>You are here</strong></div>');
  startLabel.textContent = labelText;
}

// ── DRAW ROUTE ────────────────────────────────────────────
function drawRoute() {
  const destId = parseInt(destSelect.value, 10);
  if (!activeStart) { showToast('Tap the map or use GPS to set your start point.'); return; }
  if (isNaN(destId)) { showToast('Please select a destination.'); return; }

  const dest = locations[destId];
  if (routeControl) { try { map.removeControl(routeControl); } catch(e) {} routeControl = null; }

  routeControl = L.Routing.control({
    waypoints: [
      L.latLng(activeStart.lat, activeStart.lng),
      L.latLng(dest.lat, dest.lng),
    ],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    lineOptions: {
      styles: [
        { color: '#f5a623', opacity: 1,    weight: 6 },
        { color: '#fff',    opacity: 0.18, weight: 10 },
      ],
      extendToWaypoints: true,
      missingRouteTolerance: 0,
    },
    createMarker: () => null,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: true,
    show: false,
  }).addTo(map);

  routeControl.on('routesfound', e => {
    const d = e.routes[0].summary.totalDistance;
    distanceLabel.textContent = d >= 1000 ? `${(d / 1000).toFixed(2)} km` : `${Math.round(d)} m`;
    destLabel.textContent = dest.name;
    clearBtn.style.display = 'flex';
    panel.classList.remove('open'); // close drawer on mobile after routing
  });

  routeControl.on('routingerror', () => showToast('Could not find a route. Showing straight-line path.'));
}

routeBtn.addEventListener('click', drawRoute);

// ── CLEAR ROUTE ───────────────────────────────────────────
function clearRoute() {
  if (routeControl) { try { map.removeControl(routeControl); } catch(e) {} routeControl = null; }
  if (userMarker)   { map.removeLayer(userMarker); userMarker = null; }

  activeStart = null;
  startSelect.value = '';
  destSelect.value  = '';
  searchInput.value = '';
  startLabel.textContent    = 'Not set';
  destLabel.textContent     = 'Not set';
  distanceLabel.textContent = '—';
  clearBtn.style.display    = 'none';
  searchDropdown.classList.remove('open');
}
clearBtn.addEventListener('click', clearRoute);

// ── POPUP NAV BUTTON ──────────────────────────────────────
window.setDestFromPopup = function(id) {
  destSelect.value = id;
  destLabel.textContent = locations[id].name;
  map.closePopup();
  if (activeStart) drawRoute();
  else showToast('Tap the map to set your start point, then the route will draw automatically.');
};

// ── GPS LIVE LOCATION ─────────────────────────────────────
liveBtn.addEventListener('click', () => {
  if (liveActive) stopLive(); else startLive();
});

function startLive() {
  if (!navigator.geolocation) { showToast('Geolocation not supported on this device.'); return; }

  liveBtn.textContent = '⏹ Stop GPS';
  liveBtn.classList.add('active');
  liveStatus.textContent = 'Acquiring GPS signal…';

  const opts = { enableHighAccuracy: true, maximumAge: 0, timeout: 12000 };

  const onPos = pos => {
    const { latitude: lat, longitude: lng, accuracy } = pos.coords;
    const inBounds = lat >= 12.9 && lat <= 13.1 && lng >= 7.5 && lng <= 7.7;

    const finalCoords = inBounds ? { lat, lng } : MOCK_LOCATION;
    const label = inBounds
      ? `GPS — ${lat.toFixed(5)}, ${lng.toFixed(5)} (±${Math.round(accuracy)}m)`
      : `Simulated (desktop fallback)`;

    setStart(finalCoords, label);
    if (inBounds) map.setView([lat, lng], 18);

    liveStatus.textContent = inBounds
      ? `Live · ±${Math.round(accuracy)}m accuracy`
      : 'Simulated position (outside campus bounds)';

    liveActive = true;
    if (!liveWatchId) {
      liveWatchId = navigator.geolocation.watchPosition(onPos, onErr, opts);
    }
    if (destSelect.value) drawRoute();

    // Re-label the button now we have a fix
    liveBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
        <circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/>
      </svg>
      Stop GPS
    `;
  };

  const onErr = err => {
    // Silent desktop fallback — no annoying alert
    liveStatus.textContent = `Using simulated position (${err.message})`;
    setStart(MOCK_LOCATION, 'Simulated campus position');
    liveActive = true;
    if (destSelect.value) drawRoute();
  };

  navigator.geolocation.getCurrentPosition(onPos, onErr, opts);
}

function stopLive() {
  if (liveWatchId !== null) { navigator.geolocation.clearWatch(liveWatchId); liveWatchId = null; }
  liveActive = false;
  liveBtn.classList.remove('active');
  liveBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
      <circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/>
    </svg>
    Use My GPS
  `;
  liveStatus.textContent = 'Location inactive';
}

// ── PANEL TOGGLE (MOBILE) ─────────────────────────────────
closePanelBtn.addEventListener('click', () => panel.classList.remove('open'));
fab.addEventListener('click', () => panel.classList.add('open'));

// Hide FAB when panel is open on mobile
const observer = new MutationObserver(() => {
  if (window.innerWidth <= 900) {
    fab.style.display = panel.classList.contains('open') ? 'none' : 'flex';
  }
});
observer.observe(panel, { attributes: true, attributeFilter: ['class'] });

// ── RESIZE HANDLER ────────────────────────────────────────
function handleResize() {
  const mobile = window.innerWidth <= 900;
  fab.style.display = mobile && !panel.classList.contains('open') ? 'flex' : mobile ? 'none' : 'none';
  map.invalidateSize();
}
window.addEventListener('resize', handleResize);
handleResize();

// ── TOAST ─────────────────────────────────────────────────
let toastEl = null;
function showToast(msg) {
  if (toastEl) toastEl.remove();
  toastEl = document.createElement('div');
  toastEl.textContent = msg;
  Object.assign(toastEl.style, {
    position: 'fixed',
    bottom: '88px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(10,12,20,0.92)',
    border: '1px solid rgba(245,166,35,0.35)',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '99px',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: '500',
    zIndex: '9999',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    maxWidth: '90vw',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
  });
  document.body.appendChild(toastEl);
  setTimeout(() => { if (toastEl) { toastEl.remove(); toastEl = null; } }, 3500);
}

// ── READY ─────────────────────────────────────────────────
map.whenReady(() => setTimeout(() => map.invalidateSize(), 200));