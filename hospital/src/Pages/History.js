import React, { useState, useEffect } from 'react';
import '../Styles/History.css';

function History() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3000/history', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointment history:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="appointment-history-container">
      <h1>Appointment History</h1>
      {appointments.length === 0 ? (
        <p className="no-appointments">No appointments found in history</p>
      ) : (
        <ul className="appointment-history-list">
          {appointments.map((appointment, index) => (
            <li key={index} className="appointment-history-item">
              <p>Date: {appointment.date}</p>
              <p>Start Time: {appointment.startTime}</p>
              <p>End Time: {appointment.endTime}</p>
              <p>Patient Name: {appointment.patient.name}</p>
              <p>Place: {appointment.patient.place}</p>
              <p>Phone: {appointment.patient.phone}</p>
              <p>Email: {appointment.patient.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default History;