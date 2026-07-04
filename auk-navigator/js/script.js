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
  { id: 37, name: "Office for General Studies (GSP 101 – Use of English I; GSP 102 – Use of English; GSP 103 – Nigerian Peoples and Culture; GSP 104 – Philosophy, Logic and Human Existence; GSP 105 – Natural Science I; GSP 106 – Natural Science II; GSP 107 – Computer Fundamentals / ICT; GSP 108 – Use of Library, Study Skills & ICT; ENT 211 – Entrepreneurship and Innovation; ENT 312 – Venture Creation)", lat: 12.942570018020104, lng: 7.5955958585793108 },
// Add these right after ID 37 (around line 39/40, before the closing '];')
  {id: 38, name: "Farad Bello Ibrahim's Location", lat: 12.9425, lng: 7.5975 }, // Update with his exact coordinates
  { id: 39, name: "Friend 2 Location", lat: 12.9430, lng: 7.5980 },  // Update with exact coordinates
];

// Map Initialization Setup
// Step B: Loop through locations and add markers to the map
locations.forEach(location => {
    // Create a marker for each location
    const marker = L.marker([location.lat, location.lng]).addTo(map);
    
    // Bind a popup that shows the name when clicked
    marker.bindPopup(`<b>${location.name}</b>`);
    
    // Optional: Add a click event to trigger your routing algorithm
    marker.on('click', function() {
        console.log(`Calculating route to: ${location.name}`);
        calculateRoute(location.lat, location.lng); 
    });
});
// Step C: Routing Function
function calculateRoute(destinationLat, destinationLng) {
    // If you are using Leaflet Routing Machine, it looks like this:
    // (Make sure your user's current location coordinates are defined somewhere)
    if (typeof L.Routing !== 'undefined') {
        L.Routing.control({
            waypoints: [
                L.latLng(12.9428, 7.5987), // Replace with dynamic user/start location
                L.latLng(destinationLat, destinationLng) // The destination clicked
            ],
            routeWhileDragging: false
        }).addTo(map);
    } else {
        console.log("Routing module not loaded. Drawing a simple straight line instead.");
        // Fallback: Polyline
        const latlngs = [
            [12.9428, 7.5987], // Start
            [destinationLat, destinationLng] // End
        ];
        L.polyline(latlngs, {color: 'red'}).addTo(map);
    }os
}
const map = L.map('map', { center: [12.9428, 7.5987], zoom: 17, minZoom: 16, maxZoom: 20, zoomControl: true });
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
const mobilePrompt = document.getElementById('mobilePrompt');

routeBtnModern.addEventListener('click', drawModernRoute);
clearBtnModern.addEventListener('click', clearModernRoute);
liveLocationBtn.addEventListener('click', toggleLiveLocation);
closePanelBtn.addEventListener('click', () => panel.classList.remove('open'));
window.addEventListener('resize', updateMobilePrompt);

// Initialize Selector Dropdowns and Directory Lists
locations.forEach(loc => {
  startSelect.insertAdjacentHTML('beforeend', `<option value="${loc.id}">${loc.name}</option>`);
  destSelect.insertAdjacentHTML('beforeend', `<option value="${loc.id}">${loc.name}</option>`);
  
  const modernItem = document.createElement('div');
  modernItem.className = 'location-item';
  modernItem.innerHTML = `<span>${loc.name}</span>`;
  modernItem.onclick = () => {
    destSelect.value = loc.id;
    destLabel.textContent = loc.name;
    searchInput.value = loc.name;
    map.setView([loc.lat, loc.lng], 18);
    markers[loc.id].openPopup();
    if (modernStartPoint) drawModernRoute();
  };
  locationList.appendChild(modernItem);
});

// AUTOCOMPLETE SEARCH LOGIC INTERFACES
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchDropdown.innerHTML = '';
  if (!query) { searchDropdown.style.display = 'none'; return; }
  
  const matches = locations.filter(loc => loc.name.toLowerCase().includes(query));
  if (!matches.length) { searchDropdown.style.display = 'none'; return; }
  
  matches.forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.onclick = () => {
      searchInput.value = loc.name;
      searchDropdown.style.display = 'none';
      destSelect.value = loc.id;
      destLabel.textContent = loc.name;
      map.setView([loc.lat, loc.lng], 18);
      markers[loc.id].openPopup();
      if (modernStartPoint) drawModernRoute();
    };
    searchDropdown.appendChild(li);
  });
  searchDropdown.style.display = 'block';
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

function setModernStartMarker(coords, label) {
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
      
      // Clear out the active route line if the start point gets deleted
      if (routeLayer) {
        try { map.removeControl(routeLayer); } catch(e) { if(map.hasLayer(routeLayer)) map.removeLayer(routeLayer); }
        routeLayer = null;
        routeControl = null;
        clearBtnModern.style.display = 'none';
        distanceLabel.textContent = 'No route yet.';
      }
    }
  });

  userMarker.openPopup();
  startLabel.textContent = label;
}

// Draw Solid Tracking Route Lines
function drawModernRoute() {
  const destId = parseInt(destSelect.value, 10);
  if (isNaN(destId)) { alert('Select a destination first.'); return; }
  
  let start;
  if (modernStartPoint) {
    start = modernStartPoint;
  } else {
    const startId = parseInt(startSelect.value, 10);
    if (isNaN(startId)) { alert('Tap the map to set a start point.'); return; }
    const loc = locations[startId];
    start = { lat: loc.lat, lng: loc.lng };
  }

  const dest = locations[destId];
  
  if (routeControl) { map.removeControl(routeControl); }
  if (routeLayer) { map.removeLayer(routeLayer); }

  routeControl = L.Routing.control({
    waypoints: [L.latLng(start.lat, start.lng), L.latLng(dest.lat, dest.lng)],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    lineOptions: { styles: [{ color: '#2563eb', opacity: 0.95, weight: 7 }] },
    createMarker: function() { return null; },
    addWaypoints: false,
    routeWhileDragging: false,
    show: false
  }).addTo(map);

  routeLayer = routeControl;

  routeControl.on('routesfound', function(e) {
    const routes = e.routes;
    const distanceInKm = routes[0].summary.totalDistance / 1000;
    distanceLabel.textContent = `${distanceInKm.toFixed(2)} km`;
  });

  destLabel.textContent = dest.name;
  clearBtnModern.style.display = 'block';
  panel.classList.remove('open');
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
  
  const handlePosition = position => {
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    modernStartPoint = coords;
    setModernStartMarker(coords, `Live location at ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
    map.setView(coords, 18);
    liveStatus.textContent = `Live location active (${position.coords.accuracy.toFixed(1)}m accuracy).`;
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
  
  clearBtnModern.style.display = 'none';
  startSelect.value = '';
  destSelect.value = '';
  searchInput.value = '';
  startLabel.textContent = 'Tap the map to choose your start point.';
  destLabel.textContent = 'Select a destination from the dropdown.';
  distanceLabel.textContent = 'No route yet.';
  
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

if (mobilePrompt) {
  mobilePrompt.addEventListener('click', () => {
    panel.classList.add('open');
    mobilePrompt.style.display = 'none';
  });
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

map.whenReady(() => { setTimeout(() => map.invalidateSize(), 200); updateMobilePrompt(); });

