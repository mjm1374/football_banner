import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
});

instance.defaults.headers.common['content-type'] = 'application/octet-stream';
instance.defaults.headers.common['X-RapidAPI-Key'] = `${process.env.REACT_APP_FOOTBALL_API}`;
instance.defaults.headers.common.RapidAPI = 'api-football-v1.p.rapidapi.com';

export default instance;
