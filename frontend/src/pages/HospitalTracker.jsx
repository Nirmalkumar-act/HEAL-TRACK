// src/pages/HospitalTracker.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HospitalTracker.css";

export default function HospitalTracker() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    disease: "",
    age: "",
    location: "",
    specialization: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/nearby", { state: formData });
  };

  return (
    <div className="tracker-container">
      <h1>🏥 Hospital Tracker</h1>
      <p>Enter patient details to find the nearest specialized hospitals</p>

      <form onSubmit={handleSubmit} className="tracker-form">
        {/* Patient Name */}
        <label>Patient Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">♂ Male</option>
          <option value="Female">♀ Female</option>
          <option value="Other">⚧ Other</option>
        </select>

        {/* Disease */}
        <label>Disease / Condition</label>
        <input
          type="text"
          name="disease"
          placeholder="e.g. Heart Attack, Fever"
          value={formData.disease}
          onChange={handleChange}
          required
        />

        {/* Age */}
        <label>Patient Age</label>
        <input
          type="number"
          name="age"
          placeholder="e.g. 45"
          value={formData.age}
          onChange={handleChange}
          required
        />

        {/* Location */}
        <label>Current Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Salem, Tamil Nadu"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Specialization */}
        <label>Required Specialization</label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
        </select>

        <button type="submit" className="find-btn">
          🔍 Find Hospitals
        </button>
      </form>
    </div>
  );
}
