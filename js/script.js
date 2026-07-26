// Location data now comes from CAMPUS_GEOJSON (see campus-locations.geojson.js,
// loaded before this file) — real GeoJSON per the RFC 7946 spec, matching
// Objective 1 in the project proposal. We convert it once here into the flat
// {id, name, lat, lng} shape the rest of this file already works with, so
// nothing else below had to change.
const locations = CAMPUS_GEOJSON.features.map(f => ({
  id: f.properties.id,
  name: f.properties.name,
  lat: f.geometry.coordinates[1], // GeoJSON stores coordinates as [lng, lat]
  lng: f.geometry.coordinates[0]
}));

// Map Initialization Setup
const map = L.map('map', { center: [12.9428, 7.5987], zoom: 17, minZoom: 16, maxZoom: 20, zoomControl: true, preferCanvas: true });
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 20, maxNativeZoom: 18, attribution: 'Tiles &copy; Esri' }).addTo(map);

const markers = {};
const MIN_LABEL_ZOOM = 18;

function shortLabel(name) {
  if (!name) return '';
  let label = name.split('(')[0].trim();
  if (label.length > 28) label = label.slice(0, 28) + '…';
  return label;
}

// Add All Project Location Nodes
locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.bindPopup(`<strong>${loc.name}</strong>`);
  marker.bindTooltip(shortLabel(loc.name), {
    permanent: false,
    direction: 'top',
    className: 'auk-label',
    offset: [0, -18]
  });
  markers[loc.id] = marker;
});

map.on('zoomend', () => {
  const z = map.getZoom();
  Object.values(markers).forEach(m => {
    if (z >= MIN_LABEL_ZOOM) { m.openTooltip(); } else { m.closeTooltip(); }
  });
});
map.fire('zoomend');

// UI DOM References
let modernStartPoint = null;
let userMarker = null;
let routeControl = null;
let routeLayer = null;
let liveWatchId = null;
let routeDestId = null;       // which destination the current routeControl is drawn to
let routeHasFitBounds = false; // whether we've already zoomed out to fit this route

const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');
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
const closePanelBtn = document.getElementById('closePanelBtn');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const panelOverlay = document.getElementById('panelOverlay');
const directionsDetails = document.getElementById('directionsDetails');
const directionsList = document.getElementById('directionsList');

// ==========================================================================
// MOBILE DRAWER CONTROLS (hamburger toggle + backdrop)
// ==========================================================================
function openPanel() {
  panel.classList.add('open');
  if (panelOverlay) panelOverlay.classList.add('open');
  if (menuToggleBtn) {
    menuToggleBtn.textContent = '✕';
    menuToggleBtn.setAttribute('aria-label', 'Close menu');
  }
}

function closePanel() {
  panel.classList.remove('open');
  if (panelOverlay) panelOverlay.classList.remove('open');
  if (menuToggleBtn) {
    menuToggleBtn.textContent = '☰';
    menuToggleBtn.setAttribute('aria-label', 'Open menu');
  }
}

function togglePanel() {
  if (panel.classList.contains('open')) { closePanel(); } else { openPanel(); }
}

if (menuToggleBtn) menuToggleBtn.addEventListener('click', togglePanel);
if (panelOverlay) panelOverlay.addEventListener('click', closePanel);
if (closePanelBtn) closePanelBtn.addEventListener('click', closePanel);

// If the viewport grows past the mobile breakpoint (e.g. device rotation,
// resizing a browser window), reset the drawer state so it doesn't get
// stuck "open" with stale button icon when the layout switches back to desktop.
const mobileMedia = window.matchMedia('(max-width: 980px)');
function handleViewportChange() {
  if (!mobileMedia.matches) {
    closePanel();
  }
}
mobileMedia.addEventListener('change', handleViewportChange);

routeBtnModern.addEventListener('click', drawModernRoute);
clearBtnModern.addEventListener('click', clearModernRoute);
liveLocationBtn.addEventListener('click', toggleLiveLocation);

// Shared "pick this as my destination" behavior, used by both the directory
// list and the search dropdown, so the logic only lives in one place.
function selectDestination(loc) {
  destSelect.value = loc.id;
  destLabel.textContent = loc.name;
  searchInput.value = loc.name;
  searchDropdown.style.display = 'none';
  map.setView([loc.lat, loc.lng], 18);
  markers[loc.id].openPopup();
  if (modernStartPoint) { drawModernRoute(); } else { closePanel(); }
}

