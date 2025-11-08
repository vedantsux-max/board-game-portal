import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
        setSuccess(true);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setSuccess(false);
        setMessage("❌ Invalid credentials");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {message && (
          <p className={`message ${success ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="register-text">
          Don’t have an account?{" "}
          <Link className="link-button" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
