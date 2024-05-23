import React, { useState, useEffect } from 'react';
import '../Styles/Active.css';

function Active() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3000/active');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching active appointments:', err);
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

  console.log(appointments.length)
  return (
    <div className="active-appointments-container">
      <h1>Active Appointments</h1>
      {appointments.length === 0 ? (
        <p className="no-appointments" style={{color: 'black'}}>No appointments for today</p>
      ) : (
        <ul className="active-appointment-list">
          {appointments.map((appointment, index) => (
            <li key={index} className="active-appointment-box">
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

export default Active;