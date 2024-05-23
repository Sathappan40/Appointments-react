import React, { useState } from 'react';
import View from '../Pages/View';
import Delete from '../Pages/Delete';
import "../Styles/SettingsTabs.css"

function UserTabs() {
    const [activeTab, setActiveTab] = useState('view');
  
    return (
      <div>
        <div className="tabs">
          <button 
            className={`tab-link ${activeTab === 'view' ? 'active' : ''}`} 
            onClick={() => setActiveTab('view')}
          >
            View
          </button>
          <button 
            className={`tab-link ${activeTab === 'delete' ? 'active' : ''}`} 
            onClick={() => setActiveTab('delete')}
          >
            Delete
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'view' && <View />}
          {activeTab === 'delete' && <Delete />}
        </div>
      </div>
    );
  }
  
  export default UserTabs; 