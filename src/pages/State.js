// State.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './State.css';

// JSON data representing New Jersey healthcare providers
const njProviders = [
  {
    "org_id": "NJ01",
    "name": "Hackensack Meridian Health Carrier Clinic",
    "state": "NJ",
    "address": "252 Route 601, Belle Mead, NJ 08502",
    "bio_of_org": "Specializes in mental health and addiction recovery, providing a full continuum of care.",
    "category_of_care": "Mental Health Intervention",
    "contact_info": "(555) 123-4567",
    "Website": "https://carrierclinic.com",
    "insurance": "Aetna, Blue Cross, Medicare",
    "copay_uninsured": "$50",
    "logo_image": "carrier_logo.png",
    "latitude": 40.4675835,
    "longitude": -74.6628114,
    "accessibility": 1
  },
  {
    "org_id": "NJ02",
    "name": "Trinitas Regional Medical Center",
    "state": "NJ",
    "address": "225 Williamson Street, Elizabeth, NJ 07202",
    "bio_of_org": "Known for behavioral health services, including community outreach for mental health.",
    "category_of_care": "Mental Health Intervention",
    "contact_info": "(555) 234-5678",
    "Website": "https://trinitasrmc.org",
    "insurance": "Blue Cross, Medicaid",
    "copay_uninsured": "$40",
    "logo_image": "trinitas_logo.png",
    "latitude": 40.6585683,
    "longitude": -74.2142182,
    "accessibility": null
  },
  {
    "org_id": "NJ03",
    "name": "Kessler Institute for Rehabilitation",
    "state": "NJ",
    "address": "1199 Pleasant Valley Way, West Orange, NJ 07052",
    "bio_of_org": "Offers rehabilitation services with a focus on neurological and mental health recovery.",
    "category_of_care": "Therapy",
    "contact_info": "(555) 345-6789",
    "Website": "https://kessler-rehab.com",
    "insurance": "UnitedHealth, Medicare",
    "copay_uninsured": "$45",
    "logo_image": "kessler_logo.png",
    "latitude": 40.7855586,
    "longitude": -74.277077,
    "accessibility": null
  },
  {
    "org_id": "NJ04",
    "name": "Children's Specialized Hospital",
    "state": "NJ",
    "address": "200 Somerset Street, New Brunswick, NJ 08901",
    "bio_of_org": "Pediatric mental health and rehabilitation services for children with special needs.",
    "category_of_care": "Mental Health Intervention",
    "contact_info": "(555) 456-7890",
    "Website": "https://childrens-specialized.org",
    "insurance": "Medicaid, Aetna",
    "copay_uninsured": "$30",
    "logo_image": "childrens_logo.png",
    "latitude": 40.4948536,
    "longitude": -74.45163,
    "accessibility": null
  },
  {
    "org_id": "NJ05",
    "name": "Deborah Heart and Lung Center",
    "state": "NJ",
    "address": "200 Trenton Road, Browns Mills, NJ 08015",
    "bio_of_org": "A premier center for cardiac and pulmonary therapy.",
    "category_of_care": "Therapy",
    "contact_info": "(555) 567-8901",
    "Website": "https://deborah.org",
    "insurance": "Blue Cross, Medicare",
    "copay_uninsured": "$60",
    "logo_image": "deborah_logo.png",
    "latitude": 39.9775118,
    "longitude": -74.5851859,
    "accessibility": null
  },
  {
    "org_id": "NJ06",
    "name": "Saint Peter's University Hospital",
    "state": "NJ",
    "address": "254 Easton Avenue, New Brunswick, NJ 08901",
    "bio_of_org": "Known for maternal and pediatric therapy services, particularly neonatal care.",
    "category_of_care": "Therapy",
    "contact_info": "(555) 678-9012",
    "Website": "https://saintpetershcs.com",
    "insurance": "Aetna, UnitedHealth",
    "copay_uninsured": "$50",
    "logo_image": "saintpeters_logo.png",
    "latitude": 40.5009888,
    "longitude": -74.4593195,
    "accessibility": null
  },
  {
    "org_id": "NJ07",
    "name": "Hackensack University Medical Center",
    "state": "NJ",
    "address": "30 Prospect Avenue, Hackensack, NJ 07601",
    "bio_of_org": "Provides a range of primary and specialized medical services, including cardiovascular and cancer care.",
    "category_of_care": "Primary Care",
    "contact_info": "(555) 789-0123",
    "Website": "https://hackensackumc.org",
    "insurance": "Aetna, Blue Cross, Medicaid",
    "copay_uninsured": "$55",
    "logo_image": "hackensack_logo.png",
    "latitude": 40.8838604,
    "longitude": -74.0563984,
    "accessibility": null
  },
  {
    "org_id": "NJ08",
    "name": "Jersey Shore University Medical Center",
    "state": "NJ",
    "address": "1945 Route 33, Neptune, NJ 07753",
    "bio_of_org": "Offers comprehensive primary and trauma care.",
    "category_of_care": "Primary Care",
    "contact_info": "(555) 890-1234",
    "Website": "https://jerseyshoreuniversitymc.org",
    "insurance": "UnitedHealth, Blue Cross",
    "copay_uninsured": "$50",
    "logo_image": "jerseyshore_logo.png",
    "latitude": 40.2080848,
    "longitude": -74.0416917,
    "accessibility": null
  },
  {
    "org_id": "NJ09",
    "name": "Morristown Medical Center",
    "state": "NJ",
    "address": "100 Madison Avenue, Morristown, NJ 07960",
    "bio_of_org": "Specializes in cardiology, oncology, and orthopedics.",
    "category_of_care": "Primary Care",
    "contact_info": "(555) 901-2345",
    "Website": "https://atlantichealth.org/morristown",
    "insurance": "Aetna, UnitedHealth, Medicare",
    "copay_uninsured": "$55",
    "logo_image": "morristown_logo.png",
    "latitude": 40.789422,
    "longitude": -74.4658041,
    "accessibility": null
  },
  {
    "org_id": "NJ10",
    "name": "Newark Beth Israel Medical Center",
    "state": "NJ",
    "address": "201 Lyons Avenue, Newark, NJ 07112",
    "bio_of_org": "Provides cardiac and transplant services, serving as a major community hospital.",
    "category_of_care": "Primary Care",
    "contact_info": "(555) 012-3456",
    "Website": "https://newarkbeth.com",
    "insurance": "Blue Cross, Medicare",
    "copay_uninsured": "$40",
    "logo_image": "newarkbeth_logo.png",
    "latitude": 40.7100815,
    "longitude": -74.212337,
    "accessibility": null
  },
  {
    "org_id": "NJ11",
    "name": "Cooper University Hospital",
    "state": "NJ",
    "address": "One Cooper Plaza, Camden, NJ 08103",
    "bio_of_org": "Level I Trauma Center, offers specialized academic medical services.",
    "category_of_care": "Primary Care",
    "contact_info": "(555) 123-4567",
    "Website": "https://cooperhealth.org",
    "insurance": "Aetna, Blue Cross, Medicaid",
    "copay_uninsured": "$60",
    "logo_image": "cooper_logo.png",
    "latitude": 39.9412414,
    "longitude": -75.118606,
    "accessibility": null
  }
]

