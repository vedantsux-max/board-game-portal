import React, { useState } from "react";
import axios from "axios";
import "./Subscribe.css";

export default function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount] = useState(9); // subscription amount

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/subscribe", {
        name,
        email,
        cardNumber,
        expiry,
        cvv,
        amount,
      });

      if (response.data.success) {
        alert(response.data.message);
        setName("");
        setEmail("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
      } else {
        alert("Subscription failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="subscribe-container">
      <div className="subscribe-box">
        <h1>Subscribe</h1>
        <p className="amount">Amount to Pay: ${amount}</p>
        <form onSubmit={handleSubscribe}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
              maxLength="16"
            />
          </div>
          <div className="card-details">
            <div className="input-group small">
              <label>Expiry</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
                maxLength="5"
              />
            </div>
            <div className="input-group small">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
                maxLength="3"
              />
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="pay-btn">Subscribe Now</button>
            <button type="button" className="cancel-btn" onClick={() => alert("Subscription Cancelled")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
