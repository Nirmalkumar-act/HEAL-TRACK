import React, { useState } from "react";
import { addDoctor } from "../services/api";
import "../styles/DoctorForm.css";

export default function DoctorForm({ hospitalId, refresh }) {
  const [form, setForm] = useState({ name: "", specialization: "", availability: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoctor({ ...form, hospital: { id: hospitalId } });
    setForm({ name: "", specialization: "", availability: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Doctor Name" required />
      <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" required />
      <input name="availability" value={form.availability} onChange={handleChange} placeholder="Availability" />
      <button type="submit">Add Doctor</button>
    </form>
  );
}
