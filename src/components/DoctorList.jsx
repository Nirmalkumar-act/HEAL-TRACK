import React from "react";
import "../styles/DoctorList.css";

export default function DoctorList({ doctors = [] }) {
  if (!doctors.length) return <p>No doctors available</p>;

  return (
    <div className="list">
      {doctors.map((d) => (
        <div key={d.id} className="card">
          <strong>{d.name}</strong> – {d.specialization}
          <p className="small">Available: {d.availability}</p>
        </div>
      ))}
    </div>
  );
}
