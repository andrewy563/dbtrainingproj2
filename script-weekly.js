var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: -33.865427, lng: 151.196123 },
        mapTypeId: 'hybrid',
    });

    $.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function (data, status) {
        console.log(data);
        function eqfeed_callback(results) {
            var heatmapData = [];
            for (var i = 0; i < results.features.length; i++) {
                var coords = results.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                heatmapData.push(latLng);
            }
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                dissipating: false,
                map: map
            });
        }
        eqfeed_callback(data);
    });
}
