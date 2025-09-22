import React from "react";

export default function ScannerSelector({ value, onChange }) {
  const options = [
    { id: "AADHAAR", label: "Aadhaar" },
    { id: "QR", label: "QR Code" },
    { id: "HOS", label: "Hospital ID" },
    { id: "FINGER", label: "Fingerprint" },
    { id: "FACE", label: "Face" },
  ];
  return (
    <div className="scanner-grid">
      {options.map(o => (
        <button
          key={o.id}
          className={`scan-type ${value === o.id ? "active" : ""}`}
          onClick={() => onChange(o.id)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
