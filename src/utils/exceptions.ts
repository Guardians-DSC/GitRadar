import { AxiosError } from 'axios';
import AppError from '../errors/AppError';

export function catchGitHubNotFound(error: AxiosError): AppError {
  if (error.response) {
    const { data, status } = error.response;

    if (status === 404) return new AppError('GitHub username not found!', 404);
    else return new AppError(data.message, status);
  } else {
    return new AppError('Internal server error!', 500);
  }
}
