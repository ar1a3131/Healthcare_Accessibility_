import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import './Map.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const Map = () => {
  const navigate = useNavigate();

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;
    navigate(`/address/${stateName}`);
  };

  return (
    <div className="map-container">
      {/* Header Bar */}
      <div className="header-bar">
        <h1 className="header-title">Welcome to the Healthcare Data Directory</h1>
      </div>

      {/* Description Text */}
      <p className="description">
        Click on a state to see more information on healthcare providers in that state and travel/accessibility data for you to get to a provider.
      </p>

      {/* Map Container */}
      <div className="composable-map-container">
        <ComposableMap
          projection="geoAlbersUsa"
          width={1000}
          height={600}
          projectionConfig={{ scale: 800, center: [-74, 40] }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: {
                      fill: geo.properties.name === 'New Jersey' ? '#535364' : '#d4e3f8', // Light gray fill for states
                      outline: 'white', // White border for the states
                      stroke: '#ffffff', // White stroke color
                      strokeWidth: 1, // Border width
                      transition: 'fill 0.3s',
                    },
                    hover: {
                      fill: '#4485df', // Dark blue on hover
                      stroke: '#ffffff', // White border on hover
                      strokeWidth: 1, // Border width on hover
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#166ded', // Slightly darker blue on press
                      stroke: '#ffffff', // White border on press
                      strokeWidth: 1, // Border width on press
                    },
                  }}
                />

              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map;

