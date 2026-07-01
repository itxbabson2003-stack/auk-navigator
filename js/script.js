const locations = [ { id: 0, name: "University Library", lat: 12.942189126715368, lng: 7.598735511805239 }, { id: 1, name: "AUK Labs (Physics, Chem, Bio, Micro, SLT)", lat: 12.944025423413379, lng: 7.597262497054059 }, { id: 2, name: "Gidan Hausa", lat: 12.94458605228857, lng: 7.5984198478861735 }, { id: 3, name: "Senate Building", lat: 12.944144435496021, lng: 7.598917366584141 }, { id: 4, name: "Complex / Computer Ed & Block J", lat: 12.94283206163487, lng: 7.596829978547866 }, { id: 5, name: "School Mosque", lat: 12.943030410921988, lng: 7.5998797180143445 }, { id: 6, name: "Football Field", lat: 12.945415895404928, lng: 7.601588435960898 }, { id: 7, name: "Mosque Toilet", lat: 12.942614736662177, lng: 7.599802503573592 }, { id: 8, name: "Humanities Studies Block H", lat: 12.941172322817021, lng: 7.598736968045122 }, { id: 9, name: "School Clinic", lat: 12.940196653242213, lng: 7.598802168841364 }, { id: 10, name: "Kwankassiya Hostel", lat: 12.94108204302298, lng: 7.595565188093713 }, { id: 11, name: "Main Campus Gate (Gate 1)", lat: 12.944396634645443, lng: 7.602090968160514 }, { id: 12, name: "Second Campus Gate (Gate 2)", lat: 12.940015825957566, lng: 7.599161391179505 }, { id: 13, name: "Basketball Field", lat: 12.944999374007404, lng: 7.600699993744524 }, { id: 14, name: "Long Tennis Field", lat: 12.945018683190654, lng: 7.600078053045236 }, { id: 15, name: "Biological Garden", lat: 12.943278839383343, lng: 7.601229524727266 }, { id: 16, name: "SLT Department Block B", lat: 12.942885128855721, lng: 7.598636203885681 }, { id: 17, name: "Nursing Science Lecture Halls", lat: 12.94222176545315, lng: 7.595906119003388 }, { id: 18, name: "SLT Lecture Halls", lat: 12.942744663256484, lng: 7.596297554589543 }, { id: 19, name: "Katsina Islamic Foundation", lat: 12.943685583219317, lng: 7.602044088564637 }, { id: 20, name: "Student Affairs Division", lat: 12.942853562123661, lng: 7.598247284787104 }, { id: 21, name: "Sitting Area", lat: 12.943407872589265, lng: 7.597308510625994 }, { id: 22, name: "Adebayoro Garki Hall", lat: 12.943114728861902, lng: 7.595832214855692 }, { id: 23, name: "Multipurpose Hall", lat: 12.944885038423415, lng: 7.599181720180506 }, { id: 24, name: "Ado Bayero Office Complex", lat: 12.943017922678324, lng: 7.596914775158526 }, { id: 25, name: "Block E Natural Sciences", lat: 12.942813145141784, lng: 7.597341218718768 }, { id: 26, name: "Microbiology Department", lat: 12.944068676138636, lng: 7.59589310247342 }, { id: 27, name: "Staff Quarters", lat: 12.940450829060243, lng: 7.599752042892087 }, { id: 28, name: "Public Toilet", lat: 12.942984332317081, lng: 7.596160222404254 }, { id: 29, name: "Auditorium", lat: 12.942453695528258, lng: 7.597469999850925 }, { id: 30, name: "Block A", lat: 12.942453695528258, lng: 7.597469999850925 }, { id: 31, name: "Block C", lat: 12.942453695528258, lng: 7.597469999850925 }, { id: 32, name: "Cafeteria", lat: 12.942257479986655, lng: 7.599808969037279 }, { id: 33, name: "ICT Center", lat: 12.941691688244195, lng: 7.6000880867600165 }, { id: 34, name: "Block D Accounting", lat: 12.941691688244195, lng: 7.6000880867600165 }, { id: 35, name: "AUK Girls Hostel", lat: 12.941222994885825, lng: 7.597553678440891 } ];

const map = L.map('map', { center: [12.9428, 7.5987], zoom: 17, minZoom: 16, maxZoom: 20, zoomControl: false });
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 20, maxNativeZoom: 18 }).addTo(map);

