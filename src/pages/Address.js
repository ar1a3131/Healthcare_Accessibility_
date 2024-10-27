// Address.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelectedState } from './SelectedStateContext';
import './Address.css';

const Address = () => {
  const { stateName } = useParams(); // Get state name from URL params
  const [fullAddress, setFullAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { selectedState } = useSelectedState();

  // Improved regex for "123 Main St, City, 08901"
  const fullAddressRegex = /^[0-9]+\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s[0-9]{5}$/;

  const handleChange = (e) => {
    setFullAddress(e.target.value);
    setError('');
  };

  const handleSearch = async () => {
    // Validate the full address format using regex
    if (!fullAddressRegex.test(fullAddress)) {
      setError('Please enter a valid address (e.g., "123 Main St, City").');
      return;
    }

    const completeAddress = `${fullAddress}, ${selectedState}`;

    try {
      // Call AWS Lambda for address validation
      const response = await axios.post(
        'https://sqkuvksmdv3k7eb5wedq25wzpu0zkujy.lambda-url.us-east-2.on.aws/', // Replace with your API Gateway endpoint
        {
            address: completeAddress
        }
      );

      const { lat, lng, message } = response.data;

      // Check if the response is successful
      if (response.status === 200) {
        // Navigate to State.js with geocoded address details
        navigate(`/state/${selectedState}}`, { state: { address: completeAddress, lat, lng } });
      } else {
        setError(message || 'Failed to verify address.');
      }
    } catch (error) {
      console.error('Error during AWS Lambda call:', error);
      setError('Failed to validate address. Please try again.');
    }
  };

  const handleGoToState = () => {
    navigate(`/state/${stateName}`);
  };

  return (
    <div className="address-container">
      <h1>Enter Your Address: {selectedState}</h1>
      <input
        type="text"
        value={fullAddress}
        onChange={handleChange}
        placeholder="123 Main St, City"
        className="address-input"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <button onClick={handleGoToState} className="search-button">
        Go to State Page
      </button>
    </div>
  );
};

export default Address;
