import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "../styles/QRScanner.css";

QrScanner.WORKER_PATH = "/qr-scanner-worker.min.js";

export default function QRScanner() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const nav = useNavigate();
  const { addBooking, doctors } = useBooking();

  const processQR = (qrData) => {
    setScanResult(qrData);

    let parsed;
    try {
      parsed = JSON.parse(qrData);
    } catch {
      parsed = { name: qrData };
    }

    // If doctorname is present in QR, use it; otherwise allow user to select
    const doctorname = parsed.doctorname || selectedDoctor || "";

    const booking = {
      token: "TK" + Date.now().toString().slice(-4),
      hospital: parsed.hospital || "Default Hospital",
      name: parsed.name || "Unknown Patient",
      age: parsed.age || "N/A",
      gender: parsed.gender || "Other",
      location: parsed.location || "Not Provided",
      condition: parsed.condition || "N/A",
      doctorname,
      doctor: doctorname, // for backward compatibility
      notes: parsed.notes || "",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    addBooking(booking);
    nav("/confirmation", { state: { booking } });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraActive(true);
      scannerRef.current = new QrScanner(videoRef.current, processQR);
      scannerRef.current.start();
    } catch {
      setCameraError("⚠️ Camera access denied.");
    }
  };

  const stopCamera = () => {
    scannerRef.current?.stop();
    setCameraActive(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file);
      processQR(result);
    } catch {
      alert("❌ Could not read QR code from image.");
    }
  };

  return (
    <div className="qr-wrapper">
      <h1>📷 QR Scanner</h1>

      {!cameraActive ? (
        <button className="btn primary" onClick={startCamera}>
          ▶️ Start Camera Scan
        </button>
      ) : (
        <div>
          <video ref={videoRef} style={{ width: "100%", borderRadius: "12px" }} />
          <button className="btn secondary" onClick={stopCamera}>
            ⏹ Stop Scan
          </button>
        </div>
      )}

      {cameraError && <p className="error">{cameraError}</p>}

      <div className="upload-section">
        <label className="upload-label">
          📂 Upload QR Image
          <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>

      {/* Select doctor if QR didn't contain doctorname */}
      {!scanResult && (
        <div className="doctor-select">
          <label>
            🩺 Select Doctor:
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">-- Select --</option>
              {Object.keys(doctors).map((doc) => (
                <option key={doc} value={doc}>
                  {doc} {doctors[doc] === false ? "(Not Available)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {scanResult && (
        <p className="scan-result">
          ✅ Last Scanned: <b>{scanResult}</b>
        </p>
      )}
    </div>
  );
}
