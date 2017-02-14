/* Leaflet Quick Start Guides */

var map = L.map('mapid', {
    center:[39.77477, -96.50391],
    zoom: 5
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.pirates',
    accessToken: 'pk.eyJ1IjoidGhvbWFzaGFybmVyIiwiYSI6ImNpc2c3cGNwcTAxczUyeW52bGo2bWc3c2cifQ.Nt2v3vP4lisWYxZ6hXgHyQ'
}).addTo(map);

var marker = L.marker([51.5,-0.09]).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b> Hello World, I'm a popup.</b>").openPopup();

circle.bindPopup("I'm a circle.");

polygon.bindPopup("I'm a polygon.");

var popup = L.popup()
.setLatLng([51.5,-0.09])
.setContent("I'm a standalone popup.")
.openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// GeoJSON tutorial

// Create a geoJSON Feature

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play."
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.9904, 39.75621]
    }
};

// Add to map
L.geoJSON(geojsonFeature).addTo(map);

// Create LineStrings

var myLines = [{
    "type": "LineString",
    "coordinates": [[-100,40],[-105,45],[-110,55]]
}, {
    "type": "LineString",
    "coordinates": [[-105,40],[-110,45],[-115,55]]
}];

// Create a style for LineStrings
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(myLines, {
    style: myStyle
}).addTo(map);

// Create Polygons and style based on property

var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22, 48.98],
            [-96.58, 45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party":"Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03,36.99],
            [-109.04,36.99],
            [-109.05, 41.00]
            
        ]]
    }
}];

L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party){
            case "Republican": return {color: "#ff0000"};
            case "Democrat": return {color: "#0000ff"};
        }
    }
}).addTo(map);

// Point to Layer (Changing markers into circles for point features)

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// Apply point to layer on the Rockies coordinate
L.geoJSON(geojsonFeature, {
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

// On Each Feature (called on each feature before adding to GeoJSON layer)

function onEachFeature(feature, layer) {
    // check if feature has popupcontent
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
};

var baltimoreFeat = {
    "type": "Feature",
    "properties": {
        "name": "Camden Yards",
        "amenity": "Baseball Stadium",
        "popupContent": "Best Team EVER"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-76.621600,39.283850]
    }
};

L.geoJSON(baltimoreFeat, {
    onEachFeature: onEachFeature
}).addTo(map);

// Filter by Team

var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Wrigley Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-87.655630,41.947210]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);



