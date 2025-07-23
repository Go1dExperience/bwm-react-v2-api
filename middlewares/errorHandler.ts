import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import logger from "../utils/logger";
import { CustomError } from "../utils/customError";
import { createErrorResponse } from "../utils/apiResponse";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestInfo = JSON.stringify({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    query: req.query,
    params: req.params,
    user: req.user ? { id: req.user.id, email: req.user.email } : null,
  });
  if (err instanceof CustomError) {
    logger.log(`Custom error occurred: ${err.message}, Request Info: ${requestInfo}`);
    res
      .status(err.statusCode)
      .send(createErrorResponse(err.statusCode, err.message));
    return;
  }
  logger.log(`Unhandled error occurred: ${err}, Request Info: ${requestInfo}`);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(
      createErrorResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      )
    );
}
