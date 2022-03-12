import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
});

export default instance;
