import React, { useEffect, useRef, useState } from "react";

const MapSelector = ({ setLatitude, setLongitude, latitude, longitude }) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDTsMTmbpn388SyT2h9u2-eNnqplHJvviE&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude || 23.8103, lng: longitude || 90.4125 },
        zoom: latitude && longitude ? 20 : 12,
      });
      mapRef.current = map;

      // Initialize the autocomplete feature
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.bindTo("bounds", map);

      // Create a marker to indicate the selected location
      const marker = new window.google.maps.Marker({
        map: map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });
      markerRef.current = marker; // Save marker reference

      // Listen for place changes in the autocomplete
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setLatitude(lat);
          setLongitude(lng);

          // Center the map on the selected place and set zoom level
          map.setCenter(place.geometry.location);
          map.setZoom(20); // Zoom in to see the selected place clearly

          // Place the marker on the selected location
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
        }
      });
    };
  }, [setLatitude, setLongitude, latitude, longitude]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a location"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default MapSelector;
