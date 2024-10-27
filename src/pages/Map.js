import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip'; // Updated import
import hackruLogo from './hackru.png';
import './Map.css';



// Add this GitHub logo URL
const githubLogo = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const Map = () => {
  const navigate = useNavigate();
  const [tooltipContent, setTooltipContent] = useState(''); // State for tooltip content

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;
    navigate(`/address/${stateName}`);
  };

  return (
    <div className="map-container">
      {/* Header Bar */}
      <div className="header-bar">
        <h1 className="header-title">Welcome to the National Healthcare Data Directory</h1>
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
          data-tip="" // Tooltip trigger
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { name } = geo.properties;
                    setTooltipContent(name); // Set tooltip content
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(''); // Clear tooltip content
                  }}
                  onClick={() => handleStateClick(geo)}
                  style={{
                    default: {
                      fill: geo.properties.name === 'New Jersey' ? '#4485df' : '#B4B4B7',
                      outline: 'white',
                      stroke: 'white', // Highlight borders
                      strokeWidth: 0.5,
                      transition: 'fill 0.3s',
                    },
                    hover: {
                      fill: '#d4e3f8',
                      outline: 'white',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#166ded',
                      outline: 'white',
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
        {/* Tooltip component */}
        {tooltipContent && (
          <Tooltip className="state-tooltip" content={tooltipContent} />
        )}
      </div>
      <div className="github_box">
      <p className="github-info">
        For now, we have highlighted the state of New Jersey, as we have initialized the project by using datasets from NJTransit for HackRU.
      </p>
      <div className="logo-links">
        {/* GitHub Link */}
        <a 
          href="https://github.com/ar1a3131/Healthcare_Accessibility_/tree/master"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
        </a>
        {/* HackRU Link */}
        <a 
          href="https://www.hackru.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hackru-link"
        >
          <img src={hackruLogo} alt="HackRU Logo" className="hackru-logo" />
        </a>
      </div>
    </div>



    </div>
  );
};

export default Map;

