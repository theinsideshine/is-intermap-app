import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { googleMapsApiKey, mapId } from '../config';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const defaultCenter = { lat: -34.397, lng: 150.644 }; // Coordenadas predeterminadas

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
      libraries: ["places", "marker"]
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates || defaultCenter,
        zoom: 15,
        mapId: mapId, // Aquí agregamos el Map ID
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
