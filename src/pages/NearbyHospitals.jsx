// src/pages/NearbyHospitals.jsx
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/NearbyHospitals.css";

// Expanded hospital data with doctors
const hospitals = [
  // --- Salem Hospitals ---
    {
    id: 1,
    name: "Apollo Hospital",
    location: "Salem",
    specialization: "Cardiology",
    doctor: "Dr. Arjun Kumar",
    contact: "0427-123456",
    rating: 4.5,
    distance: "3.2 km",
  },
  {
    id: 2,
    name: "Apollo Hospital",
    location: "Salem",
    specialization: "General Physician",
    doctor: "Dr. vinoth",
    contact: "0427-123456",
    rating: 4.5,
    distance: "3.2 km",
  },
  {
    id: 3,
    name: "Apollo Hospital",
    location: "Salem",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Mohan",
    contact: "0427-123456",
    rating: 4.5,
    distance: "3.2 km",
  },
  {
    id: 4,
    name: "Apollo Hospital",
    location: "Salem",
    specialization: "Pulmonologist",
    doctor: "Dr. Ramya",
    contact: "0427-123456",
    rating: 4.5,
    distance: "3.2 km",
  },
  {
    id: 5,
    name: "Government Hospital Salem",
    location: "Salem",
    specialization: "Pulmonologist",
    doctor: "Dr. Radha",
    contact: "0427-222333",
    rating: 4.0,
    distance: "4.1 km",
  },
  {
  id: 6,
    name: "Government Hospital Salem",
    location: "Salem",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Natesan",
    contact: "0427-222333",
    rating: 4.0,
    distance: "4.1 km",
  },
   {
  id: 7,
    name: "Government Hospital Salem",
    location: "Salem",
    specialization: "Cardiology",
    doctor: "Dr. Siva",
    contact: "0427-222333",
    rating: 4.0,
    distance: "4.1 km",
  },
   {
  id: 8,
    name: "Government Hospital Salem",
    location: "Salem",
    specialization: "General Physician",
    doctor: "Dr. Prasanth",
    contact: "0427-222333",
    rating: 4.0,
    distance: "4.1 km",
  },
  {
    id: 9,
    name: "SKS hospital",
    location: "Salem",
    specialization: "General Medicine",
    doctor: "Dr. Karthik R",
    contact: "0427-555111",
    rating: 4.2,
    distance: "5.0 km",
  },
   {
    id: 10,
    name: "SKS hospital",
    location: "Salem",
    specialization: "cardiology",
    doctor: "Dr. Ravi kumar",
    contact: "0427-555111",
    rating: 4.2,
    distance: "5.0 km",
  },
   {
    id: 11,
    name: "SKS hospital",
    location: "Salem",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Karthika",
    contact: "0427-555111",
    rating: 4.2,
    distance: "5.0 km",
  },
   {
    id: 12,
    name: "SKS hospital",
    location: "Salem",
    specialization: "Pulmonologist",
    doctor: "Dr. Tamil",
    contact: "0427-555111",
    rating: 4.2,
    distance: "5.0 km",
  },
  {
    id: 13,
    name: "SPMM",
    location: "Salem",
    specialization: "cardiology",
    doctor: "Dr. Meena L",
    contact: "0427-666444",
    rating: 4.1,
    distance: "2.8 km",
  },
  {
    id: 14,
    name: "SPMM",
    location: "Salem",
    specialization: "Pulmonologist",
    doctor: "Dr. Madhu",
    contact: "0427-666444",
    rating: 4.1,
    distance: "2.8 km",
  },
  {
    id: 15,
    name: "SPMM",
    location: "Salem",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Kani",
    contact: "0427-666444",
    rating: 4.1,
    distance: "2.8 km",
  },
  {
    id: 16,
    name: "SPMM",
    location: "Salem",
    specialization: "General Physician",
    doctor: "Dr. kishore",
    contact: "0427-666444",
    rating: 4.1,
    distance: "2.8 km",
  },

  // Coimbatore Hospitals
  {
    id: 17,
    name: "KMCH",
    location: "Coimbatore",
    specialization: "General physician",
    doctor: "Dr. Nithin Raj",
    contact: "0422-654321",
    rating: 4.0,
    distance: "5.8 km",
  },
   {
    id: 18,
    name: "KMCH",
    location: "Coimbatore",
    specialization: "cardiology",
    doctor: "Dr. Abi",
    contact: "0422-654321",
    rating: 4.0,
    distance: "5.8 km",
  },
   {
    id: 19,
    name: "KMCH",
    location: "Coimbatore",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Varshini",
    contact: "0422-654321",
    rating: 4.0,
    distance: "5.8 km",
  },
   {
    id: 20,
    name: "KMCH",
    location: "Coimbatore",
    specialization: "pulmonologist",
    doctor: "Dr. Manoj",
    contact: "0422-654321",
    rating: 4.0,
    distance: "5.8 km",
  },
  {
    id: 21,
    name: "PSG Hospital",
    location: "Coimbatore",
    specialization: "Pulmonologist",
    doctor: "Dr. Sanjay Kumar",
    contact: "0422-987654",
    rating: 4.3,
    distance: "3.9 km",
  },
   {
    id: 22,
    name: "PSG Hospital",
    location: "Coimbatore",
    specialization: "General Physician",
    doctor: "Dr. Kumar",
    contact: "0422-987654",
    rating: 4.3,
    distance: "3.9 km",
  },
   {
    id: 23,
    name: "PSG Hospital",
    location: "Coimbatore",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Renu",
    contact: "0422-987654",
    rating: 4.3,
    distance: "3.9 km",
  },
   {
    id: 24,
    name: "PSG Hospital",
    location: "Coimbatore",
    specialization: "Cardiology",
    doctor: "Dr. Dharshini",
    contact: "0422-987654",
    rating: 4.3,
    distance: "3.9 km",
  },
  {
    id: 25,
    name: "Ganga Hospital",
    location: "Coimbatore",
    specialization: "Cardiology",
    doctor: "Dr. Deepak M",
    contact: "0422-888999",
    rating: 4.6,
    distance: "6.2 km",
  },
  {
    id: 26,
    name: "Ganga Hospital",
    location: "Coimbatore",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. sana",
    contact: "0422-888999",
    rating: 4.6,
    distance: "6.2 km",
  },
  {
    id: 27,
    name: "Ganga Hospital",
    location: "Coimbatore",
    specialization: "General Physician",
    doctor: "Dr. Naveen",
    contact: "0422-888999",
    rating: 4.6,
    distance: "6.2 km",
  },
  {
    id: 28,
    name: "Ganga Hospital",
    location: "Coimbatore",
    specialization: "Pulmonologist",
    doctor: "Dr. Madhi",
    contact: "0422-888999",
    rating: 4.6,
    distance: "6.2 km",
  },
  {
    id: 29,
    name: "Kongunad Hospital",
    location: "Coimbatore",
    specialization: "ENT",
    doctor: "Dr. Lakshmi N",
    contact: "0422-555777",
    rating: 4.1,
    distance: "2.5 km",
  },
  {
    id: 30,
    name: "Kongunad Hospital",
    location: "Coimbatore",
    specialization: "cardiology",
    doctor: "Dr. Teju",
    contact: "0422-555777",
    rating: 4.1,
    distance: "2.5 km",
  },
  {
    id: 31,
    name: "Kongunad Hospital",
    location: "Coimbatore",
    specialization: "pulmonologist",
    doctor: "Dr. Vaishnavi K",
    contact: "0422-555777",
    rating: 4.1,
    distance: "2.5 km",
  },{
    id: 32,
    name: "Kongunad Hospital",
    location: "Coimbatore",
    specialization: "General Physician",
    doctor: "Dr. Prabha",
    contact: "0422-555777",
    rating: 4.1,
    distance: "2.5 km",
  },

  // Chennai Hospitals
  {
    id: 33,
    name: "MIOT Hospital",
    location: "Chennai",
    specialization: "Multi-specialty",
    doctor: "Dr. Rajesh K",
    contact: "044-789012",
    rating: 4.7,
    distance: "7.1 km",
  },
  {
    id: 34,
    name: "MIOT Hospital",
    location: "Chennai",
    specialization: "cardiology",
    doctor: "Dr. Raj K",
    contact: "044-789012",
    rating: 4.7,
    distance: "7.1 km",
  },
  {
    id: 35,
    name: "MIOT Hospital",
    location: "Chennai",
    specialization: "pulmonologist",
    doctor: "Dr. Mahilini",
    contact: "044-789012",
    rating: 4.7,
    distance: "7.1 km",
  },
  {
    id: 36,
    name: "MIOT Hospital",
    location: "Chennai",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Krishna",
    contact: "044-789012",
    rating: 4.7,
    distance: "7.1 km",
  },
  {
    id: 37,
    name: "SIMS",
    location: "Chennai",
    specialization: "Pulmonologist",
    doctor: "Dr. Anitha G",
    contact: "044-222333",
    rating: 4.5,
    distance: "3.4 km",
  },
  {
    id: 38,
    name: "SIMS",
    location: "Chennai",
    specialization: "General Physician",
    doctor: "Dr. Gopi",
    contact: "044-222333",
    rating: 4.5,
    distance: "3.4 km",
  },
  {
    id: 39,
    name: "SIMS",
    location: "Chennai",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Guru",
    contact: "044-222333",
    rating: 4.5,
    distance: "3.4 km",
  },
  {
    id: 40,
    name: "SIMS",
    location: "Chennai",
    specialization: "Cardiology",
    doctor: "Dr. Kamal",
    contact: "044-222333",
    rating: 4.5,
    distance: "3.4 km",
  },
  {
    id: 41,
    name: "Kauvery Hospital",
    location: "Chennai",
    specialization: "General Physician",
    doctor: "Dr. Vignesh P",
    contact: "044-666555",
    rating: 4.4,
    distance: "4.9 km",
  },
   {
    id: 42,
    name: "Kauvery Hospital",
    location: "Chennai",
    specialization: "Cardiology",
    doctor: "Dr. Vimala P",
    contact: "044-666555",
    rating: 4.4,
    distance: "4.9 km",
  },
   {
    id: 43,
    name: "Kauvery Hospital",
    location: "Chennai",
    specialization: "pulmonologist",
    doctor: "Dr. Harrini",
    contact: "044-666555",
    rating: 4.4,
    distance: "4.9 km",
  },
   {
    id: 44,
    name: "Kauvery Hospital",
    location: "Chennai",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Maha",
    contact: "044-666555",
    rating: 4.4,
    distance: "4.9 km",
  },
  {
    id: 45,
    name: "MGM Hospital",
    location: "Chennai",
    specialization: "Pulmonologist",
    doctor: "Dr. Sridharan M",
    contact: "044-111222",
    rating: 4.3,
    distance: "6.0 km",
  },
   {
    id: 46,
    name: "MGM Hospital",
    location: "Chennai",
    specialization: "Cardiology",
    doctor: "Dr. Saran",
    contact: "044-111222",
    rating: 4.3,
    distance: "6.0 km",
  },
   {
    id: 47,
    name: "MGM Hospital",
    location: "Chennai",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Manju",
    contact: "044-111222",
    rating: 4.3,
    distance: "6.0 km",
  },
   {
    id: 48,
    name: "MGM Hospital",
    location: "Chennai",
    specialization: "General Physician",
    doctor: "Dr. Sri M",
    contact: "044-111222",
    rating: 4.3,
    distance: "6.0 km",
  },

  // Omalur Hospitals
  {
    id: 49,
    name: "Omalur Government Hospital",
    location: "Omalur",
    specialization: "General Physician",
    doctor: "Dr. Gayathri K",
    contact: "0427-444888",
    rating: 3.9,
    distance: "2.0 km",
  },
  {
    id: 50,
    name: "Omalur Government Hospital",
    location: "Omalur",
    specialization: "cardiology",
    doctor: "Dr. Guna",
    contact: "0427-444888",
    rating: 3.9,
    distance: "2.0 km",
  },
  {
    id: 51,
    name: "Omalur Government Hospital",
    location: "Omalur",
    specialization: "Pulmonologist",
    doctor: "Dr. Ganga",
    contact: "0427-444888",
    rating: 3.9,
    distance: "2.0 km",
  },
  {
    id:52,
    name: "Omalur Government Hospital",
    location: "Omalur",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Ram",
    contact: "0427-444888",
    rating: 3.9,
    distance: "2.0 km",
  },
  {
    id: 53,
    name: "Amurthalingam Hospital",
    location: "Omalur",
    specialization: "Pulmonologist",
    doctor: "Dr. Harish V",
    contact: "0427-333999",
    rating: 4.2,
    distance: "3.1 km",
  },
  {
    id: 54,
    name: "Amurthalingam Hospital",
    location: "Omalur",
    specialization: "cardiology",
    doctor: "Dr. Vishnu",
    contact: "0427-333999",
    rating: 4.2,
    distance: "3.1 km",
  },
   {
    id: 55,
    name: "Amurthalingam Hospital",
    location: "Omalur",
    specialization: "General Physician",
    doctor: "Dr. Sandhiya",
    contact: "0427-333999",
    rating: 4.2,
    distance: "3.1 km",
  },
   {
    id: 56,
    name: "Amurthalingam Hospital",
    location: "Omalur",
    specialization: "ENT Specialist Centre",
    doctor: "Dr.Nirmal",
    contact: "0427-333999",
    rating: 4.2,
    distance: "3.1 km",
  },
  {
    id: 15,
    name: "Sri Sugam Hospital",
    location: "Omalur",
    specialization: "cardiology",
    doctor: "Dr. Rekha D",
    contact: "0427-222555",
    rating: 4.0,
    distance: "2.5 km",
  },
  {
    id: 15,
    name: "Sri Sugam Hospital",
    location: "Omalur",
    specialization: "ENT Specialist Centre",
    doctor: "Dr. Nithya",
    contact: "0427-222555",
    rating: 4.0,
    distance: "2.5 km",
  },
  {
    id: 15,
    name: "Sri Sugam Hospital",
    location: "Omalur",
    specialization: "General Physician",
    doctor: "Dr. Dhanu",
    contact: "0427-222555",
    rating: 4.0,
    distance: "2.5 km",
  },
  {
    id: 15,
    name: "Sri Sugam Hospital",
    location: "Omalur",
    specialization: "Pulmonologist",
    doctor: "Dr. Janani",
    contact: "0427-222555",
    rating: 4.0,
    distance: "2.5 km",
  },

  // Erode Hospitals
  {
    id: 16,
    name: "Erode GH",
    location: "Erode",
    specialization: "General Physician",
    doctor: "Dr. Suresh A",
    contact: "0424-111222",
    rating: 4.1,
    distance: "3.6 km",
  },
  {
    id: 17,
    name: "Sudha Hospitals",
    location: "Erode",
    specialization: "Pediatrician",
    doctor: "Dr. Divya S",
    contact: "0424-999888",
    rating: 4.3,
    distance: "4.4 km",
  },
  {
    id: 18,
    name: "Erode Chest Care",
    location: "Erode",
    specialization: "Pulmonologist",
    doctor: "Dr. Manoj Kumar",
    contact: "0424-555444",
    rating: 4.2,
    distance: "5.1 km",
  },
  {
    id: 19,
    name: "ENT Erode Clinic",
    location: "Erode",
    specialization: "ENT",
    doctor: "Dr. Kavitha R",
    contact: "0424-666777",
    rating: 4.0,
    distance: "2.9 km",
  },
];

