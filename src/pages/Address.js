
// Address.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Address.css';

const Address = () => {
  const { stateName } = useParams();  // Get state name from URL params
  const [fullAddress, setFullAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Regex for validating "123 Main St, City, 08901"
  const fullAddressRegex = /^[0-9]+\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s[0-9]{5}$/;

  const handleChange = (e) => {
    setFullAddress(e.target.value);
    setError('');
  };

    // DUMMY FUNCTION*****
    const temp = async () => {
        navigate(`/state/${stateName}`, { state: { address: '123 Main St, City, 08901', lat: 40.7128, lng: -74.0060 } });
    }

  const handleSearch = async () => {
    // Validate the full address format
    if (!fullAddressRegex.test(fullAddress)) {
      setError('Please enter a valid address (e.g., "123 Main St, City, 08901").');
      return;
    }

    // Concatenate the state name with the entered address
    const completeAddress = `${fullAddress}, ${stateName}`;

    try {
      // Use the geocoding API to validate the complete address
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        completeAddress
      )}&key=YOUR_GOOGLE_MAPS_API_KEY`;

      const response = await axios.get(geocodeUrl);
      console.log('Geocode API Response:', response.data);

      if (response.data.status !== 'OK') {
        setError('Failed to verify address. Please enter a valid address.');
        return;
      }

      const location = response.data.results[0].geometry.location;

      // Navigate to State.js with geocoded address details
      navigate(`/state/${stateName}`, { state: { address: completeAddress, lat: location.lat, lng: location.lng } });
    } catch (error) {
      console.error('Error during geocoding:', error);
      setError('Failed to validate address. Please try again.');
    }
  };

  return (
    <div className="address-container">
      <h1>Enter Your Address in {stateName}</h1>
      
      <input
        type="text"
        value={fullAddress}
        onChange={handleChange}
        placeholder="123 Main St, City, 08901"
        className="address-input"
      />

      {error && <p className="error-message">{error}</p>}
      
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {/* Temporary button to navigate to State.js directly */}
      <button onClick={temp} className="temp-button">
        Go to State Page (Temporary)
      </button>


    </div>
  );
};

export default Address;
