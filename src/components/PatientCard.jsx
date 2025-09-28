import React from "react";

export default function PatientCard({ patient }) {
  if (!patient) return null;
  return (
    <div className="patient-card">
      <h3>{patient.name}</h3>
      <div className="grid2">
        <div><b>Age:</b> {patient.age}</div>
        <div><b>ID:</b> {patient.externalId}</div>
        <div><b>Condition:</b> {patient.condition || "—"}</div>
        <div><b>Location:</b> {patient.location || "—"}</div>
      </div>
    </div>
  );
}
