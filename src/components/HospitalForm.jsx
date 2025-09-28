import React, { useState } from "react";
import { addHospital } from "../services/api";
import "../styles/HospitalForm.css";

export default function HospitalForm({ refresh }) {
  const [form, setForm] = useState({ name: "", location: "", details: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHospital(form);
    setForm({ name: "", location: "", details: "" });
    refresh(); // reload list
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Hospital Name" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <textarea name="details" value={form.details} onChange={handleChange} placeholder="Details"></textarea>
      <button type="submit">Add Hospital</button>
    </form>
  );
}
