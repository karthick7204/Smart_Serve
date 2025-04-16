import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManagerDashboard from './pages/ManagerDashboard';
import ChefDashboard from './pages/ChefDashboard';
import Login from './pages/login';
import WaiterDashboard from './pages/waiterDashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/chef" element={<ChefDashboard />} />
        <Route path="/waiter" element={<WaiterDashboard/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
