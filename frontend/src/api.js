import axios from 'axios';

const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const saveScore = (payload) => axios.post(`${base}/api/scores`, payload);
export const fetchScores = (game) => axios.get(`${base}/api/scores${game ? '?game=' + game : ''}`);
