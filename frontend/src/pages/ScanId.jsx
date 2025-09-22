import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ScanId.css";


export default function ScanId() {
  const { state } = useLocation(); // from Booking
  const nav = useNavigate();
  const [externalId, setExternalId] = useState("");

  const handleScan = async () => {
    // Simulate device scan → returns an externalId for demo
    const id = await simulateScan(state?.scanType);
    setExternalId(id);
  };

  const handleFetch = async () => {
    const res = await getPatientByExternalId(externalId);
    nav("/review", { state: { ...state, patient: res.data } });
  };

  return (
    <div className="page">
      <h1>Scan / Detect ID</h1>
      <div className="card">
        <p><b>Selected method:</b> {state?.scanType}</p>

        <div className="scan-row">
          <button className="btn" onClick={handleScan}>🔍 Start Scan</button>
          <input placeholder="or enter ID manually"
                 value={externalId}
                 onChange={e => setExternalId(e.target.value)} />
          <button className="btn primary" disabled={!externalId} onClick={handleFetch}>
            Fetch Details →
          </button>
        </div>
        <p className="muted">For demo we simulate scanning and pre-fill an ID.</p>
      </div>
    </div>
  );
}
