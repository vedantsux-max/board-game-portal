// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TicTacToe from './components/TicTacToe';
import Ludo from './components/Ludo';
import DiceRace from './components/DiceRace';
import DinoGame from './components/DinoGame';
import Subscribe from './components/Subscribe';
import Profile from './components/Profile'; // Ensure you have this component

function App() {
  const [user, setUser] = useState(null);

  // Check for saved user when app loads
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      localStorage.removeItem('user');
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="/dicerace" element={<DiceRace />} />
        <Route path="/dinogame" element={<DinoGame />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
