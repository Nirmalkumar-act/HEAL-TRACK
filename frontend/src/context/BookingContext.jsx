// src/context/BookingContext.jsx
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState({}); // { "Dr. A": true, "Dr. B": false }

  // Add booking (with doctorname)
  const addBooking = (booking) => {
    const exists = bookings.some(
      (b) =>
        b.name === booking.name &&
        b.condition === booking.condition &&
        b.date === booking.date
    );
    if (exists) {
      alert("⚠️ This patient is already registered today!");
      return;
    }

    // Ensure doctorname is set
    const doctorname = booking.doctorname || booking.doctor || "";
    const newBooking = { ...booking, doctorname };
    setBookings((prev) => [...prev, newBooking]);
  };

  // Move to next patient
  const nextPatient = () => {
    if (bookings.length > 0) {
      setBookings((prev) => prev.slice(1));
    }
  };

  // Clear entire queue
  const clearQueue = () => setBookings([]);

  // Queue status
  const getQueueStatus = (token) => {
    const index = bookings.findIndex((b) => b.token === token);
    if (index === -1) return "❌ Not in queue";
    if (index === 0) return "✅ Now Serving";
    return `⏳ Waiting... ${index} ahead`;
  };

  // Set doctor availability
  const setDoctorAvailability = (doctorName, available) => {
    setDoctors((prev) => ({ ...prev, [doctorName]: available }));
  };

  const isDoctorAvailable = (doctorName) => doctors[doctorName] ?? true;

  // Update doctorname for all bookings
  const updateDoctorName = (oldName, newName) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.doctor === oldName || b.doctorname === oldName
          ? { ...b, doctorname: newName }
          : b
      )
    );

    // Update doctors mapping
    setDoctors((prev) => {
      const newDoctors = { ...prev };
      if (oldName in newDoctors) {
        newDoctors[newName] = newDoctors[oldName];
        delete newDoctors[oldName];
      }
      return newDoctors;
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        addBooking,
        nextPatient,
        clearQueue,
        getQueueStatus,
        doctors,
        setDoctorAvailability,
        isDoctorAvailable,
        updateDoctorName,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
