import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.headers.token as string;
    if (jwt.verify(token as string, process.env.JWT_secret as string)) {
      return next();
    }
  } catch (e) {
    return res.status(401).send(`Unauthorized\n${e}`);
  }
}

export default verifyToken;
