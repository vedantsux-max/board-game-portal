// src/api.js
const API_BASE_URL = "https://board-game-portal.onrender.com/api";

// Register new user
export async function registerUser(userData) {
    try {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
} catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Network error" };
  }
}


// Login existing user
export async function loginUser(userData) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
}

// ✅ ADD THIS FUNCTION to fix your build
export async function saveScore(scoreData) {
  try {
    const res = await fetch(`${API_BASE_URL}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scoreData),
    });
    return await res.json();
  } catch (error) {
    console.error("Error saving score:", error);
    return { success: false };
  }
}
