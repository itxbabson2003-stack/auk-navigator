const locations = [
  { id: 0, name: "University Library", lat: 12.942189126715368, lng: 7.598735511805239 },
  { id: 1, name: "AUK Labs (Physics, Chem, Bio, Micro, SLT)", lat: 12.944025423413379, lng: 7.597262497054059 },
  { id: 2, name: "Gidan Hausa", lat: 12.94458605228857, lng: 7.5984198478861735 },
  { id: 3, name: "Senate Building", lat: 12.944144435496021, lng: 7.598917366584141 },
  { id: 4, name: "Block J (College of Education - Computer Education, Chemistry Education, Biology Education, Physics Education, Mathematics Education, Economics Education, Accounting Education & Other Related Education Courses)", lat: 12.940634205905074, lng: 7.598894171197383 },
  { id: 5, name: "School Mosque", lat: 12.943030410921988, lng: 7.5998797180143445 },
  { id: 6, name: "Football Field", lat: 12.945415895404928, lng: 7.601588435960898 },
  { id: 7, name: "Mosque Toilet", lat: 12.942614736662177, lng: 7.599802503573592 },
  { id: 8, name: "Humanities Studies Block H (College of Humanities - Arabic Studies, English Language, Hausa, Islamic Studies, Sharia)", lat: 12.941172322817021, lng: 7.598736968045122 },
  { id: 9, name: "School Clinic", lat: 12.940196653242213, lng: 7.598802168841364 },
  { id: 10, name: "Kwankassiya Hostel", lat: 12.94108204302298, lng: 7.595565188093713 },
  { id: 11, name: "Main Campus Gate (Gate 1)", lat: 12.944396634645443, lng: 7.602090968160514 },
  { id: 12, name: "Second Campus Gate (Gate 2)", lat: 12.940015825957566, lng: 7.599161391179505 },
  { id: 13, name: "Basketball Field", lat: 12.944999374007404, lng: 7.600699993744524 },
  { id: 14, name: "Long Tennis Field", lat: 12.945018683190654, lng: 7.600078053045236 },
  { id: 15, name: "Biological Garden", lat: 12.943278839383343, lng: 7.601229524727266 },
  { id: 16, name: "SLT Department Block B", lat: 12.942885128855721, lng: 7.598636203885681 },
  { id: 17, name: "Nursing Science Lecture Halls", lat: 12.94222176545315, lng: 7.595906119003388 },
  { id: 18, name: "SLT Lecture Halls", lat: 12.942744663256484, lng: 7.596297554589543 },
  { id: 19, name: "Katsina Islamic Foundation", lat: 12.943685583219317, lng: 7.602044088564637 },
  { id: 20, name: "Student Affairs Division", lat: 12.942853562123661, lng: 7.598247284787104 },
  { id: 21, name: "Sitting Area", lat: 12.943407872589265, lng: 7.597308510625994 },
  { id: 22, name: "Adebayoro Garki Hall", lat: 12.943114728861902, lng: 7.595832214855692 },
  { id: 23, name: "Multipurpose Hall", lat: 12.944885038423415, lng: 7.599181720180506 },
  { id: 24, name: "Ado Bayero Office Complex (College of Allied Health Science - B.NSc. Nursing Science, B.Rad. Radiography, Human Nutrition and Dietetics, Physiotherapy, Public Health)", lat: 12.943017922678324, lng: 7.596914775158526 },
  { id: 25, name: "Block E Natural and Applied Sciences (Biochemistry, Biology, Mathematics, Physics)", lat: 12.942813145141784, lng: 7.597341218718768 },
  { id: 26, name: "Microbiology Department", lat: 12.944068676138636, lng: 7.59589310247342 },
  { id: 27, name: "Staff Quarters", lat: 12.940450829060243, lng: 7.599752042892087 },
  { id: 28, name: "Public Toilet", lat: 12.942984332317081, lng: 7.596160222404254 },
  { id: 29, name: "Auditorium (College of Computing and Information Sciences - Computer Science, Cyber Security, Information Technology, Software Engineering)", lat: 12.942453695528258, lng: 7.597469999850925 },
  { id: 30, name: "Block A (Sociology & Political Science)", lat: 12.943220587844976, lng: 7.598722699582997 },
  { id: 31, name: "Block C (Economics & Business Admin)", lat: 12.943187972941669, lng: 7.597948799948998 },
  { id: 32, name: "Cafeteria", lat: 12.942257479986655, lng: 7.599808969037279 },
  { id: 33, name: "ICT Center", lat: 12.941691688244195, lng: 7.6000880867600165 },
  { id: 34, name: "Block D (Accounting)", lat: 12.943093722369916, lng: 7.597282388030624 },
  { id: 35, name: "AUK Girls Hostel", lat: 12.941222994885825, lng: 7.597553678440891 },
  { id: 36, name: "Block F (Public Administration)", lat: 12.942758151033939, lng: 7.597852319171638 },
  { id: 37, name: "Office for General Studies (GSP 101 – Use of English I; GSP 102 – Use of English; GSP 103 – Nigerian Peoples and Culture; GSP 104 – Philosophy, Logic and Human Existence; GSP 105 – Natural Science I; GSP 106 – Natural Science II; GSP 107 – Computer Fundamentals / ICT; GSP 108 – Use of Library, Study Skills & ICT; ENT 211 – Entrepreneurship and Innovation; ENT 312 – Venture Creation)", lat: 12.942570018020104, lng: 7.595958585793108 }
];

