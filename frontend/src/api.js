import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3000/api'
      : 'https://leaderboard-mern.onrender.com/api',
});

export default API;
