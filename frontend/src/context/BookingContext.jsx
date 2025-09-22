// src/context/BookingContext.jsx
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  // Add booking (prevent duplicates same day)
  const addBooking = (booking) => {
    const exists = bookings.some(
      (b) =>
        b.name === booking.name &&
        b.condition === booking.condition &&
        b.date === booking.date
    );
    if (!exists) {
      setBookings([...bookings, booking]);
    } else {
      alert("⚠️ This patient is already registered today!");
    }
  };

  // Call next patient
  const nextPatient = () => {
    if (bookings.length > 0) {
      const [, ...rest] = bookings;
      setBookings(rest);
    }
  };

  // Clear all queue
  const clearQueue = () => setBookings([]);

  // Queue status for token
  const getQueueStatus = (token) => {
    const index = bookings.findIndex((b) => b.token === token);
    if (index === -1) return "❌ Not in queue";
    if (index === 0) return "✅ Now Serving";
    return `⏳ Waiting... ${index} ahead`;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,     // For DoctorDashboard to update from backend
        addBooking,
        nextPatient,
        clearQueue,
        getQueueStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
