import axios from 'axios';
import GetGithubTokenService from '../GetGithubTokenService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGlobal: any = global;

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.interceptors.request.use(async config => {
  if (!useGlobal.teacherToken) {
    const getGithubTokenService = new GetGithubTokenService();
    const token = await getGithubTokenService.execute();

    if (token) {
      useGlobal.teacherToken = token;
    }
  }
  if (useGlobal.teacherToken) {
    config.headers.authorization = `token ${useGlobal.teacherToken}`;
  }

  return config;
});

export default api;
