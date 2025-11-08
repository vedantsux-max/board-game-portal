import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="auth-container">
        <h3>⚠️ Please log in to view your profile.</h3>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>👤 Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}
