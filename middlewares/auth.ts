import { NextFunction, Request, Response } from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { StatusCodes } from "http-status-codes";
import jwksRsa from "jwks-rsa";
import { createErrorResponse } from "../utils/apiResponse";
import container from "../inversify.config";
import TYPES from "../types/DI";
import { UserRepository } from "../repositories/user.repository";

const baseJWTMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
  }),
  issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}`,
  algorithms: ["RS256"],
  requestProperty: "auth",
  credentialsRequired: true,
});

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    baseJWTMiddleware(req as JWTRequest, res, async (err) => {
      if (err) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send(
            createErrorResponse(
              StatusCodes.UNAUTHORIZED,
              err.message || "Error validating JWT token."
            )
          );
        return;
      }
      // @ts-ignore
      const { username } = (req as JWTRequest).auth;
      if (!username) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send(
            createErrorResponse(
              StatusCodes.UNAUTHORIZED,
              "Unauthorized access: Invalid token."
            )
          );
        return;
      }
      const userRepository = container.get<UserRepository>(
        TYPES.UserRepository
      );
      const user = await userRepository.findOne({ where: { id: username } });
      if (!user) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send(
            createErrorResponse(
              StatusCodes.UNAUTHORIZED,
              "Unauthorized access: User not found."
            )
          );
        return;
      }
      req.user = user;
      next();
    });
  };
};
