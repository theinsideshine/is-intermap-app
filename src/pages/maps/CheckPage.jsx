import React, { useState } from 'react';
import AddressForm from '../../components/maps/AddressForm';
import MapComponent from '../../components/maps/MapComponent';

const CheckPage = () => {
  const [coordinates, setCoordinates] = useState({ lat: -34.62, lng: -58.45 });
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(''); // Estado para la dirección
  const [company, setCompany] = useState(''); // Estado para la empresa

  return (
    <div style={{ display: 'flex' }}>
      <AddressForm
                  setCoordinates={setCoordinates}
                  setEmail={setEmail} 
                  setAddress={setAddress} 
                  setCompany={setCompany} />
      <MapComponent 
                  coordinates={coordinates}
                  email={email} 
                  address={address}
                  company={company} /> 
    </div>
  );
};

export default CheckPage;

