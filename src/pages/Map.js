// Map.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import './Map.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const Map = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;

    // Set the transition state and start the fade/zoom effect
    setIsTransitioning(true);

    // Delay the navigation to allow the transition effect to complete
    setTimeout(() => {
      navigate(`/address/${stateName}`);
    }, 500);  // Adjust this duration to match your CSS transition time
  };

  return (
    <div className={`map-container ${isTransitioning ? 'fade-zoom' : ''}`}>
      <div className="header-container">
        <h1>Welcome to the Healthcare Data Directory</h1>
      </div>
      <p>Click on a state to see more information on healthcare providers in that state 
          and travel/accessibility data for you to get to a provider.
        </p>

      <ComposableMap 
        projection="geoAlbersUsa" 
        width={1000} 
        height={600} 
        projectionConfig={{ scale: 1100 }}  // Reduced scale for zoom out
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isNewJersey = geo.properties.name === "New Jersey";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: {
                      fill: isNewJersey ? '#031ac0' : '#8b99ff',  // Highlight NJ
                      outline: 'none',
                      transition: 'fill 0.3s',
                    },
                    hover: {
                      fill: '#031ac0',
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#00041d',
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
