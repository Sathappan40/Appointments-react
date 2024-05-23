import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Slots.css';

function Slots({ date }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`http://localhost:3000/slots?date=${date}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setSlots(data.availableSlots);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching available slots:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="slots-container">
      <h2>Available Slots for {date}</h2>
      {slots.length === 0 ? (
        <p className="no-slots">No available slots found for the selected date</p>
      ) : (
        <ul className="slots-list">
          {slots.map((slot, index) => (
            <li key={index} className="slot-box">
              <p>Start Time: {slot.startTime}</p>
              <p>End Time: {slot.endTime}</p>
              <button onClick={() => navigate(`/booking?start_time=${slot.startTime}&end_time=${slot.endTime}`)}>
                Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Slots;