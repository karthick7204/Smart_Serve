import React, { useState } from 'react';
import api, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);

      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      if (payload.role === 'waiter') nav('/waiter');
      else if (payload.role === 'chef') nav('/chef');
      else nav('/manager');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-lime-400 p-6 rounded shadow" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Smart Serve Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="block w-full mb-3 p-2 border" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="block w-full mb-4 p-2 border" required />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
