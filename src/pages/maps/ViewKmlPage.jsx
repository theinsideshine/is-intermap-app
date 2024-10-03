import React, { useEffect, useRef } from 'react';
import useThemedSwal from '../../helpers/useThemedSwal';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';
import { mapId } from '../../config';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '70vh',
  maxWidth: 'none',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const ViewKmlPage = () => {
  const mapRef = useRef(null);
  const kmlLayerRef = useRef(null);

  const Swal = useThemedSwal();
  const navigate = useNavigate(); // Definir useNavigate

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.644, lng: -58.473 }, // Centro predeterminado
        zoom: 15,
        mapId: mapId,
      });

      const kmlUrl = sessionStorage.getItem('fileUrl');
      const representativePoint = JSON.parse(sessionStorage.getItem('representativePoint'));

      if (kmlUrl) {
        console.log('Cargando KML desde URL:', kmlUrl);

        kmlLayerRef.current = new window.google.maps.KmlLayer(kmlUrl, {
          map: map,
          suppressInfoWindows: false,
          preserveViewport: true,
        });

        // Listener para manejo de errores de KML
        kmlLayerRef.current.addListener('status_changed', () => {
          const status = kmlLayerRef.current.getStatus();
          if (status !== 'OK') {
            //Swal.fire('Error al cargar KML', `El estado de la capa KML es: ${status}`, 'error');
            console.error(`KML Layer load failed with status: ${status}`);
          } else {
            console.log('KML Layer loaded successfully');
            // Centrar el mapa en el punto representativo después de cargar la capa KML
            if (representativePoint) {
              console.log('Centrando el mapa en el punto representativo:', representativePoint);
              map.setCenter(representativePoint);
            } else {
              console.log('No se encontró el punto representativo en sessionStorage.');
            }
          }
        });

        // Listener para manejar clics en la capa KML
        kmlLayerRef.current.addListener('click', (event) => {
          const content = event.featureData.infoWindowHtml;
          Swal.fire('Información del KML', content, 'info');
        });
      } else {
        console.error('No se proporcionó ninguna URL para el archivo KML');
      }
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [Swal]);

    // Manejar la navegación al hacer clic en "Nueva Interferencia"
    const handleCreateInterference = () => {
      navigate("/intercheck"); // Navegar a /intercheck
  };

  const handleRemoveKmlLayer = () => {
    if (kmlLayerRef.current) {
      kmlLayerRef.current.setMap(null);
      kmlLayerRef.current = null;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div ref={mapRef} style={containerStyle}></div>
      <div style={buttonContainerStyle}>
      <button onClick={handleCreateInterference} style={{ marginLeft: '10px' }}>Crear interferencia</button>
        <button onClick={handleRemoveKmlLayer}>Eliminar Capa KML</button>
      </div>
    </div>
  );
};

export default ViewKmlPage;
