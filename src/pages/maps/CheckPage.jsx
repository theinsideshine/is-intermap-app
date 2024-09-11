import React, { useState } from 'react';
import  AddressForm   from '../../components/maps/AddressForm'
import  MapComponent   from '../../components/maps/MapComponent'


const CheckPage = () => {
  const [coordinates, setCoordinates] = useState({ lat: -34.62, lng: -58.45 }); // Coordenadas predeterminadas

  return (
    <div style={{ display: 'flex' }}>
      <AddressForm setCoordinates={setCoordinates} />
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default CheckPage;

