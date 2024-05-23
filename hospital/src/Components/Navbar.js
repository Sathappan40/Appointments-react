import React from 'react'
import { Link } from "react-router-dom";
import '../Styles/Navbar.css'

function Navbar() {
  return (
    <div className='nav'>
      <a className="nav-link active" href="/">Home</a>
      <a className="nav-link active" href="/active">Active</a>
      <a className="nav-link active" href="/history">History</a>
      <a className="nav-link active" href="/slots">Slots</a>
      <a className="nav-link active" href="/enter">Settings</a>
      <a className="nav-link active" href="/user">User</a>
      
    </div>
  );
}

export default Navbar;