import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import AppError from '../errors/AppError';

function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  if (error instanceof ValidationError) {
    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default errorHandlerMiddleware;
