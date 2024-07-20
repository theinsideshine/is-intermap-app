// App.js
import React from 'react';
import MapComponent from './components/MapComponent';

const App = () => {
  const coordinates = { lat: -34.397, lng: 150.644 }; // Coordenadas predeterminadas

  return (
    <div>
      <MapComponent coordinates={coordinates} />
    </div>
  );
};

export default App;

