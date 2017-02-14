/* Loading the cities file into GeoJSON */

function createMap() {
    // create map
    var map = L.map('mapid', {
        center: [20,0],
        zoom: 2
    });
    
    // Add basemap
    /* Mapbox Tile
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.pirates',
    accessToken: 'pk.eyJ1IjoidGhvbWFzaGFybmVyIiwiYSI6ImNpc2c3cGNwcTAxczUyeW52bGo2bWc3c2cifQ.Nt2v3vP4lisWYxZ6hXgHyQ'
}).addTo(map);
*/
    L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(map);
    
    getData(map);
    
}


function getData(map) {
    $.ajax("data/cities.geojson", {
        dataType: "json",
        success: function(response) {
            
            /* CODE TO USE MARKER CLUSTERS
            var geoJsonLayer = L.geoJson(response);
            // Create L.markerClusterGroup layer
            var markers = L.markerClusterGroup();
            // add geojson to marker cluster layer
            markers.addLayer(geoJsonLayer);
            // Add the cluster to the map
            map.addLayer(markers);
            */
            
            
            
            // Create Style
            var geojsonMarkerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            
            // Create a GeoJSON Leaflet layer with response
            L.geoJson(response, {
                pointToLayer: function(feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                }, onEachFeature: onEachFeature // adds popup without marker sign, then 
            }).addTo(map);
            
        }
    });
};

// Apply a popup using "oneachFeature"
function onEachFeature(feature, layer) {
    // no property named popupcontent in cities.geojson
    var popupContent = "";
    if (feature.properties) {
        // loop to add each property from the geojson file
        for (var property in feature.properties) {
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
            
        }
        layer.bindPopup(popupContent);
    };
};

// Filter function (broken out from example)
function filter(feature, layer) {
    // To add, call with comma after onEachFeature and filter: filter
    return feature.properties.Pop_2015 > 20;
};

$(document).ready(createMap);