const map = L.map('map', { center: [12.9428, 7.5987], zoom: 17, minZoom: 16, maxZoom: 20, zoomControl: true });
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 20, maxNativeZoom: 18, attribution: 'Tiles &copy; Esri' }).addTo(map);

const markers = {};
const MIN_LABEL_ZOOM = 18; // Labels only show when zoomed in close

// Return a short label for map tooltips: use text before '(' or truncate
function shortLabel(name) {
  if (!name) return '';
  let label = name.split('(')[0].trim();
  if (label.length > 28) label = label.slice(0, 28) + '…';
  return label;
}

locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.bindPopup(`<strong>${loc.name}</strong>`);
  marker.bindTooltip(shortLabel(loc.name), {
    permanent: false, // Key fix: not always on
    direction: 'top',
    className: 'auk-label', // Dark glass style
    offset: [0, -18]
  });
  markers[loc.id] = marker;
});

// Show/hide labels based on zoom level
map.on('zoomend', () => {
  const z = map.getZoom();
  Object.values(markers).forEach(m => {
    if (z >= MIN_LABEL_ZOOM) {
      m.openTooltip();
    } else {
      m.closeTooltip();
    }
  });
});
map.fire('zoomend'); // Run once on load

let modernStartPoint = null;
let userMarker = null;
let routeLayer = null;
const searchInput = document.getElementById('searchInput');
const dropdownModern = document.getElementById('searchDropdown');
const startSelect = document.getElementById('startSelect');
const destSelect = document.getElementById('destSelect');
const routeBtnModern = document.getElementById('routeBtnModern');
const clearBtnModern = document.getElementById('clearBtnModern');
const liveLocationBtn = document.getElementById('liveLocationBtn');
const liveStatus = document.getElementById('liveStatus');
const startLabel = document.getElementById('startLabel');
const destLabel = document.getElementById('destLabel');
const distanceLabel = document.getElementById('distanceLabel');
const locationList = document.getElementById('locationList');
const panel = document.getElementById('panel');
const mobileToggle = document.getElementById('mobileToggle');
const closePanelBtn = document.getElementById('closePanelBtn');
const mobilePrompt = document.getElementById('mobilePrompt');
const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
const mobileSearchClose = document.getElementById('mobileSearchClose');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileSearchList = document.getElementById('mobileSearchList');
const mobileSearchSubmit = document.getElementById('mobileSearchSubmit');
let liveWatchId = null;

routeBtnModern.addEventListener('click', drawModernRoute);
clearBtnModern.addEventListener('click', clearModernRoute);
liveLocationBtn.addEventListener('click', toggleLiveLocation);
mobileToggle.addEventListener('click', openMobileSearchOverlay);
mobileSearchClose.addEventListener('click', closeMobileSearchOverlay);
mobileSearchInput.addEventListener('input', updateMobileSearchResults);
mobileSearchSubmit.addEventListener('click', submitMobileSearch);
closePanelBtn.addEventListener('click', hideMobilePanel);
window.addEventListener('resize', updateMobilePrompt);

locations.forEach(loc => {
  startSelect.insertAdjacentHTML('beforeend', `<option value="${loc.id}">${loc.name}</option>`);
  destSelect.insertAdjacentHTML('beforeend', `<option value="${loc.id}">${loc.name}</option>`);
  const modernItem = document.createElement('div');
  modernItem.className = 'location-item';
  modernItem.innerHTML = `<span>${loc.name}</span>`;
  modernItem.onclick = () => {
    destSelect.value = loc.id;
    destLabel.textContent = loc.name;
    map.setView([loc.lat, loc.lng], 18);
    markers[loc.id].openPopup();
    if (modernStartPoint) drawModernRoute();
  };
  locationList.appendChild(modernItem);
});

