import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "../styles/Booking.css";

export default function BookingForm() {
  const nav = useNavigate();
  const { state } = useLocation(); // comes from BookingOptions
  const { addBooking } = useBooking();

  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [doctor, setDoctor] = useState("");
  const [problem, setProblem] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !age || !doctor) {
      alert("Please fill all required fields.");
      return;
    }

    const token = Math.floor(1000 + Math.random() * 9000);
    const bookingTime = new Date().toLocaleTimeString();

    addBooking({
      token,
      name: firstName,
      age,
      weight,
      location: state?.location || "",
      hospital: state?.hospital || "",
      doctor,
      condition: problem,
      notes,
      time: bookingTime,
    });

    alert(`✅ Booking Confirmed!\nToken: ${token}`);
    nav("/dashboard");
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-page">
        <h1 className="booking-title">📝 Enter Token Details</h1>
        <p className="muted">Fill patient information and confirm booking.</p>

        <form className="card form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="input-group">
            <span className="input-icon">🧑</span>
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Age & Weight */}
          <div className="grid2">
            <div className="input-group">
              <span className="input-icon">🎂</span>
              <input
                type="number"
                placeholder="Age"
                min="1"
                max="120"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="input-group">
              <span className="input-icon">⚖️</span>
              <input
                type="number"
                placeholder="Weight (kg)"
                min="1"
                max="500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {/* Location (already chosen) */}
          <div className="input-group">
            <span className="input-icon">📍</span>
            <input type="text" value={state?.location} disabled />
          </div>

          {/* Booking Time (auto) */}
          <div className="input-group">
            <span className="input-icon">⏰</span>
            <input type="text" value={new Date().toLocaleTimeString()} disabled />
          </div>

          {/* Doctor */}
          <div className="input-group">
            <span className="input-icon">👨‍⚕️</span>
            <input
              type="text"
              placeholder="Doctor Name"
              required
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>

          {/* Problem */}
          <div className="input-group">
            <span className="input-icon">❤️</span>
            <input
              type="text"
              placeholder="Problem / Symptoms"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          {/* Notes */}
          <textarea
            className="additional-notes"
            placeholder="Additional Information"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="form-footer">
            <button className="btn secondary" type="button" onClick={() => nav("/booking")}>
              ← Back
            </button>
            <button className="btn primary pulse" type="submit">
              Book → Get Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
