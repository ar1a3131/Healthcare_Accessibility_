// Dropdown.js
// NOT IN USE
import React from 'react';

const Dropdown = ({ label, options, value, onChange, placeholder }) => {
  return (
    <div style={{ margin: '20px' }}>
      <label style={{ marginBottom: '10px', display: 'block' }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '200px',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;