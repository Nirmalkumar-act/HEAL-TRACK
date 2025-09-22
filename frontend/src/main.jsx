// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BookingProvider } from "./context/BookingContext";  // import provider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>
);
