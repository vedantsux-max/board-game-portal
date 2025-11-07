import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TicTacToe from './components/TicTacToe';
import Ludo from './components/Ludo';
import DiceRace from './components/DiceRace';
import DinoGame from './components/DinoGame';
import Subscribe from './components/Subscribe'; // Subscribe page


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/ludo" element={<Ludo />} />
        <Route path="/dicerace" element={<DiceRace />} />
        <Route path="/dinogame" element={<DinoGame />} />
        <Route path="/subscribe" element={<Subscribe />} /> {/* Subscription route */}
      </Routes>
    </Router>
  );
}

export default App;
