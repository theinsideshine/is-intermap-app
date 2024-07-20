import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const defaultCenter = { lat: -34.397, lng: 150.644 }; // Coordenadas predeterminadas

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDTkTw2Bi3WCoPyYrnSHNj2ae6sdyBsPqk",
      version: "weekly",
      libraries: ["places", "marker"]
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates || defaultCenter,
        zoom: 15,
        mapId: 'a023efeafb83a937', // Aquí agregamos el Map ID
      });

      if (coordinates) {
        if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
          new window.google.maps.marker.AdvancedMarkerElement({
            position: coordinates,
            map,
          });
        } else {
          console.error('AdvancedMarkerElement is not available');
        }
      }
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [coordinates],); // Solo dependemos de coordinates

  return <div ref={mapRef} style={containerStyle}></div>;
};

export default MapComponent;
