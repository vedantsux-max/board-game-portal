// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import TicTacToe from './components/TicTacToe';
import Ludo from './components/Ludo';
import DiceRace from './components/DiceRace';
import DinoGame from './components/DinoGame';
import Subscribe from './components/Subscribe';

function App() {
  const [user, setUser] = useState(null);

  // ✅ Keep user logged in even after refresh
  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("user");
    }
  } catch (err) {
    console.error("Error parsing user data from localStorage:", err);
    localStorage.removeItem("user");
  }
}, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="/dicerace" element={<DiceRace />} />
        <Route path="/dinogame" element={<DinoGame />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </Router>
  );
}

export default App;