const markers = {}; const MIN_LABEL_ZOOM = 18;
locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.bindPopup(`<strong>${loc.name}</strong>`);
  marker.bindTooltip(loc.name, { permanent: false, direction: 'top', className: 'auk-label', offset: [0, -18] });
  markers[loc.id] = marker;
});
map.on('zoomend', () => { const z = map.getZoom(); Object.values(markers).forEach(m => { z >= MIN_LABEL_ZOOM? m.openTooltip() : m.closeTooltip(); }); map.fire('zoomend');

let modernStartPoint = null; let userMarker = null; let routeLayer = null;
let selectedStartId = null; let selectedDestId = null;

const startTrigger = document.getElementById('startTrigger'); const startOptions = document.getElementById('startOptions');
const destTrigger = document.getElementById('destTrigger'); const destOptions = document.getElementById('destOptions');
const routeBtnModern = document.getElementById('routeBtnModern'); const clearBtnModern = document.getElementById('clearBtnModern');
const liveLocationBtn = document.getElementById('liveLocationBtn'); const liveStatus = document.getElementById('liveStatus');
const startLabel = document.getElementById('startLabel'); const destLabel = document.getElementById('destLabel'); const distanceLabel = document.getElementById('distanceLabel'); const locationList = document.getElementById('locationList');
let liveWatchId = null;

// BUILD CUSTOM DROPDOWN - TAP TO OPEN
function buildSelect(optionsEl, triggerEl, isStart) {
  optionsEl.innerHTML = '';
  locations.forEach(loc => {
    const div = document.createElement('div'); div.className = 'select-option'; div.textContent = loc.name;
    div.onclick = () => {
      triggerEl.textContent = loc.name + ' ';
      triggerEl.innerHTML += '<span>▼</span>';
      optionsEl.classList.remove('open'); triggerEl.classList.remove('active');
      if(isStart){ selectedStartId = loc.id; modernStartPoint = {lat:loc.lat,lng:loc.lng}; setModernStartMarker(modernStartPoint, loc.name); }
      else{ selectedDestId = loc.id; destLabel.textContent = loc.name; map.setView([loc.lat, loc.lng], 18); markers[loc.id].openPopup(); if(modernStartPoint) drawModernRoute(); }
    };
    optionsEl.appendChild(div);
  });
}
buildSelect(startOptions, startTrigger, true);
buildSelect(destOptions, destTrigger, false);

[startTrigger, destTrigger].forEach((btn, i) => {
  btn.onclick = (e) => {
    e.stopPropagation();
    const options = i===0? startOptions : destOptions;
    document.querySelectorAll('.select-options').forEach(o=>{ if(o!==options) o.classList.remove('open'); });
    document.querySelectorAll('.select-trigger').forEach(t=>{ if(t!==btn) t.classList.remove('active'); });
    options.classList.toggle('open'); btn.classList.toggle('active');
  };
});
document.addEventListener('click', () => { document.querySelectorAll('.select-options').forEach(o=>o.classList.remove('open')); document.querySelectorAll('.select-trigger').forEach(t=>t.classList.remove('active')); });

map.on('click', e => { if (routeLayer) map.removeLayer(routeLayer); modernStartPoint = e.latlng; selectedStartId = null; setModernStartMarker(modernStartPoint, `You: ${modernStartPoint.lat.toFixed(5)}`); startTrigger.textContent = 'Custom Location '; startTrigger.innerHTML += '<span>▼</span>'; if (selectedDestId!==null) drawModernRoute(); });

function setModernStartMarker(coords, label) {
  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.circleMarker(coords, { radius: 12, color: '#fff', fillColor: '#00f5ff', fillOpacity: 1, weight: 4 }).addTo(map).bindPopup('You are here');
  userMarker.openPopup(); startLabel.textContent = label.split(':')[0];
}

function drawModernRoute() {
  if(selectedDestId===null){ alert('Select a destination first.'); return; }
  let start = modernStartPoint;
  if(!start && selectedStartId!==null){ const loc=locations[selectedStartId]; start=loc; setModernStartMarker(loc,loc.name); }
  if(!start){ alert('Set a start point first.'); return; }
  const dest = locations[selectedDestId];
  if (routeLayer) map.removeLayer(routeLayer);
  routeLayer = L.polyline([[start.lat, start.lng], [dest.lat, dest.lng]], { color: '#00f5ff', weight: 7, opacity: 1, dashArray: '16,10', className: 'route-line' }).addTo(map);
  destLabel.textContent = dest.name; distanceLabel.textContent = `${getDistance(start, dest).toFixed(2)} km`;
  map.fitBounds(routeLayer.getBounds(), { padding: [60, 60] }); clearBtnModern.style.display = 'block';
}

function toggleLiveLocation() { liveWatchId!==null?stopLiveLocation():startLiveLocation(); }
function startLiveLocation() {
  if(!navigator.geolocation){alert('Geolocation not supported');return;}
  liveLocationBtn.disabled=true; liveStatus.textContent='GPS: ACQUIRING...';
  navigator.geolocation.getCurrentPosition(pos=>{const coords={lat:pos.coords.latitude,lng:pos.coords.longitude}; modernStartPoint=coords; selectedStartId=null; setModernStartMarker(coords,`Live`); map.setView(coords,18); liveStatus.textContent=`GPS: LIVE ${pos.coords.accuracy.toFixed(0)}m`; startTrigger.textContent='Live GPS '; startTrigger.innerHTML += '<span>▼</span>'; if(selectedDestId!==null)drawModernRoute(); liveLocationBtn.disabled=false;},err=>{liveStatus.textContent=`GPS: ERROR`;liveLocationBtn.disabled=false;},{enableHighAccuracy:true,timeout:10000});
}
function stopLiveLocation(){ if(liveWatchId){navigator.geolocation.clearWatch(liveWatchId);liveWatchId=null;} liveLocationBtn.disabled=false; liveStatus.textContent='Status: OFFLINE'; }
function clearModernRoute(){ if(routeLayer)map.removeLayer(routeLayer); if(userMarker)map.removeLayer(userMarker); modernStartPoint=userMarker=routeLayer=null; selectedStartId=selectedDestId=null; clearBtnModern.style.display='none'; startTrigger.textContent='Tap map to set '; startTrigger.innerHTML += '<span>▼</span>'; destTrigger.textContent='Select target '; destTrigger.innerHTML += '<span>▼</span>'; startLabel.textContent='--'; destLabel.textContent='--'; distanceLabel.textContent='-- km'; }
function getDistance(a,b){const R=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLng=(b.lng-a.lng)*Math.PI/180,lat1=a.lat*Math.PI/180,lat2=b.lat*Math.PI/180,x=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;return 2*R*Math.asin(Math.sqrt(x));}
const searchInput = document.getElementById('searchInput'); const dropdownModern = document.getElementById('searchDropdown');
searchInput.addEventListener('input',()=>{const q=searchInput.value.toLowerCase();dropdownModern.innerHTML='';if(!q){dropdownModern.style.display='none';return;}const m=locations.filter(l=>l.name.toLowerCase().includes(q));if(!m.length){dropdownModern.style.display='none';return;}m.forEach(l=>{const li=document.createElement('li');li.textContent=l.name;li.onclick=()=>{searchInput.value=l.name;dropdownModern.style.display='none';selectedDestId=l.id;destTrigger.textContent=l.name+' ';destTrigger.innerHTML+='<span>▼</span>';destLabel.textContent=l.name;map.setView([l.lat,l.lng],18);markers[l.id].openPopup();if(modernStartPoint)drawModernRoute();};dropdownModern.appendChild(li);});dropdownModern.style.display='block';});
locations.forEach(loc => { const item = document.createElement('div'); item.className = 'location-item'; item.textContent = loc.name.split(' ')[0]; item.onclick = () => { selectedDestId = loc.id; destTrigger.textContent = loc.name+' '; destTrigger.innerHTML+='<span>▼</span>'; destLabel.textContent = loc.name; map.setView([loc.lat, loc.lng], 18); markers[loc.id].openPopup(); if(modernStartPoint) drawModernRoute(); }; locationList.appendChild(item); });
routeBtnModern.addEventListener('click', drawModernRoute); clearBtnModern.addEventListener('click', clearModernRoute); liveLocationBtn.addEventListener('click', toggleLiveLocation);
map.whenReady(()=>setTimeout(()=>map.invalidateSize(),200));
function copyCode(){navigator.clipboard.writeText(document.documentElement.outerHTML).then(()=>alert('Copied!')).catch(()=>alert('Copy failed'));}