map.on('click', event => {
  if (routeLayer) map.removeLayer(routeLayer);
  modernStartPoint = event.latlng;
  setModernStartMarker(modernStartPoint, `Current start at ${modernStartPoint.lat.toFixed(6)}, ${modernStartPoint.lng.toFixed(6)}`);
  if (destSelect.value) drawModernRoute();
});

function setModernStartMarker(coords, label) {
  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.circleMarker(coords, { radius: 10, color: '#fff', fillColor: '#2563eb', fillOpacity: 1, weight: 4, className: 'blue-dot' }).addTo(map).bindPopup('Start location');
  userMarker.openPopup();
  startLabel.textContent = label;
}

function drawModernRoute() {
  const destId = parseInt(destSelect.value, 10);
  if (isNaN(destId)) { alert('Select a destination first.'); return; }
  let start;
  if (modernStartPoint) {
    start = modernStartPoint;
  } else {
    const startId = parseInt(startSelect.value, 10);
    if (isNaN(startId)) { alert('Tap the map to set a start point or select one.'); return; }
    const loc = locations[startId];
    start = { lat: loc.lat, lng: loc.lng };
    setModernStartMarker(start, loc.name);
  }
  const dest = locations[destId];
  if (routeLayer) map.removeLayer(routeLayer);
  routeLayer = L.polyline([[start.lat, start.lng], [dest.lat, dest.lng]], { color: '#fbbf24', weight: 6, opacity: 0.9, dashArray: '12,8', className: 'route-line' }).addTo(map);
  
  destLabel.textContent = dest.name;
  const km = getDistance(start, dest);
  distanceLabel.textContent = `${km.toFixed(2)} km`;
  clearBtnModern.style.display = 'block';

  // Smooth framing and auto-zoom setup
  map.fitBounds(routeLayer.getBounds(), { 
    padding: [60, 60],
    maxZoom: 18, 
    animate: true,
    duration: 1.5 
  });
  
  // Collapse desktop/mobile control container seamlessly
  if (panel) {
    panel.classList.add('collapsed');
  }

  if (window.matchMedia('(max-width: 980px)').matches) {
    closeMobileSearchOverlay();
    hideMobilePanel();
  }
}
  if (panel) {
    panel.classList.add('collapsed');
  }
  // ==========================================
  // PASTE YOUR NEW CODE RIGHT HERE (END)
  // ==========================================

  if (window.matchMedia('(max-width: 980px)').matches) {
    closeMobileSearchOverlay();
    hideMobilePanel();
  }
}

function openMobileSearchOverlay() {
  panel.classList.remove('open');
  mobileSearchOverlay.classList.add('open');
  mobileSearchInput.value = '';
  mobileSearchList.innerHTML = '';
  setTimeout(() => mobileSearchInput.focus(), 50);
  updateMobilePrompt();
}

function closeMobileSearchOverlay() {
  mobileSearchOverlay.classList.remove('open');
  updateMobilePrompt();
}

function updateMobileSearchResults() {
  const query = mobileSearchInput.value.trim().toLowerCase();
  mobileSearchList.innerHTML = '';
  if (!query) { return; }
  const matches = locations.filter(loc => loc.name.toLowerCase().includes(query));
  matches.slice(0, 6).forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.onclick = () => selectMobileSearchResult(loc);
    mobileSearchList.appendChild(li);
  });
}

function selectMobileSearchResult(loc) {
  mobileSearchInput.value = loc.name;
  mobileSearchList.innerHTML = '';
  destSelect.value = loc.id;
  destLabel.textContent = loc.name;
  map.setView([loc.lat, loc.lng], 18);
  markers[loc.id].openPopup();
  if (modernStartPoint) {
    drawModernRoute();
  } else {
    closeMobileSearchOverlay();
  }
}

function submitMobileSearch() {
  const query = mobileSearchInput.value.trim().toLowerCase();
  if (!query) { alert('Please type a destination name first.'); return; }
  const match = locations.find(loc => loc.name.toLowerCase().includes(query));
  if (!match) { alert('Destination not found. Try another name.'); return; }
  selectMobileSearchResult(match);
}

