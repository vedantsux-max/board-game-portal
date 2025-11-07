import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Board Game Portal</h1>
        <form onSubmit={handleLogin}>
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
          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link className="link-button" to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
