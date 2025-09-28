import React, { useEffect, useState } from "react";
import "../styles/Emergency.css";

const Emergency = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [nearestHospital, setNearestHospital] = useState(null);
  const [time, setTime] = useState(new Date());

  const mockHospitals = [
    // All hospitals list
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
      doctor: "Dr. Vinoth",
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
      name: "SKS Hospital",
      location: "Salem",
      specialization: "General Medicine",
      doctor: "Dr. Karthik R",
      contact: "0427-555111",
      rating: 4.2,
      distance: "5.0 km",
    },
    {
      id: 10,
      name: "SKS Hospital",
      location: "Salem",
      specialization: "Cardiology",
      doctor: "Dr. Ravi Kumar",
      contact: "0427-555111",
      rating: 4.2,
      distance: "5.0 km",
    },
    {
      id: 11,
      name: "SKS Hospital",
      location: "Salem",
      specialization: "ENT Specialist Centre",
      doctor: "Dr. Karthika",
      contact: "0427-555111",
      rating: 4.2,
      distance: "5.0 km",
    },
    {
      id: 12,
      name: "SKS Hospital",
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
      specialization: "Cardiology",
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
      doctor: "Dr. Kishore",
      contact: "0427-666444",
      rating: 4.1,
      distance: "2.8 km",
    },
    // Add rest of hospitals here in the same format
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(pos.coords),
        (err) => console.error(err)
      );
    }
    setHospitals(mockHospitals);
    setNearestHospital(mockHospitals[0]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const emergencyCall = (phone) => {
    if (phone) window.location.href = `tel:${phone}`;
    else alert("Phone number not available.");
  };

  const shareLocation = () => {
    if (location) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      const whatsapp = `https://wa.me/?text=🚨 Emergency! My location: ${url}`;
      window.open(whatsapp, "_blank");
    } else {
      alert("Location not available yet.");
    }
  };

  // Filter hospitals only if search term entered
  const displayedHospitals = search
    ? hospitals.filter((h) =>
        h.name.toLowerCase().includes(search.toLowerCase())
      )
    : hospitals;

  return (
    <div className="emergency-container">
      <h1>🚨 Emergency Assistance</h1>
      <p className="live-clock">🕒 {time.toLocaleTimeString()}</p>

      {location ? (
        <p>
          📍 Your location: Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      ) : (
        <p>Fetching your location...</p>
      )}

      <input
        type="text"
        placeholder="🔍 Search hospital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <h2>🏥 Nearby Hospitals</h2>
      <ul>
        {displayedHospitals.map((h) => (
          <li
            key={h.id}
            className={nearestHospital?.name === h.name ? "highlight" : ""}
          >
            <h3>{h.name}</h3>
            <p>Specialization: {h.specialization}</p>
            <p>Doctor: {h.doctor}</p>
            <p>Distance: {h.distance}</p>
            <p>Phone: {h.contact}</p>
            <button className="call-btn" onClick={() => emergencyCall(h.contact)}>
              📞 Call
            </button>
            <button
              className="directions-btn"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${h.name}`,
                  "_blank"
                )
              }
            >
              🗺 Get Directions
            </button>
          </li>
        ))}
      </ul>

      <div className="emergency-numbers">
        <h2>⚡ Quick Emergency Numbers</h2>
        <div className="quick-buttons">
          <button onClick={() => (window.location.href = "tel:108")}>
            🚑 Ambulance (108)
          </button>
          <button onClick={() => (window.location.href = "tel:100")}>
            👮 Police (100)
          </button>
          <button onClick={() => (window.location.href = "tel:101")}>
            🔥 Fire (101)
          </button>
        </div>
      </div>

      <div className="share-location">
        <button onClick={shareLocation}>📤 Share My Location</button>
      </div>

      <div className="sos-container">
        <button className="sos-button" onClick={() => (window.location.href = "tel:112")}>
          🚨 SOS Emergency
        </button>
      </div>

      <div className="emergency-tips">
        <h2>🩺 Emergency First Aid Tips</h2>
        <ul>
          <li>
            <strong>CPR:</strong> Push hard and fast in the center of the chest.
          </li>
          <li>
            <strong>Bleeding:</strong> Apply firm pressure with a clean cloth.
          </li>
          <li>
            <strong>Burns:</strong> Rinse under cool running water for 10 mins.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Emergency;
