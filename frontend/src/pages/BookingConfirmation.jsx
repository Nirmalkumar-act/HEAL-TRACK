import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookingConfirmation.css";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="confirmation-wrapper">
        <h1>⚠️ No Booking Found</h1>
        <button className="btn primary" onClick={() => navigate("/booking")}>
          ← Back to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-wrapper">
      <h1>✅ Booking Confirmed!</h1>

      <div className="confirmation-card">
        {/* Left: Photo + QR Code */}
        <div className="confirmation-left">
          <img
            src="https://via.placeholder.com/120x140?text=Patient"
            alt="Patient"
            className="patient-photo"
          />
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${booking.token}`}
            alt="QR Code"
            className="qr-code"
          />
        </div>

        {/* Right: Allocated Details (Non-editable card style) */}
        <div className="confirmation-right">
          <div className="allocated-card">
            <p><b>Name:</b> {booking.name}</p>
            <p><b>Age:</b> {booking.age}</p>
            <p><b>Gender:</b> {booking.gender}</p>
            <p><b>Condition:</b> {booking.condition}</p>
            <p><b>Doctor:</b> {booking.doctor}</p>
            <p><b>Token Number:</b> {booking.token}</p>
            <p><b>Date:</b> {booking.date}</p>
            <p><b>Time:</b> {booking.time}</p>
            <p><b>Hospital:</b> {booking.hospital}</p>
          </div>

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
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="btn primary" onClick={() => navigate("/waiting")}>
          📋 View Waiting Room
        </button>
        <button className="btn secondary" onClick={() => navigate("/dashboard")}>
          🩺 Go to Doctor Dashboard
        </button>
        <button className="btn secondary" onClick={() => navigate("/booking")}>
          ➕ Book Another Patient
        </button>
      </div>
    </div>
  );
}
