import React, { useState, useEffect } from "react";
import "../styles/Emergency.css";

const Emergency = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [nearestHospital, setNearestHospital] = useState(null);
  const [time, setTime] = useState(new Date());

  const mockHospitals = [
    { name: "City Hospital", phone: "123-456-7890", distance: 2.5 },
    { name: "General Care Center", phone: "234-567-8901", distance: 3.2 },
    { name: "Heart Specialist Clinic", phone: "345-678-9012", distance: 4.1 },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(pos.coords),
        (err) => console.error(err)
      );
    }
    setHospitals(mockHospitals);
    setNearestHospital(mockHospitals[0]); // highlight first as nearest
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const emergencyCall = (phone) => {
    alert(`Calling ${phone}...`);
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

  return (
    <div className="emergency-container">
      <h1>🚨 Emergency Assistance</h1>

      {/* Live Clock */}
      <p className="live-clock">🕒 {time.toLocaleTimeString()}</p>

      {/* Location Info */}
      <div>
        {location ? (
          <p>
            📍 Your location: Latitude {location.latitude}, Longitude {location.longitude}
          </p>
        ) : (
          <p>Fetching your location...</p>
        )}
      </div>

      {/* Search Hospitals */}
      <input
        type="text"
        placeholder="🔍 Search hospital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Nearby Hospitals */}
      <h2>🏥 Nearby Hospitals</h2>
      <ul>
        {hospitals
          .filter((h) => h.name.toLowerCase().includes(search.toLowerCase()))
          .map((h, i) => (
            <li
              key={i}
              className={nearestHospital?.name === h.name ? "highlight" : ""}
            >
              <h3>{h.name}</h3>
              <p>Distance: {h.distance} km</p>
              <p>Phone: {h.phone}</p>
              <button className="call-btn" onClick={() => emergencyCall(h.phone)}>
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

      {/* Quick Emergency Numbers */}
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

      {/* Share Location */}
      <div className="share-location">
        <button onClick={shareLocation}>📤 Share My Location</button>
      </div>

      {/* SOS Button */}
      <div className="sos-container">
        <button
          className="sos-button"
          onClick={() => (window.location.href = "tel:112")}
        >
          🚨 SOS Emergency
        </button>
      </div>

      {/* First Aid Tips */}
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
