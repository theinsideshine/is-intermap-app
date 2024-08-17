import React, { useEffect, useRef } from 'react';
import { loadGoogleMaps } from './googleMapsLoader';

const AddressForm = ({ setCoordinates }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["address_components", "geometry"],
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          console.log(`Dirección seleccionada: ${place.formatted_address}`);
          console.log(`Latitud: ${lat()}, Longitud: ${lng()}`);

          // Actualiza las coordenadas en el estado
          setCoordinates({ lat: lat(), lng: lng() });
        } else {
          console.error("No details available for input: '" + place.name + "'");
        }
      });
    }).catch(e => {
      console.error('Error loading Google Maps:', e);
    });
  }, [setCoordinates]);

  return (
    <div style={{ marginRight: '20px' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter an address"
        style={{ width: '300px', padding: '8px', fontSize: '16px' }}
      />
    </div>
  );
};

export default AddressForm;
