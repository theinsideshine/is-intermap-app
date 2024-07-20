import React, { useRef, useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import useGoogleMapsApi from '../hooks/useGoogleMapsApi';


const AddressSearch = ({ onPlaceSelect }) => {
  const [address, setAddress] = useState('');
  const searchBoxRef = useRef(null);
  const isLoaded = useGoogleMapsApi();

  const handlePlacesChanged = () => {
    if (!isLoaded) return;
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      setAddress(place.formatted_address);
      onPlaceSelect({ lat: location.lat(), lng: location.lng() });
    }
  };

  return (
    <div>
      <StandaloneSearchBox
        onLoad={ref => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Ingrese una dirección"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default AddressSearch;





