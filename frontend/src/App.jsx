import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChefDashboard } from './components/ChefDashboard';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Manager } from './components/Manager';

function App() {
  return (
   
    <Manager />
    
   /* 
   <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chef-dashboard" element={<ChefDashboard />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </Router> 
    */
  );
}

export default App;
