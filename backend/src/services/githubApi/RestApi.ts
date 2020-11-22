import axios from 'axios';
import GetGithubTokenService from '../GetGithubTokenService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGlobal: any = global;

const api = axios.create({
  baseURL: 'https://api.github.com',
});

api.interceptors.request.use(async config => {
  if (!useGlobal.managerToken) {
    const getGithubTokenService = new GetGithubTokenService();
    const token = await getGithubTokenService.execute();
    console.log(token);

    if (token) {
      useGlobal.managerToken = token;
    }
  }
  if (useGlobal.managerToken) {
    config.headers.authorization = `token ${useGlobal.managerToken}`;
  }

  return config;
});

export default api;
