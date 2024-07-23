import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import AddressForm from './components/AddressForm';

const App = () => {
  const [coordinates, setCoordinates] = useState({ lat: -34.62, lng: -58.45 }); // Coordenadas predeterminadas

  return (
    <div style={{ display: 'flex' }}>
      <AddressForm setCoordinates={setCoordinates} />
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default App;

