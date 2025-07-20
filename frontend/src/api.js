import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? '/api'
      : 'https://leaderboard-mern.onrender.com/api',
});

export default API;
