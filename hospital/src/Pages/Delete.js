import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../Styles/Delete.css';


function Delete() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      // Fetch the patient by email to get the patient ID
      const response = await axios.get(`http://localhost:3000/fetch?email=${email}`);
      if (response.data.slots.length === 0) {
        setMessage('No patient found with the provided email.');
        return;
      }

      // Assuming the first patient found is the one to delete
      const patientId = response.data.slots[0].id;
      console.log(patientId);

      // Delete the patient booking using the patient ID
      await axios.delete(`http://localhost:3000/delete?id=${patientId}`);
      if (response.status === 204 || response.status === 200) {
        //setMessage('Booking deleted successfully.');
        alert('Booking deleted successfully.');
        navigate('/'); // Navigate to the root directory
      } else {
        setMessage('No appointments on the given Email');
      }
    } catch (err) {
      setMessage('Please try again with correct email');
      console.error('Error deleting booking:', err);
    }
  };

  return (
    <div className="delete-booking-container">
      <h2>Delete Booking</h2>
      <form onSubmit={handleDelete}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleInputChange} required />
        </label>
        <button type="submit delete-booking-container">Delete Booking</button>
      </form>
      {message && <p className="delete-message">{message}</p>}
    </div>
  );
}

export default Delete;
