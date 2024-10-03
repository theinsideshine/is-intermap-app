import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps } from '../../helpers/googleMapsLoader';

const AddressForm = ({ setCoordinates, setEmail, setAddress, setCompany }) => {
  const inputRef = useRef(null);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [companyError, setCompanyError] = useState('');

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    setEmail(value);

    if (!isValidEmail(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setCompanyValue(value);
    setCompany(value);

    if (!value.trim()) {
      setCompanyError('El nombre de la empresa no puede estar vacío');
    } else {
      setCompanyError('');
    }
  };

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["formatted_address", "geometry"],
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
          setAddress(place.formatted_address);
        } else {
          console.error("No details available for input: '" + place.name + "'");
        }
      });
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [setCoordinates, setAddress]);

  return (
    <div style={{ marginRight: '20px' }}>
      {/* Input de dirección */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese la dirección"
        style={{ width: '300px', padding: '8px', fontSize: '16px', marginBottom: '10px' }}
      />

      {/* Input de empresa */}
      <input
        type="text"
        placeholder="Ingrese la empresa"
        value={companyValue}
        onChange={handleCompanyChange}
        style={{ width: '300px', padding: '8px', fontSize: '16px', marginBottom: '5px' }}
      />
      {companyError && <p style={{ color: 'red' }}>{companyError}</p>} {/* Mensaje de error */}

      {/* Input de email */}
      <input
        type="email"
        placeholder="Ingrese su email"
        value={emailValue}
        onChange={handleEmailChange}
        style={{ width: '300px', padding: '8px', fontSize: '16px', marginBottom: '5px' }}
      />
      {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Mensaje de error */}
    </div>
  );
};

export default AddressForm;

