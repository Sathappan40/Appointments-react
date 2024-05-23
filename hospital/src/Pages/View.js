import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/View.css';

function View() {
  const [email, setEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setAppointments([]);

    try {
      const response = await axios.get(`http://localhost:3000/fetch?email=${email}`);
      if (response.data.slots.length === 0) {
        setError('No appointments found for the provided email.');
      } else {
        setAppointments(response.data.slots);
      }
    } catch (err) {
      setError('No appointments for the provided email. Please try again.');
      console.error('Error fetching appointments:', err);
    }
  };

  return (
    <div className="view-appointments-container">
      <div className="email-container">
        <h2>View Appointments</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleInputChange} required />
          </label>
          <button type="submit">Fetch Appointments</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      {appointments.length > 0 && (
        <div className="appointments-container">
          <h3>Appointments</h3>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index} className="appointment-box">
                <p><strong>Name:</strong> {appointment.name}</p>
                <p><strong>Place:</strong> {appointment.place}</p>
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Start Time:</strong> {appointment.startTime}</p>
                <p><strong>End Time:</strong> {appointment.endTime}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default View;