const State = () => {
  const { stateName } = useParams();  // Get the state name from URL params
  const [category, setCategory] = useState('');
  const [orgData, setOrgData] = useState([]);  // Organization data

  const categories = [
    "Mental Health Intervention",
    "Therapy",
    "Primary Care"
  ];

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Filter the data based on the selected category
    const filteredData = njProviders.filter(org => 
      org.category_of_care === selectedCategory
    );
    setOrgData(filteredData);
  };

  return (
    <div className="state-container">
      <div className="header-bar">
        <h1 className="state-name">{stateName}</h1>
      </div>
      <p>This page displays healthcare information for {stateName}.</p>

      <div className="dropdown">
        <label>Select a Category of Care: </label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Choose a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="org-list">
        {orgData.length > 0 ? (
          orgData.map((org, index) => (
            <div key={index} className="org-card">
              <div className="org-info">
                <h2>{org.name}</h2>
                <p><strong>State:</strong> {org.state}</p>
                <p><strong>Address:</strong> {org.address}</p>
                <p><strong>Background:</strong> {org.bio_of_org}</p>
                <p><strong>Contact:</strong> {org.contact_info}</p>
                <p><strong>Insurance Accepted:</strong> {org.insurance}</p>
                <p><strong>Uninsured Cost:</strong> {org.copay_uninsured}</p>
                <p><strong>Website:</strong> <a href={org.Website} target="_blank" rel="noopener noreferrer">{org.Website}</a></p>
                <p><strong>Travel Difficulty from your Location:</strong> {org.accessibility}</p>
              </div>
              <img src={`${process.env.PUBLIC_URL}/images/${org.logo_image}`} alt={org.name} className="org-logo" />
            </div>
          ))
        ) : (
          <p>No organizations available for the selected category.</p>
        )}
      </div>

      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Back to Map
      </Link>
    </div>
  );
};

export default State;