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
  if (err instanceof CustomError) {
    res
      .status(err.statusCode)
      .send(createErrorResponse(err.statusCode, err.message));
    return;
  }
  logger.log(`Unhandled error: ${err}`);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(
      createErrorResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal server error"
      )
    );
}
