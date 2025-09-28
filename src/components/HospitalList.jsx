import React from "react";
import "../styles/HospitalList.css";

export default function HospitalList({ hospitals = [], onSelect }) {
  if (!hospitals.length) return <p>No hospitals available</p>;

  return (
    <div className="list">
      {hospitals.map((h) => (
        <div key={h.id} className="card">
          <strong>{h.name}</strong>
          <p>{h.location}</p>
          <p className="small">{h.details}</p>
          <button onClick={() => onSelect(h)}>View Doctors</button>
        </div>
      ))}
    </div>
  );
}
