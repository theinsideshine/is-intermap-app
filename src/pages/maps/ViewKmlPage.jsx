import React, { useEffect, useRef } from 'react';
import useThemedSwal from '../../helpers/useThemedSwal';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';
import { mapId } from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { InterferencesDetailList } from '../../components/interferences/InterferencesDetailList';
import { Button } from '@mui/material';

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
  const navigate = useNavigate();
  const { id } = useParams();

  // Convertir id a número
  const numericId = id ? parseInt(id, 10) : 0;

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.644, lng: -58.473 },
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

        kmlLayerRef.current.addListener('status_changed', () => {
          const status = kmlLayerRef.current.getStatus();
          if (status !== 'OK') {
            console.error(`KML Layer load failed with status: ${status}`);
          } else {
            console.log('KML Layer loaded successfully');
            if (representativePoint) {
              console.log('Centrando el mapa en el punto representativo:', representativePoint);
              map.setCenter(representativePoint);
            } else {
              console.log('No se encontró el punto representativo en sessionStorage.');
            }
          }
        });

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

  const handleCreateInterference = () => {
    navigate("/intercheck");
  };
 

  return (
    <div style={{ width: '100%' }}>
      <div ref={mapRef} style={containerStyle}></div>
      <div style={buttonContainerStyle}>
        {numericId === 0 && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCreateInterference} 
            style={{ marginLeft: '10px' }}
          >
            Crear interferencia
          </Button>
        )}
        {/* <Button onClick={handleRemoveKmlLayer}>Eliminar Capa KML</Button> */}
      </div>
      <div>
        {numericId > 0 && <InterferencesDetailList id={numericId} />}
      </div>
    </div>
  );
};

export default ViewKmlPage;

