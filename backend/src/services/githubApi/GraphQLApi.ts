import axios from 'axios';
import GetGithubTokenService from '../GetGithubTokenService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGlobal: any = global;

const api = axios.create({
  baseURL: 'https://api.github.com/graphql',
});

api.interceptors.request.use(async config => {
  if (!useGlobal.teacherToken) {
    const getGithubTokenService = new GetGithubTokenService();
    const token = await getGithubTokenService.execute();

    if (token) {
      useGlobal.managerToken = token;
    }
  }
  if (useGlobal.managerToken) {
    config.headers.authorization = `bearer ${useGlobal.managerToken}`;
  }

  return config;
});

export default api;
