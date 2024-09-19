import React, { useState, useEffect, useRef, useMemo } from 'react';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';
import { mapId } from '../../config';
import useThemedSwal from '../../helpers/useThemedSwal';
import { updateKmlDataInSessionStorage } from '../../helpers/storageHelper';
import { checkIntersection, checkIntersectionWithTolerance } from '../../apis/mapsApi';

const containerStyle = {
  width: '90%', // Cambiar a 90% para ocupar más espacio horizontal
  height: '70vh',
  maxWidth: 'none',
  margin: '0 auto', // Centrar el mapa horizontalmente
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const validationMessageStyle = {
  marginTop: '30px', // Mayor margen superior para separar del botón
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: '#333',
  width: '60%',
  margin: '0 auto', // Centrar el mensaje
};

const MapComponent = ({ coordinates }) => {
  const [validationMessage, setValidationMessage] = useState(''); // Estado para el mensaje
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polygonRef = useRef(null);
  const pathCoords = useRef([]);
  const Swal = useThemedSwal();
  const defaultCenter = useMemo(() => ({ lat: -34.62, lng: -58.45 }), []);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates || defaultCenter,
        zoom: 15,
        mapId: mapId,
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

        pathCoords.current.push({ lat: clickedLat, lng: clickedLng });
        console.log('Coordenadas actuales:', pathCoords.current);

        if (polygonRef.current) {
          polygonRef.current.setPath(pathCoords.current);
        } else {
          polygonRef.current = new window.google.maps.Polygon({
            paths: pathCoords.current,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
          });
        }
      });
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [coordinates, defaultCenter]);

  // Función auxiliar para procesar la respuesta del servidor
  const handleServerResponse = (response) => {
    console.log('Respuesta del servidor:', response.data);
    console.log('Interferencia:', response.data.intersects);

    if (response.data.intersects === false) {
      setValidationMessage(`En la dirección seleccionada no hay interferencia.`);
      Swal.fire('No hay interferencia!', 'Puede realizar el trabajo en campo', 'success');
      handleResetMap();
    } else {
      setValidationMessage(`En la dirección seleccionada hay interferencia.`);
      Swal.fire('Hay interferencia', 'Revise la opción VER KML', 'warning');
    }

    const fileName = response.data.generated_file;
    const representativePoint = response.data.representative_point;

    if (fileName) {
      const fileUrl = `https://storage.googleapis.com/mi-bucket-para-kml/${fileName}`;
      updateKmlDataInSessionStorage(fileUrl, representativePoint);
      console.log('Archivo guardado en:', fileUrl);
    }
  };

  const handleSendPolygon = () => {
    if (pathCoords.current.length > 0) {
      const polygonCoords = pathCoords.current.map(coord => [coord.lat, coord.lng]);
      console.log('Coordenadas del polígono para enviar:', polygonCoords);

      checkIntersection(polygonCoords)
        .then(handleServerResponse)
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    } else {
      console.log('No se ha creado un polígono.');
    }
  };

  const handleSendPointWithTolerance = () => {
    if (pathCoords.current.length > 0) {
      const { lat, lng } = pathCoords.current[pathCoords.current.length - 1];
      const tolerance = 100;

      console.log('Punto capturado para enviar:', { lat, lng });
      console.log('Tolerancia:', tolerance);

      checkIntersectionWithTolerance({ coord: [lat, lng], tolerance })
        .then(handleServerResponse)
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    } else {
      console.log('No se ha capturado ningún punto.');
    }
  };

  const handleResetMap = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    pathCoords.current = [];
  };

  return (
    <div style={{ width: '100%' }}>
      <div ref={mapRef} style={containerStyle}></div>
      <div style={buttonContainerStyle}>
        <button onClick={handleSendPolygon}>Enviar Polígono</button>
        <button onClick={handleSendPointWithTolerance} style={{ marginLeft: '10px' }}>Enviar Punto con Tolerancia</button>
        <button onClick={handleResetMap} style={{ marginLeft: '10px' }}>Reiniciar Mapa</button>
      </div>
      {/* Mostrar el mensaje de validación en un recuadro */}
      {validationMessage && (
        <div style={validationMessageStyle}>
          {validationMessage}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