// Initialize Selector Dropdowns and Directory List.
// Build everything in DocumentFragments/strings first, then insert once —
// touching the live DOM 38 times each (as the old version did) forces a
// reflow on every iteration; batching it to one insert avoids that.
const startOptionsHtml = ['<option value="">Tap map to set current location</option>'];
const destOptionsHtml = ['<option value="">Select destination</option>'];
const listFragment = document.createDocumentFragment();

locations.forEach(loc => {
  startOptionsHtml.push(`<option value="${loc.id}">${loc.name}</option>`);
  destOptionsHtml.push(`<option value="${loc.id}">${loc.name}</option>`);

  const modernItem = document.createElement('div');
  modernItem.className = 'location-item';
  modernItem.dataset.locId = loc.id; // read back in the delegated click handler below
  modernItem.innerHTML = `<span>${loc.name}</span>`;
  listFragment.appendChild(modernItem);
});

startSelect.innerHTML = startOptionsHtml.join('');
destSelect.innerHTML = destOptionsHtml.join('');
locationList.appendChild(listFragment);

// Delegated click handler: one listener on the container instead of 38
// individual listeners, cheaper to set up and keeps memory use flat if the
// directory ever grows.
locationList.addEventListener('click', (e) => {
  const item = e.target.closest('.location-item');
  if (!item) return;
  const loc = locations[parseInt(item.dataset.locId, 10)];
  if (loc) selectDestination(loc);
});

// AUTOCOMPLETE SEARCH LOGIC INTERFACES
// Debounced so fast typing doesn't re-filter/re-render on every keystroke.
let searchDebounceId = null;
searchInput.addEventListener('input', () => {
  clearTimeout(searchDebounceId);
  searchDebounceId = setTimeout(runSearch, 120);
});

function runSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchDropdown.innerHTML = ''; searchDropdown.style.display = 'none'; return; }

  const matches = locations.filter(loc => loc.name.toLowerCase().includes(query));
  if (!matches.length) { searchDropdown.innerHTML = ''; searchDropdown.style.display = 'none'; return; }

  const fragment = document.createDocumentFragment();
  matches.forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.dataset.locId = loc.id;
    fragment.appendChild(li);
  });
  searchDropdown.innerHTML = '';
  searchDropdown.appendChild(fragment);
  searchDropdown.style.display = 'block';
}

// Delegated click handler for search results, same reasoning as the directory list above.
searchDropdown.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const loc = locations[parseInt(li.dataset.locId, 10)];
  if (loc) selectDestination(loc);
});

// Dismiss dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.autocomplete-container')) {
    searchDropdown.style.display = 'none';
  }
});

// Leaflet Map Pointer Handlers
map.on('click', event => {
  if (routeLayer) clearModernRoute();
  modernStartPoint = event.latlng;
  setModernStartMarker(modernStartPoint, `Current start at ${modernStartPoint.lat.toFixed(6)}, ${modernStartPoint.lng.toFixed(6)}`);
  if (destSelect.value) drawModernRoute();
});

function setModernStartMarker(coords, label, opts) {
  opts = opts || {};
  const shouldOpenPopup = opts.openPopup !== false;

  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.circleMarker(coords, { radius: 10, color: '#fff', fillColor: '#2563eb', fillOpacity: 1, weight: 4 }).addTo(map).bindPopup('Start location');

  // FIX: Detect when the popup "X" button is clicked or closed
  userMarker.on('popupclose', () => {
    // If the marker still exists on the map, wipe it completely
    if (userMarker && map.hasLayer(userMarker)) {
      map.removeLayer(userMarker);
      userMarker = null;
      modernStartPoint = null;
      startSelect.value = '';
      startLabel.textContent = 'Tap the map to choose your start point.';

      // If live tracking was running, this counts as the user removing
      // their start point, so stop tracking rather than having the next
      // GPS fix silently bring the marker right back.
      if (liveWatchId !== null) { stopLiveLocation(); }

      // Clear out the active route line if the start point gets deleted
      if (routeLayer) {
        try { map.removeControl(routeLayer); } catch(e) { if(map.hasLayer(routeLayer)) map.removeLayer(routeLayer); }
        routeLayer = null;
        routeControl = null;
        routeDestId = null;
        routeHasFitBounds = false;
        clearBtnModern.style.display = 'none';
        distanceLabel.textContent = 'No route yet.';
        clearDirectionsList();
      }
    }
  });

  if (shouldOpenPopup) userMarker.openPopup();
  startLabel.textContent = label;
}

