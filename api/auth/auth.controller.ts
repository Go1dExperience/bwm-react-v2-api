import { instanceToPlain, plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { UserResponseDTO } from "../user/user.dto";

import TYPES from "../../types/DI";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/apiResponse";
import { Validator } from "../../utils/validator";
import { SignInUserDTO, SignUpUserDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private authService: AuthService
  ) {}
  public signUp = async (req: Request, res: Response) => {
    const dto = plainToClass(SignUpUserDTO, req.body);
    const errors = await Validator.validate(dto);
    if (errors.length > 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(
          createErrorResponse(
            StatusCodes.BAD_REQUEST,
            "Invalid sign up data: " + errors
          )
        );
      return;
    }
    const { email, username, password } = dto;
    const response = await this.authService.signUp(email, username, password);
    if (!response) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          createErrorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "User creation failed."
          )
        );
      return;
    }
    res
      .status(StatusCodes.CREATED)
      .send(
        createSuccessResponse(
          instanceToPlain(new UserResponseDTO(response)),
          "User created successfully"
        )
      );
  };
  public signIn = async (req: Request, res: Response) => {
    const dto = plainToClass(SignInUserDTO, req.body);
    const errors = await Validator.validate(dto);
    if (errors.length > 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(
          createErrorResponse(
            StatusCodes.BAD_REQUEST,
            "Invalid sign in data: " + errors
          )
        );
      return;
    }
    const { email, password } = dto;
    const response = await this.authService.signIn(email, password);
    if (!response) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send(
          createErrorResponse(
            StatusCodes.UNAUTHORIZED,
            "Invalid email or password."
          )
        );
      return;
    }
    res
      .status(StatusCodes.OK)
      .send(createSuccessResponse(response, "User signed in successfully"));
  }
}
