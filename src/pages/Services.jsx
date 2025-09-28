import React from "react";
import "../styles/Services.css";

const Services = () => {
  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive healthcare features integrated into one platform.</p>
      </div>

      <div className="services-grid">
        {/* Doctor Consultation */}
        <div className="service-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Doctor_talking_with_a_patient.jpg"
            alt="Doctor Consultation"
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="https://via.placeholder.com/640x420?text=Doctor"; e.currentTarget.onerror=null; }}
          />
          <h3>Doctor Consultation</h3>
          <p>Schedule appointments and manage doctor availability efficiently.</p>
        </div>

        {/* Emergency Care */}
        <div className="service-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Emergency_Room_(18359923719).jpg"
            alt="Emergency Care"
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="https://via.placeholder.com/640x420?text=Emergency"; e.currentTarget.onerror=null; }}
          />
          <h3>Emergency Care</h3>
          <p>24/7 ambulance, triage, and prioritized treatment workflows.</p>
        </div>

        {/* Digital Records */}
        <div className="service-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/74/Electronic_medical_record.jpg"
            alt="Digital Records"
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="https://via.placeholder.com/640x420?text=EHR"; e.currentTarget.onerror=null; }}
          />
          <h3>Digital Records</h3>
          <p>Secure EHR access for clinicians and patients with audit logs.</p>
        </div>

        {/* Integrated Pharmacy */}
        <div className="service-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Hospital_Pharmacy.JPG"
            alt="Hospital Pharmacy"
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="https://via.placeholder.com/640x420?text=Pharmacy"; e.currentTarget.onerror=null; }}
          />
          <h3>Integrated Pharmacy</h3>
          <p>Prescription management and stock integration with billing.</p>
        </div>

        {/* Diagnostics / Lab */}
        <div className="service-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/00/Hospital_Laboratory.JPG"
            alt="Diagnostics Lab"
            loading="lazy"
            onError={(e)=>{ e.currentTarget.src="https://via.placeholder.com/640x420?text=Diagnostics"; e.currentTarget.onerror=null; }}
          />
          <h3>Diagnostics</h3>
          <p>Lab integration, test ordering, and result delivery to EHR.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
