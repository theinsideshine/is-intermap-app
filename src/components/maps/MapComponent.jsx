import React, { useState, useEffect, useRef, useMemo } from 'react';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';
import { mapId, BUCKET_TO_CHECK, BUCKET_TO_SAVE,url_storage_map } from '../../config';
import useThemedSwal from '../../helpers/useThemedSwal';
import { updateKmlDataInSessionStorage } from '../../helpers/storageHelper';
import { savePolygon, verifyPoint, verifyPolygon } from '../../apis/mapsApi';
import { useNavigate } from 'react-router-dom';
import { mapTolerance } from '../../config';
import { useAuth } from '../../auth/hooks/useAuth';
import { useInterferences } from '../../hooks/useInterferences';
import { InterferencesDetailList } from '../interferences/InterferencesDetailList';
import { Button } from '@mui/material';

const containerStyle = {
  width: '90%',
  height: '70vh',
  maxWidth: 'none',
  margin: '0 auto',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const validationMessageStyle = {
  marginTop: '30px',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: '#333',
  width: '60%',
  margin: '0 auto',
};

const MapComponent = ({ coordinates, email , address, company, isFormValid }) => { // Recibir el email como prop
  const [validationMessage, setValidationMessage] = useState('');
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polygonRef = useRef(null);
  const pathCoords = useRef([]);
  const Swal = useThemedSwal();
  const defaultCenter = useMemo(() => ({ lat: -34.62, lng: -58.45 }), []);
  const navigate = useNavigate(); // Definir useNavigate
  const { login } = useAuth();
  const {  handlerAddInterference } = useInterferences(); 

  



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
  const handleServerResponseVerify = (response) => {
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

    const verifyFileName = response.data.generated_file;
    const representativePoint = response.data.point_reference;

    if (verifyFileName) {
      const fileUrl = `${url_storage_map}/${BUCKET_TO_CHECK}/${verifyFileName}`;
      updateKmlDataInSessionStorage(fileUrl, representativePoint);
      console.log('Archivo guardado en:', fileUrl);
    }
  };

  const handleVerifyPolygon = () => {
    if (pathCoords.current.length > 0) {
      const polygonCoords = pathCoords.current.map(coord => [coord.lat, coord.lng]);
      console.log('Coordenadas del polígono para enviar:', polygonCoords);

      verifyPolygon(polygonCoords)
        .then(handleServerResponseVerify)
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    } else {
      console.log('No se ha creado un polígono.');
      Swal.fire('Ingrese el poligono', 'No se ha creado un polígono.', 'warning');
    }
  };

  const handleVerifyPoint = () => {
    if (pathCoords.current.length > 0) {
      const { lat, lng } = pathCoords.current[pathCoords.current.length - 1];      
      const tolerance = mapTolerance;
      console.log('Punto capturado para enviar:', { lat, lng });
      console.log('Tolerancia:', tolerance);

      verifyPoint({ coord: [lat, lng], tolerance })
        .then(handleServerResponseVerify)
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    } else {
      console.log('No se ha capturado ningún punto.');
      Swal.fire('Ingrese el punto', 'No se ha capturado ningún punto.', 'warning');
    }
  };

  const handleServerResponseSave = (response) => {
    console.log('Respuesta del servidor:', response.data);
    console.log('Interferencia:', response.data.intersects);

   /*  if (response.data.intersects === false) {
      setValidationMessage(`En la dirección seleccionada no hay interferencia.`);
      Swal.fire('No hay interferencia!', 'Puede realizar el trabajo en campo', 'success');
      handleResetMap();
    } else {
      setValidationMessage(`En la dirección seleccionada hay interferencia.`);
      Swal.fire('Hay interferencia', 'Revise la opción VER KML', 'warning');
    } */

   // Guardar los valores en los estados
   //setInterference(response.data.intersects);
   //setFileName(response.data.generated_file);
   //setPointReference(response.data.point_reference);
   

   const fileUrl = `${url_storage_map}/${BUCKET_TO_SAVE}/${response.data.generated_file}`;
    console.log("username: ", login.user?.username);
    console.log("email: ", email);
    console.log("company: ", company);
    console.log("address_ref: ", address);
    console.log("point_reference: ", response.data.point_reference);
    console.log("url_file: ", fileUrl);
    console.log("interference: ", response.data.intersects);  
    

    // Crear una copia del objeto interferenceForm y asignar valores
      const interferenceForm = {
        id:      0,
        username: login.user?.username, // Asegúrate de que este acceso sea seguro
        email: email,
        company: company,
        address_ref: address,
        point_reference: [response.data.point_reference.lat,response.data.point_reference.lng ],
        url_file: fileUrl,
        interference: response.data.intersects // Asegúrate de usar el campo correcto
      };
    handlerAddInterference( interferenceForm );
                               


    

  };



  const handleSavePolygon = () => {
    if (pathCoords.current.length > 0) {
      const polygonCoords = pathCoords.current.map(coord => [coord.lat, coord.lng]);
      console.log('Coordenadas del polígono para enviar:', polygonCoords);

      if (!email || !company) {
        Swal.fire(
          'Campos incompletos',
          'Por favor, ingrese email y empresa.',
          'error'
        );
        return; // Detener la ejecución si falta algún campo
      }

      savePolygon(polygonCoords)
        .then(handleServerResponseSave)
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    } else {
      console.log('No se ha creado un polígono.');
      Swal.fire('Ingrese el poligono', 'No se ha creado un polígono.', 'warning');
    }
  };


  const handleSavePoint = () => {};


  const handleResetMap = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    pathCoords.current = [];
  };



  // Manejar la navegación al hacer clic en "Nueva Interferencia"
  const handleViewKml = () => {
    navigate("/viewkml"); // Navegar a /intercheck
};

  return (
    <div style={{ width: '100%' }}>
      <div ref={mapRef} style={containerStyle}></div>
      <div style={buttonContainerStyle}>
        <button onClick={handleVerifyPolygon}>Verificar Polígono</button>
        <button onClick={handleVerifyPoint} style={{ marginLeft: '10px' }}>Verificar Punto</button>
        <button onClick={handleViewKml} style={{ marginLeft: '10px' }}>Ver Interferencia</button>
        <button onClick={handleResetMap} style={{ marginLeft: '10px' }}>Reiniciar Mapa</button>

      </div>

      <div style={buttonContainerStyle}>
            <Button variant="contained" color="primary" onClick={handleSavePolygon} disabled={!isFormValid} >
                Crear interferencia-Polígono
            </Button>
            <Button variant="contained" color="primary" onClick={handleSavePoint} style={{ marginLeft: '10px' }}
            disabled={!isFormValid} 
            >
                Crear interferencia-Punto
            </Button>
        </div> 
    
    
    </div>
  );
};

export default MapComponent;
