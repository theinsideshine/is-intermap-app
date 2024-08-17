import React, { useEffect, useRef, useMemo, useState } from 'react';
import axios from 'axios';
import { loadGoogleMaps } from './googleMapsLoader';
import { mapId } from '../../config'; // Asegúrate de que mapId esté importado correctamente

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polygonRef = useRef(null);
  const pathCoords = useRef([]);
  const [buttonsCreated, setButtonsCreated] = useState(false);

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

        // Actualizar la posición del marcador
        markerRef.current.position = { lat: clickedLat, lng: clickedLng };

        // Añadir el punto al array de coordenadas
        pathCoords.current.push({ lat: clickedLat, lng: clickedLng });
        console.log('Coordenadas actuales:', pathCoords.current);

        // Actualizar el polígono en el mapa
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

      // Crear y mostrar botones solo una vez
      if (!buttonsCreated) {
        setButtonsCreated(true);

        // Crear botón para enviar el polígono
        const sendButton = document.createElement('button');
        sendButton.textContent = 'Enviar Polígono';
        sendButton.onclick = () => {
          console.log('Enviando polígono...');
          if (pathCoords.current.length > 0) {
            const polygonCoords = pathCoords.current.map(coord => [coord.lat, coord.lng]);
            console.log('Coordenadas del polígono para enviar:', polygonCoords);

            axios.post('http://localhost:5000/check_intersection', {
              polygon_coords: polygonCoords
            })
            .then(response => {
              console.log('Respuesta del servidor:', response.data);
            })
            .catch(error => {
              console.error('Error al enviar los datos:', error);
            });
          } else {
            console.log('No se ha creado un polígono.');
          }
        };

        // Crear botón para reiniciar el mapa
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reiniciar Mapa';
        resetButton.onclick = () => {
          console.log('Reiniciando el mapa...');
          if (polygonRef.current) {
            polygonRef.current.setMap(null); // Eliminar el polígono del mapa
            polygonRef.current = null;
          }
          pathCoords.current = []; // Limpiar las coordenadas del polígono
        };

        // Añadir botones al DOM
        const buttonContainer = document.getElementById('button-container');
        if (!buttonContainer) {
          const newButtonContainer = document.createElement('div');
          newButtonContainer.id = 'button-container';
          newButtonContainer.appendChild(sendButton);
          newButtonContainer.appendChild(resetButton);
          document.body.appendChild(newButtonContainer);
        } else {
          buttonContainer.innerHTML = ''; // Limpiar los botones antiguos
          buttonContainer.appendChild(sendButton);
          buttonContainer.appendChild(resetButton);
        }
      }
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [coordinates, defaultCenter, buttonsCreated]);

  return <div ref={mapRef} style={containerStyle}></div>;
};

export default MapComponent;
