import React, { useEffect, useRef, useMemo } from 'react';
import { loadGoogleMaps } from '../googleMapsLoader';
import { mapId } from '../config'; // Asegúrate de que mapId está importado correctamente

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const defaultCenter = useMemo(() => ({ lat: -34.62, lng: -58.45 }), []);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates || defaultCenter,
        zoom: 15,
        mapId: mapId, // Asegúrate de que mapId esté correctamente configurado aquí
      });

      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        position: coordinates || defaultCenter,
        map,
      });

      map.addListener('click', (e) => {
        const clickedLat = e.latLng.lat();
        const clickedLng = e.latLng.lng();
        console.log(`Latitud: ${clickedLat}, Longitud: ${clickedLng}`);

        markerRef.current.position = { lat: clickedLat, lng: clickedLng };
      });

    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [coordinates, defaultCenter]);

  return <div ref={mapRef} style={containerStyle}></div>;
};

export default MapComponent;
