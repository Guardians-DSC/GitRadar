import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError('Internal server error.', 500);
  }

  try {
    const decoded = verify(token, secret) as TokenPayload;

    const { sub } = decoded;

    request.manager = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}

export default authMiddleware;
