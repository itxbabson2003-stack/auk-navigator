// js/routing.js

// Use the location IDs matching your locations array as the keys
const campusGraph = {
  "11": { lat: 12.944396, lng: 7.602090, neighbors: ["5", "3"] }, // Main Campus Gate (Gate 1)
  "3":  { lat: 12.944144, lng: 7.598917, neighbors: ["11", "0"] }, // Senate Building
  "0":  { lat: 12.942189, lng: 7.598735, neighbors: ["3"] }        // University Library
  // Keep mapping your walkway nodes here...
};