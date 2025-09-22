import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Our Hospital Management System</h1>
        <p>
          We are revolutionizing healthcare with a smart, integrated system that
          enhances hospital efficiency, patient experience, and doctor workflows.
        </p>
        <img
          className="about-hero-img"
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Modern Hospital"
        />
      </div>

      {/* Mission Section */}
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>
         To deliver seamless, efficient, and patient-centric healthcare through smart digital hospital management solutions.
        </p>
      </div>

      {/* Core Features */}
      <div className="about-features">
        <h2>Core Features</h2>
        <ul>
          <li>Real-time Queue Management (HQMS) to reduce waiting times</li>
          <li>GPS-enabled hospital and specialist detection for emergencies</li>
          <li>Integrated patient ID scanning (Aadhaar/QR/ID)</li>
          <li>Digital doctor dashboards with history and prescriptions</li>
          <li>Analytics for administrators to monitor hospital operations</li>
          <li>Token and queue management</li>
          <li>Online appointment booking</li>
          <li>Electronic medical record</li>
        </ul>
      </div>

      {/* Vision Section */}
      <div className="about-vision">
        <h2>Our Vision</h2>
        <p>
         To revolutionize healthcare delivery by creating a smart, accessible, and integrated hospital management platform that ensures efficiency, transparency, and patient-centric care.
        </p>
      </div>
    </section>
  );
};

export default About;
