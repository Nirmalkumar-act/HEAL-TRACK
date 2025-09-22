import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Booking.css";

export default function BookingOptions() {
  const nav = useNavigate();
  const [hospital, setHospital] = useState("");
  const [location, setLocation] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!hospital || !location) {
      alert("Please choose hospital and location.");
      return;
    }

    nav("/booking-form", {
      state: {
        hospital,
        location,
      },
    });
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-page">
        <h1 className="booking-title">🏥 Online Booking</h1>
        <p className="muted">
          Book your token online, choose hospital and location, then continue to
          patient details.
        </p>

        <form className="card form" onSubmit={handleNext}>
          {/* Book Token Option */}
          <div className="input-group">
            <span className="input-icon">🏥</span>
            <input
              type="text"
              placeholder="Enter Hospital Name"
              required
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </div>

          {/* Location (map input for now as text) */}
          <div className="input-group">
            <span className="input-icon">📍</span>
            <input
              type="text"
              placeholder="Choose Location (Map)"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-footer">
            <button className="btn secondary" type="button" onClick={() => nav("/")}>
              ← Cancel
            </button>
            <button className="btn primary pulse" type="submit">
              Next → Enter Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
