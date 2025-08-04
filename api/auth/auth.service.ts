import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";

import { UserRepository } from "../../repositories/user.repository";
import TYPES from "../../types/DI";
import CognitoClient from "../../lib/aws/cognito";
import { CustomError } from "../../utils/customError";
import { instanceToPlain } from "class-transformer";
import { AuthTokenResponseDTO } from "./auth.dto";
import { UserResponseDTO } from "../user/user.dto";

export class AuthService {
  private cognitoClient: typeof CognitoClient;
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) {
    this.cognitoClient = CognitoClient;
  }
  public signUp = async (email: string, username: string, password: string) => {
    const response = await this.cognitoClient.userSignUp(email, password);
    if (!response.UserSub) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Can not create user.");
    }
    const confirmResponse = await this.cognitoClient.adminConfirmSignUp(email);
    if (!confirmResponse) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "User confirmation failed."
      );
    }
    const user = await this.userRepository.create({
      email,
      username,
      id: response.UserSub,
    });
    if (!user) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "User creation failed."
      );
    }
    return instanceToPlain(new UserResponseDTO(user));
  };
  public signIn = async (email: string, password: string) => {
    const response = await this.cognitoClient.userSignIn(email, password);
    if (!response.AuthenticationResult) {
      return null;
    }
    return instanceToPlain(
      new AuthTokenResponseDTO({
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        idToken: response.AuthenticationResult.IdToken,
      })
    );
  };
  public refreshToken = async (refreshToken: string) => {
    const response = await this.cognitoClient.refreshToken(refreshToken);
    if (!response.AuthenticationResult) {
      return null;
    }
    return instanceToPlain(
      new AuthTokenResponseDTO({
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        idToken: response.AuthenticationResult.IdToken,
      })
    );
  }
}
