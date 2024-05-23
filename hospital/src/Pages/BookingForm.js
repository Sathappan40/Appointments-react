import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import '../Styles/BookingForm.css';

function BookingForm() {
  const [searchParams] = useSearchParams();
  const startTime = searchParams.get('start_time');
  const endTime = searchParams.get('end_time');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Parse the start and end times into moment objects
    const startMoment = moment(startTime, 'HH:mm');
    const endMoment = moment(endTime, 'HH:mm');

    // Assuming the date is today's date
    const currentDate = moment().format('YYYY-MM-DD');
    const formattedStartTime = `${currentDate}T${startMoment.format('HH:mm:ss')}`;
    const formattedEndTime = `${currentDate}T${endMoment.format('HH:mm:ss')}`;

    console.log("start time @:", formattedStartTime);
    console.log("end time @:", formattedEndTime);

    try {
      const response = await axios.post(
        `http://localhost:3000/booking?start_time=${formattedStartTime}&end_time=${formattedEndTime}`,
        { name, place, phone, email },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 201) {
        alert('Booking created successfully');
        navigate('/');
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Failed to creating booking:', error);
      alert('Failed to create booking');
    }
  };

  return (
    <div className="booking-form-box">
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Booking Form</h2>
        <div className="booking-form-group">
          <label>Start Time</label>
          <input type="text" value={startTime} readOnly />
        </div>
        <div className="booking-form-group">
          <label>End Time</label>
          <input type="text" value={endTime} readOnly />
        </div>
        <div className="booking-form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="booking-form-group">
          <label>Place</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div className="booking-form-group">
          <label>Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="booking-form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookingForm;

