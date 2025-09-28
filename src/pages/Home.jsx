import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const bannerImages = [
  "https://www.egohealth.it/wp-content/uploads/2014/03/f.jpg",
  "https://s3.amazonaws.com/prodblogbucket/1/blogCover/ae48e534-dcf8-4c35-93c8-1fab3ceadd25.jpeg",
  "https://www.rsiconcepts.com/blog/wp-content/uploads/2023/01/Queue-Management-System-Features-you-Need-for-Modern-Queuing-1.jpg",
  "https://www.rsiconcepts.com/blog/wp-content/uploads/2021/09/Why-do-you-need-a-queue-management-system_1.jpg",
  "https://www.shutterstock.com/image-vector/health-care-medical-science-icon-260nw-2461043781.jpg"

];

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % bannerImages.length);
      }, 4000);
    }
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prev = () => setCurrentIndex((i) => (i - 1 + bannerImages.length) % bannerImages.length);
  const next = () => setCurrentIndex((i) => (i + 1) % bannerImages.length);

  return (
    <div className="home">
      {/* HERO SLIDER */}
      <div
        className="hero"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div
          className="hero-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerImages.map((img, idx) => (
            <div className="hero-slide" key={idx}>
              <img
                src={img}
                alt={`Hospital banner ${idx + 1}`}
                className="hero-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/1600x600?text=Hospital+Banner";
                }}
              />
            </div>
          ))}
        </div>

        <button className="slider-arrow left" onClick={prev}>‹</button>
        <button className="slider-arrow right" onClick={next}>›</button>

        <div className="hero-overlay">
          <h1>Welcome to Heal Track 🏥</h1>
          <button className="cta-btn" onClick={() => navigate("/booking")}>
            Book Appointment
          </button>
        </div>

        <div className="slider-dots">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="about clickable" onClick={() => navigate("/about")}>
        <h2>Why Choose Us?</h2>
        <p>
          Our Hospital Management System (HMS) provides a seamless experience
          for patients, doctors, and staff. From patient registration to doctor
          appointments, everything is digitized for faster and better service.
        </p>
        <div className="about-features">
          <p>Easy patient registration & appointment booking</p>
          <p>Real-time hospital & doctor tracking</p>
          <p>Secure patient data management</p>
          <p>24/7 support & emergency response system</p>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="services">
        <h2>Our Key Services</h2>
        <div className="service-grid">
          <div className="service-card clickable" onClick={() => navigate("/about")}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Doctor_talking_with_a_patient.jpg"
              alt="Doctor Consultation"
            />
            <h3>About Our App</h3>
            <p>Learn more about our mission, vision, and quality of patient care.</p>
          </div>

          <div className="service-card clickable" onClick={() => navigate("/emergency")}>
            <img
              src="https://primcosecurity.com/wp-content/uploads/2021/07/emergency-response-slide-1.jpg"
              alt="Emergency Care"
            />
            <h3>Emergency Care</h3>
            <p>24/7 ambulance services and rapid response for critical patients.</p>
          </div>

          <div className="service-card clickable" onClick={() => navigate("/services")}>
            <img
              src="https://d1v1e13ebw3o15.cloudfront.net/data/70707/pool_and_spa_master/..jpg"
              alt="Hospital Services"
            />
            <h3>Hospital Services</h3>
            <p>
              Explore digital records, online consultations, and comprehensive care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
