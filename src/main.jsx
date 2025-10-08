// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </AuthProvider>
);