// Map diseases to relevant specializations
const diseaseToSpecialization = {
  "heart attack": "cardiology",
  "heart problem": "cardiology",
  "chest pain": "cardiology",
  "asthma": "pulmonologist",
  "breathing problem": "pulmonologist",
  "lung issue": "pulmonologist",
  "ear pain": "ent",
  "ear problem": "ent",
  "throat infection": "ent",
  "fever": "general physician",
  "cough": "general physician",
  "children": "pediatrician",
  "multi": "multi-specialty",
};

// Normalize helper
const normalize = (str) => str?.toLowerCase().trim();

export default function NearbyHospitals() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Filter hospitals by location and disease specialization
  const filteredHospitals = useMemo(() => {
    let result = hospitals;

    // Filter by location
    if (state?.location) {
      result = result.filter((h) =>
        normalize(h.location).includes(normalize(state.location))
      );
    }

    // Filter by disease -> specialization
    if (state?.disease) {
      const specialization = diseaseToSpecialization[normalize(state.disease)];
      if (specialization) {
        result = result.filter((h) =>
          normalize(h.specialization).includes(specialization)
        );
      }
    }

    return result;
  }, [state?.location, state?.disease]);

  return (
    <div className="results-container">
      <h1>🏥 Nearby Hospitals</h1>
      <p>
        Showing results for <b>{state?.disease || "Any Condition"}</b> in{" "}
        <b>{state?.location || "Selected Area"}</b> (Age: {state?.age || "N/A"})
      </p>

      {filteredHospitals.length === 0 ? (
        <p className="no-results">
          ❌ No hospitals found in <b>{state?.location}</b> for condition:{" "}
          <b>{state?.disease}</b>.
        </p>
      ) : (
        <div className="hospital-list">
          {filteredHospitals.map((h) => (
            <div key={h.id} className="hospital-card">
              <h2>{h.name}</h2>
              <p><b>Location:</b> {h.location}</p>
              <p><b>Specialization:</b> {h.specialization}</p>
              <p><b>Doctor:</b> {h.doctor}</p>
              <p><b>Distance:</b> {h.distance}</p>
              <p>
                <b>Rating:</b> {"⭐".repeat(Math.round(h.rating))} ({h.rating})
              </p>
              <p><b>Contact:</b> {h.contact}</p>
              <div className="hospital-actions">
                <a href={`tel:${h.contact}`} className="contact-btn">📞 Call</a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${h.name} ${h.location}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  🗺 View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate("/hospitals")} className="back-btn">
        ⬅ Back
      </button>
    </div>
  );
}
