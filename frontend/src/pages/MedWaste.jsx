import React, { useState, useEffect } from "react";
import "../styles/MedWaste.css";
import { motion } from "framer-motion";
import {
  Trash2,
  Bell,
  Activity,
  Flame,
  Clock,
  Zap,
  Calendar,
} from "lucide-react";

export default function MedWaste() {
  // Waste data
  const [plasticWaste, setPlasticWaste] = useState(15); // Example: 15 kg plastic waste
  const [currentWaste, setCurrentWaste] = useState(60); // total waste in bin
  const binCapacity = 100; // max capacity of bin
  const conversionFactor = 3.5; // 1 kg plastic ≈ 3.5 kWh
  const electricityProduced = plasticWaste * conversionFactor;

  // Notifications
  const [notifications, setNotifications] = useState([
    { type: "success", message: "✅ System initialized successfully." },
  ]);

  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  // Yesterday history (static mock)
  const yesterdayHistory = {
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    wasteProcessed: "50 kg",
    plasticWaste: 40,
    electricity: 38 * conversionFactor + " kWh",
  };

  // Categories
  const categories = [
    { type: "Infectious", qty: "10 kg", color: "infectious" },
    { type: "Sharps", qty: "5 kg", color: "sharps" },
    { type: "Pathological", qty: "10 kg", color: "pathological" },
    { type: "General", qty: "10 kg", color: "general" },
    { type: "Plastic", qty: `25 kg`, color: "plastic" },
  ];

  // Circular progress calculation
  const wastePercentage = (currentWaste / binCapacity) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (wastePercentage / 100) * circumference;

  // Handle disposal cycle
  const handleDisposal = () => {
    setNotifications((prev) => [
      { type: "info", message: "♻️ Disposal cycle started..." },
      ...prev,
    ]);

    setTimeout(() => {
      setCurrentWaste(0);
      setPlasticWaste(0);
      setNotifications((prev) => [
        { type: "success", message: "✅ Disposal cycle completed. Bin is empty." },
        ...prev,
      ]);
    }, 2000); // simulate 2s processing
  };

  return (
    <div className="med-container">
      {/* Header */}
      <motion.div
        className="med-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Plasma Pyrolysis – Medical Waste Management</h1>
        <button className="trigger-btn" onClick={handleDisposal}>
          ⚡ Trigger Disposal Cycle
        </button>
      </motion.div>

      {/* Dashboard Info */}
      <div className="med-grid">
        <motion.div className="med-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Activity className="icon safe" />
          <h3>Total Waste Today</h3>
          <p>{currentWaste} kg</p>
        </motion.div>

        <motion.div
          className="med-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Clock className="icon clock" />
          <h3>Current Cycle Time</h3>
          <p>
            {formattedDate} – {formattedTime}
          </p>
        </motion.div>

        <motion.div
          className="med-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Flame className="icon flame" />
          <h3>Status</h3>
          <p className={currentWaste < binCapacity * 0.8 ? "safe" : "warning"}>
            {currentWaste < binCapacity * 0.8 ? "Safe Level ✅" : "High Load ⚠️"}
          </p>
        </motion.div>

        <motion.div
          className="med-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Zap className="icon energy" />
          <h3>Electricity from Plastic</h3>
          <p>{electricityProduced} kWh ⚡</p>
        </motion.div>
      </div>

      {/* Circular Bin Progress */}
      <motion.div
        className="med-section bin-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>🗑️ Trash Bin Capacity</h2>
        <div className="circle-wrapper">
          <svg width="200" height="200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#e0e0e0"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#ff4d4d"
              strokeWidth="15"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="circle-text">
            <h3>{wastePercentage.toFixed(1)}% Full</h3>
            <p>
              {currentWaste} kg / {binCapacity} kg
            </p>
          </div>
        </div>
      </motion.div>

      {/* Waste Categories */}
      <motion.div
        className="med-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>
          <Trash2 className="inline-icon" /> Waste Categories
        </h2>
        <div className="categories">
          {categories.map((item) => (
            <div key={item.type} className={`category ${item.color}`}>
              <span>{item.type}</span>
              <span>{item.qty}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Previous Day History */}
      <motion.div
        className="med-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2>
          <Calendar className="inline-icon" /> Previous Day History
        </h2>
        <div className="history-card">
          <p>
            <strong>Date:</strong> {yesterdayHistory.date}
          </p>
          <p>
            <strong>Total Waste:</strong> {yesterdayHistory.wasteProcessed}
          </p>
          <p>
            <strong>Plastic Waste:</strong> {yesterdayHistory.plasticWaste} kg
          </p>
          <p>
            <strong>Electricity Generated:</strong> {yesterdayHistory.electricity}
          </p>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        className="med-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2>
          <Bell className="inline-icon" /> Notifications & Alerts
        </h2>
        {notifications.map((note, i) => (
          <div key={i} className={`notification ${note.type}`}>
            {note.message}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
