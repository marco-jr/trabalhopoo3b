/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authentication(
  req: any,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'JWT token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, process.env.TOKEN_SECRET);

    const { sub } = decode as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid JWT token' });
  }
}
