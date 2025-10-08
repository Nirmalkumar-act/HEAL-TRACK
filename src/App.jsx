// src/App.jsx
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Emergency from "./pages/Emergency";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import ScanId from "./pages/ScanId";
import PatientReview from "./pages/PatientReview";
import DoctorDashboard from "./pages/DoctorDashboard";
import Confirmation from "./pages/BookingConfirmation";
import WaitingDisplay from "./pages/WaitingDisplay";
import HospitalTracker from "./pages/HospitalTracker";
import NearbyHospitals from "./pages/NearbyHospitals";
import GantradeCard from "./pages/GantradeCard";
import QRScanner from "./pages/QRScanner";
import Login from "./pages/Login";
import MedWaste from "./pages/MedWaste";
import MDRDashboard from "./pages/MDRDashboard";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  // ✅ Google Translate Script - fixed duplication
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!window.translateElementInitialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr,de,zh,ta,hi,ar",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
          window.translateElementInitialized = true;
        }
      };
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <div className="app-wrapper flex flex-col min-h-screen bg-gray-50">
          <Navbar />

          {/* 🌍 Google Translate Dropdown */}
          <div
            id="google_translate_element"
            className="translate-container w-full text-center p-2 bg-blue-50 shadow-md"
          ></div>

          <main className="main-content flex-1 p-4">
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />

              {/* Protected */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              <Route path="/scan" element={<ProtectedRoute><ScanId /></ProtectedRoute>} />
              <Route path="/review" element={<ProtectedRoute><PatientReview /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
              <Route path="/confirmation" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
              <Route path="/waiting" element={<ProtectedRoute><WaitingDisplay /></ProtectedRoute>} />
              <Route path="/tracker" element={<ProtectedRoute><HospitalTracker /></ProtectedRoute>} />
              <Route path="/nearby" element={<ProtectedRoute><NearbyHospitals /></ProtectedRoute>} />
              <Route path="/gantrade" element={<ProtectedRoute><GantradeCard /></ProtectedRoute>} />
              <Route path="/qrscanner" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
              <Route path="/medwaste" element={<ProtectedRoute><MedWaste /></ProtectedRoute>} />
              <Route path="/mdr-dashboard" element={<ProtectedRoute><MDRDashboard /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
