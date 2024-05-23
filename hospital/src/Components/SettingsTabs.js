import React, { useState } from 'react';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/Login';
import "../Styles/SettingsTabs.css"

function SettingsTabs() {
    const [activeTab, setActiveTab] = useState('Login');
  
    return (
      <div>
        <div className="tabs">
          <button 
            className={`tab-link ${activeTab === 'login' ? 'active' : ''}`} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`tab-link ${activeTab === '' ? 'signup' : ''}`} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'login' && <Login />}
          {activeTab === 'signup' && <SignUp />}
        </div>
      </div>
    );
  }
  
  export default SettingsTabs; 