// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, AuthContext } from "./context/AuthContext";

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
import  MedWaste from "./pages/MedWaste";


// Protected Route
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
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
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