// ==========================================================================
// TURN-BY-TURN TEXT DIRECTIONS
// Leaflet Routing Machine's OSRM router returns each route with an
// `instructions` array (one entry per maneuver). We render those as a plain
// text list — satisfying "displays turn-by-turn text directions" from the
// project objectives — instead of using the library's built-in itinerary
// panel (which we keep hidden via `show: false` since it doesn't match this
// app's design).
// ==========================================================================
function instructionText(instr) {
  if (instr.text) return instr.text;
  const road = instr.road ? ` onto ${instr.road}` : '';
  switch (instr.type) {
    case 'Head': return `Head${road}`;
    case 'Straight': return `Continue straight${road}`;
    case 'TurnLeft': return `Turn left${road}`;
    case 'TurnRight': return `Turn right${road}`;
    case 'SlightLeft': return `Slight left${road}`;
    case 'SlightRight': return `Slight right${road}`;
    case 'SharpLeft': return `Sharp left${road}`;
    case 'SharpRight': return `Sharp right${road}`;
    case 'Roundabout': return `Enter the roundabout${road}`;
    case 'WaypointReached': return `Arrive at waypoint`;
    case 'DestinationReached': return `Arrive at your destination`;
    default: return `Continue${road}`;
  }
}

function renderDirections(instructions) {
  if (!directionsList || !directionsDetails) return;
  if (!instructions || !instructions.length) { clearDirectionsList(); return; }

  const fragment = document.createDocumentFragment();
  instructions.forEach(instr => {
    const li = document.createElement('li');
    const distancePart = (typeof instr.distance === 'number' && instr.distance > 0)
      ? ` (${Math.round(instr.distance)} m)`
      : '';
    li.textContent = instructionText(instr) + distancePart;
    fragment.appendChild(li);
  });
  directionsList.innerHTML = '';
  directionsList.appendChild(fragment);
  directionsDetails.style.display = 'block';
}

function clearDirectionsList() {
  if (!directionsList || !directionsDetails) return;
  directionsList.innerHTML = '';
  directionsDetails.style.display = 'none';
  directionsDetails.removeAttribute('open');
}

// Draw Solid Tracking Route Lines
//
// opts.liveUpdate: true when this call comes from a live-location GPS fix
//   for a route that's already on screen — in that case we just nudge the
//   existing waypoint so the view stays put (no re-zoom/re-pan on every fix).
// opts.quiet: true to skip alerts/closing the drawer (used for automatic
//   background updates rather than an explicit user action).
function drawModernRoute(opts) {
  opts = opts || {};
  const destId = parseInt(destSelect.value, 10);
  if (isNaN(destId)) { if (!opts.quiet) alert('Select a destination first.'); return; }

  let start;
  if (modernStartPoint) {
    start = modernStartPoint;
  } else {
    const startId = parseInt(startSelect.value, 10);
    if (isNaN(startId)) { if (!opts.quiet) alert('Tap the map to set a start point.'); return; }
    const loc = locations[startId];
    start = { lat: loc.lat, lng: loc.lng };
  }

  const dest = locations[destId];

  // Same destination, driven by a live GPS update: just move the start
  // waypoint on the existing route instead of tearing it down and
  // re-fitting the view, so the route stays visible and steady like a
  // ride-hailing app instead of snapping back to a tight zoom every fix.
  if (opts.liveUpdate && routeControl && routeDestId === destId) {
    routeControl.setWaypoints([L.latLng(start.lat, start.lng), L.latLng(dest.lat, dest.lng)]);
    return;
  }

  if (routeControl) { map.removeControl(routeControl); }
  routeDestId = destId;
  routeHasFitBounds = false;

  routeControl = L.Routing.control({
    waypoints: [L.latLng(start.lat, start.lng), L.latLng(dest.lat, dest.lng)],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    lineOptions: { styles: [{ color: '#2563eb', opacity: 0.95, weight: 7 }] },
    createMarker: function() { return null; },
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: false, // we handle fitting ourselves, once, below
    show: false
  }).addTo(map);

  routeLayer = routeControl;

  routeControl.on('routesfound', function(e) {
    const routes = e.routes;
    const distanceInKm = routes[0].summary.totalDistance / 1000;
    distanceLabel.textContent = `${distanceInKm.toFixed(2)} km`;
    renderDirections(routes[0].instructions);

    // Zoom out to fit the whole route — start to destination — in view,
    // the way a ride-hailing app shows your trip, instead of staying
    // zoomed in tight on the start point.
    if (!routeHasFitBounds) {
      const bounds = L.latLngBounds(routes[0].coordinates.map(c => [c.lat, c.lng]));
      map.fitBounds(bounds, { paddingTopLeft: [40, 90], paddingBottomRight: [40, 40] });
      routeHasFitBounds = true;
    }
  });

  destLabel.textContent = dest.name;
  clearBtnModern.style.display = 'block';
  if (!opts.quiet) closePanel();
}

