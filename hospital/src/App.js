import './App.css';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Active from './Pages/Active';
import History from './Pages/History';
import User from './Pages/User';
import Slots from './Pages/Slots';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SettingsPage from './Pages/SettingsPage';
import AppointmentSettings from './Pages/AppointmentSettings';
import BookingForm from './Pages/BookingForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";



const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const date = getCurrentDate();

const App = () => {
  const isAuthenticated = () => {
      const token = localStorage.getItem('token');
      // You can add more logic to check token expiration or validity here
      return !!token;
  };

  return (
      <div className="App">
          <Navbar />
          <Router>
              <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/active" exact element={<Active />} />
                  <Route path="/history" exact element={<History />} />
                  <Route path="/slots" exact element={<Slots date={date} />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/booking" element={<BookingForm />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/enter" element={<SettingsPage />} />
                  <Route path="/setting" element={<AppointmentSettings />} />
              </Routes>
          </Router>
      </div>
  );
};

export default App;
