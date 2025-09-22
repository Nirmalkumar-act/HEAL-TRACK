// src/pages/DoctorDashboard.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import api from "../api/api"; // Axios instance
import "../styles/DoctorDashboard.css";

export default function DoctorDashboard() {
  const { bookings, setBookings } = useBooking();
  const [search, setSearch] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings"); // make sure backend endpoint exists
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [setBookings]);

  // Gender icons
  const genderIcon = (gender) => {
    if (gender === "Male") return "♂";
    if (gender === "Female") return "♀";
    if (gender === "Other") return "⚧";
    return "❓";
  };

  // Doctor visit counts
  const doctorVisits = useMemo(() => {
    const counts = {};
    bookings.forEach((b) => {
      counts[b.doctor] = (counts[b.doctor] || 0) + 1;
    });
    return counts;
  }, [bookings]);

  // Search + Filter
  const filteredBookings = bookings.filter((b) => {
    const matchesName = b.name.toLowerCase().includes(search.toLowerCase());
    const matchesDoctor = filterDoctor ? b.doctor === filterDoctor : true;
    return matchesName && matchesDoctor;
  });

  return (
    <div className="doctor-dashboard">
      <h1>👨‍⚕️ Doctor Dashboard</h1>
      <p className="clock">🕒 {time.toLocaleDateString()} | {time.toLocaleTimeString()}</p>

      {/* Summary Cards */}
      <div className="doctor-summary">
        <div className="doctor-card">
          <h3>Total Patients</h3>
          <p>{bookings.length}</p>
        </div>
        <div className="doctor-card">
          <h3>Now Serving</h3>
          <p>{bookings.length > 0 ? bookings[0].name : "None"}</p>
        </div>
        <div className="doctor-card">
          <h3>Doctors Active</h3>
          <p>{Object.keys(doctorVisits).length}</p>
        </div>
      </div>

      {/* Doctor Visit Counts */}
      {Object.keys(doctorVisits).length > 0 && (
        <div className="doctor-visits">
          <h2>📊 Doctor Visit Counts</h2>
          <ul>
            {Object.entries(doctorVisits).map(([doc, count]) => (
              <li key={doc}>
                <b>{doc}</b> → {count} patient{count > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search & Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        >
          <option value="">All Doctors</option>
          {Object.keys(doctorVisits).map((doc) => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filteredBookings.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Condition</th>
              <th>Doctor</th>
              <th>Booking Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b, idx) => (
              <tr key={b.token} className={idx === 0 ? "active-row" : ""}>
                <td>{b.token}</td>
                <td>{b.name}</td>
                <td>{b.age}</td>
                <td className={`gender ${b.gender?.toLowerCase()}`}>
                  {genderIcon(b.gender)} {b.gender}
                </td>
                <td>{b.condition || "N/A"}</td>
                <td>{b.doctor}</td>
                <td>{b.time}</td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
