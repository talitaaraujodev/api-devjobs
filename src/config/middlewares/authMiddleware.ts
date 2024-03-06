import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../../utils/errors/UnauthorizedError';
import envConfig from '../envConfig';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}
function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization || '';
    if (!authHeader) {
      return response.status(401).send(
        new UnauthorizedError('UnauthorizedError', {
          error: 'Token JWT não está presente',
        }),
      );
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer.trim().toLowerCase() !== 'bearer') {
      return response
        .status(401)
        .send(
          new UnauthorizedError('UnauthorizedError', [
            'Token JWT não está presente',
          ]),
        );
    }
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    (request as CustomRequest).token = decoded;

    next();
  } catch (error) {
    return response.status(401).send(
      new UnauthorizedError('UnauthorizedError', {
        error: 'Token JWT inspirado',
      }),
    );
  }
}
export { authMiddleware };
