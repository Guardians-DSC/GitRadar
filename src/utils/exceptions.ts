import { AxiosError } from 'axios';
import AppError from '../errors/AppError';

const catchGitHubNotFound = (error: AxiosError): AppError => {
  console.log('error', error);

  if (error.response) {
    const { data, status } = error.response;

    if (status === 404) return new AppError('GitHub username not found!', 404);
    return new AppError(data.message, status);
  }
  return new AppError('Internal server error!', 500);
};

export { catchGitHubNotFound };
