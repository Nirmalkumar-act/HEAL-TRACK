// src/pages/WaitingDisplay.jsx
import React, { useEffect, useState, useRef } from "react";
import { useBooking } from "../context/BookingContext";
import "../styles/WaitingDisplay.css";

export default function WaitingDisplay() {
  const { bookings, nextPatient, clearQueue, doctors } = useBooking();
  const [time, setTime] = useState(new Date());
  const [popup, setPopup] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const genderIcon = (gender) => {
    if (gender === "Male") return "♂";
    if (gender === "Female") return "♀";
    if (gender === "Other") return "⚧";
    return "❓";
  };

  const handleNext = () => {
    if (bookings.length > 0) {
      const current = bookings[0];

      // Block if doctor is unavailable
      if (doctors[current.doctor] === false) {
        alert(`⚠️ Doctor ${current.doctor} is not available!`);
        return;
      }

      nextPatient();
      if (bookings[1]) {
        setPopup(`✅ ${current.name} finished. Next: ${bookings[1].name}`);
        if (audioRef.current) audioRef.current.play();
      } else {
        setPopup(`✅ ${current.name} finished. No more patients.`);
      }
      setTimeout(() => setPopup(null), 4000);
    }
  };

  const nowServingRef = useRef(null);
  useEffect(() => {
    if (nowServingRef.current) {
      nowServingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bookings]);

  return (
    <div className="waiting-display">
      <h1>⏳ Waiting Room Display</h1>
      <p className="clock">{time.toLocaleDateString()} | {time.toLocaleTimeString()}</p>
      <p className="waiting-count">👥 {bookings.length} patient(s) in queue</p>

      {bookings.length === 0 ? (
        <p className="empty">🎉 No patients waiting</p>
      ) : (
        <>
          <div className="now-serving-card" ref={nowServingRef}>
            <h2>👩‍⚕️ Now Serving</h2>
            <p><b>Token:</b> {bookings[0].token}</p>
            <p><b>Name:</b> {bookings[0].name} ({bookings[0].age} yrs, {genderIcon(bookings[0].gender)})</p>
            <p><b>Doctor:</b> {bookings[0].doctor} {doctors[bookings[0].doctor] === false && "(Not Available)"}</p>
            <p><b>Problem:</b> {bookings[0].condition || "N/A"}</p>
            <button className="btn primary" onClick={handleNext}>
              ✅ Finish & Call Next
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient</th>
                <th>Gender</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>ETA</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr key={b.token} className={idx === 0 ? "active-row" : ""}>
                  <td>{b.token}</td>
                  <td>{b.name} ({b.age} yrs)</td>
                  <td className={`gender ${b.gender?.toLowerCase()}`}>{genderIcon(b.gender)} {b.gender}</td>
                  <td className={doctors[b.doctor] === false ? "not-available" : ""}>
                    {b.doctor} {doctors[b.doctor] === false && "(Not Available)"}
                  </td>
                  <td>{idx === 0 ? "Now Serving" : "Waiting"}</td>
                  <td>{idx === 0 ? "Ongoing" : `${idx * 10} min`}</td>
                  <td>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="queue-controls">
            <button className="btn danger" onClick={clearQueue}>🗑 Clear All Queue</button>
          </div>
        </>
      )}

      {popup && <div className="popup">{popup}</div>}
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />
    </div>
  );
}
