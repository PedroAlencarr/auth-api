import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not configured.");
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }
}
