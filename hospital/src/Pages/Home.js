import React from 'react';
import '../Styles/Home.css';
import myImage from "../Components/react3.jpg" 
import Footer from '../Components/Footer';

function Home() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-content">
          <h1>Book Your Appointment</h1>
        </div>
        <div className="home-image" style={{ backgroundImage: `url(${myImage})` }}>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
