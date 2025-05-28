import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // set your base URL here
  // You can add other defaults like headers here
});

export default api;