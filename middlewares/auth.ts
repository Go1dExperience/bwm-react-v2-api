import { NextFunction, Request, Response } from "express";

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
	next();
}
