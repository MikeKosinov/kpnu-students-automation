import axios from 'axios';
const request = axios.create({
  baseURL: `${process.env.BASE_URL}/rest/default/V1`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