function toggleLiveLocation() {
  if (liveWatchId!== null) { stopLiveLocation(); } else { startLiveLocation(); }
}
function startLiveLocation() {
  if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
  liveLocationBtn.textContent = 'Stop live location';
  liveLocationBtn.disabled = true;
  liveStatus.textContent = 'Requesting current position...';
  const options = { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 };
  const handlePosition = position => {
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    modernStartPoint = coords;
    setModernStartMarker(coords, `Live location at ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
    map.setView(coords, 18);
    liveStatus.textContent = `Live location active (${position.coords.accuracy.toFixed(1)}m accuracy).`;
    if (position.coords.accuracy > 200) { liveStatus.textContent += ' (Low accuracy, use GPS on a mobile device for better results.)'; }
    if (destSelect.value) drawModernRoute();
    if (liveWatchId === null) {
      liveWatchId = navigator.geolocation.watchPosition(handlePosition, error => { liveStatus.textContent = `Location error: ${error.message}`; }, options);
    }
    liveLocationBtn.disabled = false;
  };
  const error = err => { liveLocationBtn.disabled = false; liveStatus.textContent = `Location error: ${err.message}`; alert(`Unable to access location: ${err.message}`); };
  navigator.geolocation.getCurrentPosition(handlePosition, error, options);
}
function stopLiveLocation() {
  if (liveWatchId!== null) { navigator.geolocation.clearWatch(liveWatchId); liveWatchId = null; }
  liveLocationBtn.textContent = 'Use current location';
  liveStatus.textContent = 'Live location stopped.';
}
function clearModernRoute() {
  if (routeLayer) map.removeLayer(routeLayer);
  if (userMarker) map.removeLayer(userMarker);
  modernStartPoint = null;
  userMarker = null;
  routeLayer = null;
  
  // Safely check if elements exist before changing values
  if (clearBtnModern) clearBtnModern.style.display = 'none';
  if (startSelect) startSelect.value = '';
  if (destSelect) destSelect.value = '';
  if (startLabel) startLabel.textContent = 'Tap the map to choose your start point.';
  if (destLabel) destLabel.textContent = 'Select a destination from the dropdown.';
  if (distanceLabel) distanceLabel.textContent = 'No route yet.';
  
  // Bring the sliding panel back
  if (panel) {
    panel.classList.remove('collapsed');
  }

  if (typeof updateMobilePrompt === 'function') {
    updateMobilePrompt();
  }
}
function showMobilePanel() {
  panel.classList.add('open');
  updateMobilePrompt();
}

function hideMobilePanel() {
  panel.classList.remove('open');
  updateMobilePrompt();
}

function updateMobilePrompt() {
  if (!mobilePrompt) return;
  if (window.matchMedia('(max-width: 980px)').matches && !panel.classList.contains('open')) {
    mobilePrompt.style.display = 'block';
  } else {
    mobilePrompt.style.display = 'none';
  }
}

function getDistance(a, b) {
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const R = 6371;
  const d = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(d));
}
document.addEventListener('click', (e) => { if (!e.target.closest('.autocomplete')) dropdownModern.style.display = 'none'; });
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  dropdownModern.innerHTML = '';
  if (!query) { dropdownModern.style.display = 'none'; return; }
  const matches = locations.filter(loc => loc.name.toLowerCase().includes(query));
  if (!matches.length) { dropdownModern.style.display = 'none'; return; }
  matches.forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.onclick = () => {
      searchInput.value = loc.name;
      dropdownModern.style.display = 'none';
      destSelect.value = loc.id;
      destLabel.textContent = loc.name;
      map.setView([loc.lat, loc.lng], 18);
      markers[loc.id].openPopup();
      if (modernStartPoint) drawModernRoute();
    };
    dropdownModern.appendChild(li);
  });
  dropdownModern.style.display = 'block';
});
startSelect.addEventListener('change', () => {
  const startId = parseInt(startSelect.value, 10);
  if (!isNaN(startId)) {
    const loc = locations[startId];
    modernStartPoint = { lat: loc.lat, lng: loc.lng };
    setModernStartMarker(modernStartPoint, loc.name);
  }
});
destSelect.addEventListener('change', () => {
  const destId = parseInt(destSelect.value, 10);
  if (!isNaN(destId)) {
    destLabel.textContent = locations[destId].name;
    if (liveWatchId!== null && modernStartPoint) { drawModernRoute(); }
  }
});
map.whenReady(() => { setTimeout(() => map.invalidateSize(), 200); updateMobilePrompt(); });
function copyCode() { if (!navigator.clipboard) { alert('Clipboard API not supported.'); return; } navigator.clipboard.writeText(document.documentElement.outerHTML).then(() => alert('Page HTML copied to clipboard.')).catch(() => alert('Unable to copy to clipboard.')); }
// force fresh rebuild
