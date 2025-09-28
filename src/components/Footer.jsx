// src/components/Footer.jsx
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaUsers
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-item">
          <FaPhoneAlt className="footer-icon" />
          <span>+91 98765 43210</span>
        </div>
        <div className="footer-item">
          <FaEnvelope className="footer-icon" />
          <span>support@hms.com</span>
        </div>
        <div className="footer-item">
          <FaGlobe className="footer-icon" />
          <span>www.hms-portal.com</span>
        </div>
      </div>

      {/* Patient Review Link Moved Here */}
      <div className="footer-links">
        <NavLink to="/review" className="footer-link">
          <FaUsers className="footer-icon" /> Patient Review
        </NavLink>
      </div>

      <div className="footer-social">
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          <FaPinterest />
        </a>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} HMS Portal. All rights reserved.
      </p>
    </footer>
  );
}
