import axios from 'axios';
import GetTeacherTokenService from './GetTeacherTokenService';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.interceptors.request.use(async config => {
  const getTeacherToken = new GetTeacherTokenService();
  const token = await getTeacherToken.execute();

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
