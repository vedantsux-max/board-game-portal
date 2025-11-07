import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signing up with\nName: ${fullName}\nEmail: ${email}`);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Account</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account? <Link className="link-button" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
