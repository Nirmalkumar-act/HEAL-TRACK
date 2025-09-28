import React, { useState } from "react";
import "../styles/PatientReview.css";

export default function PatientReview() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Arun Kumar", feedback: "Excellent care and quick response.", rating: 5 },
    { id: 2, name: "Priya Sharma", feedback: "Doctors were very polite and helpful.", rating: 4 },
  ]);

  const [newReview, setNewReview] = useState({ name: "", feedback: "", rating: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.feedback && newReview.rating > 0) {
      setReviews([...reviews, { id: reviews.length + 1, ...newReview }]);
      setNewReview({ name: "", feedback: "", rating: 0 });
    }
  };

  return (
    <div className="review-container">
      <h2>📝 Patient Reviews</h2>
      <div className="review-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-card">
            <h4>{r.name}</h4>
            <p>{r.feedback}</p>
            <span>{"⭐".repeat(r.rating)}</span>
          </div>
        ))}
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        />
        <textarea
          placeholder="Your Feedback"
          value={newReview.feedback}
          onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
        >
          <option value="0">Select Rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
