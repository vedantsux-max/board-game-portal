// src/components/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setIsSuccess(false);
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // ✅ Normalize backend response
      const success =
        res.success === true ||
        res.message?.toLowerCase().includes("registered successfully");

      if (success) {
        setIsSuccess(true);
        setMessage("✅ Registration successful! Redirecting to login…");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setIsSuccess(false);
        setMessage(`❌ ${res.message || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setIsSuccess(false);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "10px",
              color: isSuccess ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <p className="login-text">
          Already have an account?{" "}
          <Link className="link-button" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
