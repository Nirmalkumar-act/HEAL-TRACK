import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "../styles/GantradeCard.css";

export default function GantradeCard() {
  const navigate = useNavigate();
  const { bookings } = useBooking();

  // Default patient (first in bookings or blank)
  const defaultPatient = bookings[0] || {};
  const [form, setForm] = useState({
    name: defaultPatient.name || "",
    age: defaultPatient.age || "",
    gender: defaultPatient.gender || "",
    condition: defaultPatient.condition || "",
    cardNo:
      defaultPatient.cardNo || "GNT-" + Math.floor(1000 + Math.random() * 9000),
    token:
      defaultPatient.token || "TK" + Math.floor(1000 + Math.random() * 9000),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update form if bookings change
  useEffect(() => {
    if (bookings.length > 0) {
      const patient = bookings[0];
      setForm({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        condition: patient.condition,
        cardNo: patient.cardNo,
        token: patient.token,
      });
    }
  }, [bookings]);

  // Prepare QR data as JSON
  const qrData = JSON.stringify({
    name: form.name,
    age: form.age,
    gender: form.gender,
    condition: form.condition,
    cardNo: form.cardNo,
    token: form.token,
  });

  // Optional: Save details (replace with backend call)
  const handleSave = () => {
    alert("Patient details stored successfully!");
  };

  return (
    <div className="gantrade-wrapper">
      <h1 className="gantrade-title">💳 Gantrade Health Card</h1>

      <div className="gantrade-container">
        {/* Left: Editable Form */}
        <div className="gantrade-form">
          <h3>Enter Patient Details</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male ♂</option>
            <option value="Female">Female ♀</option>
            <option value="Other">Other ⚧</option>
          </select>
          <input
            name="condition"
            value={form.condition}
            onChange={handleChange}
            placeholder="Condition / Symptoms"
          />
          <input
            name="cardNo"
            value={form.cardNo}
            onChange={handleChange}
            placeholder="Card Number"
          />
          <input
            name="token"
            value={form.token}
            onChange={handleChange}
            placeholder="Token Number"
          />

          <button className="btn primary" onClick={handleSave}>
            💾 Save Details
          </button>
        </div>

        {/* Right: Gantrade Card Preview */}
        <div className="gantrade-card">
          {/* Left: Photo + QR */}
          <div className="gantrade-left">
            <img
              src="https://ociacc.com/wp-content/uploads/2019/03/blank-profile-picture-973460_1280-1030x1030.png"
              alt="Patient"
              className="patient-photo"
            />
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                qrData
              )}`}
              alt="QR Code"
              className="qr-code"
            />
          </div>

          {/* Right: Patient Details */}
          <div className="gantrade-right">
            <p><b>Name:</b> {form.name || "N/A"}</p>
            <p><b>Age:</b> {form.age || "N/A"}</p>
            <p><b>Gender:</b> {form.gender || "Other"}</p>
            <p><b>Condition:</b> {form.condition || "N/A"}</p>
            <p><b>Card No:</b> {form.cardNo}</p>
            <p><b>Token:</b> {form.token}</p>

            <h3>Previous Consultations</h3>
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. Priya</td>
                  <td>Cardiologist</td>
                  <td>2025-06-14</td>
                </tr>
                <tr>
                  <td>Dr. Arjun</td>
                  <td>General Physician</td>
                  <td>2025-07-20</td>
                </tr>
              </tbody>
            </table>

            <div className="gantrade-actions">
              <button
                className="btn primary"
                onClick={() => alert("Scan functionality coming soon!")}
              >
                📷 Scan Gantrade
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="btn back" onClick={() => navigate("/booking")}>
        ⬅ Back to Booking
      </button>
    </div>
  );
}
