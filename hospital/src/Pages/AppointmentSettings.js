
import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../Styles/AppointmentSettings.css';

function AppointmentSettings() {
  const [day, setDay] = useState('');
  const [dayStartTime, setDayStartTime] = useState('');
  const [dayEndTime, setDayEndTime] = useState('');
  const [slotTiming, setSlotTiming] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/setting', {
        day,
        day_start_time: dayStartTime,
        day_end_time: dayEndTime,
        slot_timing: slotTiming,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201 || response.status === 200 || response.status === 204) {
        alert('Settings created successfully');
        navigate('/');
      } else {
        alert('Failed to create settings');
      }
    } catch (error) {
      setMessage('Failed updating settings');
      console.error('There was an error updating the settings!', error);
    }
  };

  return (
    <div className="appointment-settings-box">
      <h2>Appointment Settings</h2>
      <form onSubmit={handleSubmit} className="appointment-settings-form">
        <div className="ap-form-group">
          <label>Day:</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="ap-form-group">
          <label>Day Start Time:</label>
          <input
            type="time"
            value={dayStartTime}
            onChange={(e) => setDayStartTime(e.target.value)}
          />
        </div>
        <div className="ap-form-group">
          <label>Day End Time:</label>
          <input
            type="time"
            value={dayEndTime}
            onChange={(e) => setDayEndTime(e.target.value)}
          />
        </div>
        <div className="ap-form-group">
          <label>Slot Timing:</label>
          <input
            type="text"
            value={slotTiming}
            onChange={(e) => setSlotTiming(e.target.value)}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AppointmentSettings;
