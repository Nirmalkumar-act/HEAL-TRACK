import React from "react";

export default function QueueList({ queue = [] }) {
  if (!queue.length) return <p className="muted">No patients in queue.</p>;
  return (
    <ul className="queue-list">
      {queue.map(q => (
        <li key={q.token}>
          <span className="token">#{q.token}</span>
          <span className="name">{q.patientName}</span>
          <span className="small">{q.reason || "General"}</span>
        </li>
      ))}
    </ul>
  );
}