function toggleLiveLocation() {
  if (liveWatchId !== null) { stopLiveLocation(); } else { startLiveLocation(); }
}

function startLiveLocation() {
  if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
  liveLocationBtn.textContent = 'Stop live location';
  liveLocationBtn.disabled = true;
  liveStatus.textContent = 'Requesting current position...';

  const options = { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 };
  let firstFix = true;

  const handlePosition = position => {
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    modernStartPoint = coords;
    // Only pop the marker's callout open on the first fix — reopening it on
    // every background GPS update is what made live tracking feel jumpy.
    setModernStartMarker(coords, `Live location at ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`, { openPopup: firstFix });

    if (firstFix) {
      map.setView(coords, 18);
    }

    liveStatus.textContent = `Live location active (${position.coords.accuracy.toFixed(1)}m accuracy).`;

    if (destSelect.value) {
      // First fix with a destination already chosen: draw + fit the route.
      // Every fix after that: quietly nudge the same route's start point
      // so the "zoomed out to show the whole route" view holds steady.
      drawModernRoute({ liveUpdate: !firstFix, quiet: true });
    }

    if (liveWatchId === null) {
      liveWatchId = navigator.geolocation.watchPosition(handlePosition, error => { liveStatus.textContent = `Location error: ${error.message}`; }, options);
    }
    liveLocationBtn.disabled = false;
    firstFix = false;
  };

  const error = err => { liveLocationBtn.disabled = false; liveStatus.textContent = `Location error: ${err.message}`; alert(`Unable to access location: ${err.message}`); };
  navigator.geolocation.getCurrentPosition(handlePosition, error, options);
}

function stopLiveLocation() {
  if (liveWatchId !== null) { navigator.geolocation.clearWatch(liveWatchId); liveWatchId = null; }
  liveLocationBtn.textContent = 'Use current location';
  liveStatus.textContent = 'Live location stopped.';
}

function clearModernRoute() {
  if (routeLayer) {
    try { map.removeControl(routeLayer); } catch(e) { if(map.hasLayer(routeLayer)) map.removeLayer(routeLayer); }
  }
  if (userMarker) map.removeLayer(userMarker);

  modernStartPoint = null;
  userMarker = null;
  routeLayer = null;
  routeControl = null;
  routeDestId = null;
  routeHasFitBounds = false;

  clearBtnModern.style.display = 'none';
  startSelect.value = '';
  destSelect.value = '';
  searchInput.value = '';
  startLabel.textContent = 'Tap the map to choose your start point.';
  destLabel.textContent = 'Select a destination from the dropdown.';
  distanceLabel.textContent = 'No route yet.';
  clearDirectionsList();
}

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
    searchInput.value = locations[destId].name;
    if (modernStartPoint) drawModernRoute();
  }
});

map.whenReady(() => { setTimeout(() => map.invalidateSize(), 200); });

// Register the service worker for basic app-shell offline caching (see
// service-worker.js for exactly what this does and doesn't cover).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      // Non-fatal — e.g. running from a file:// URL, where service workers
      // aren't supported at all. The app still works fine without it.
    });
  });
}
