import axios from 'axios';

const instance = axios.create({
  BaseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
});

export default instance;
