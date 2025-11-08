// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import TicTacToe from "./components/TicTacToe";
import Ludo from "./components/Ludo";
import DiceRace from "./components/DiceRace";
import DinoGame from "./components/DinoGame";
import Subscribe from "./components/Subscribe";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Invalid user data in localStorage");
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
