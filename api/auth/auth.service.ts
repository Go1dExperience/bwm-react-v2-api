import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";

import { UserRepository } from "../../repositories/user.repository";
import TYPES from "../../types/DI";
import CognitoClient from "../../utils/cognito";
import { CustomError } from "../../utils/customError";

export class AuthService {
  private cognitoClient: typeof CognitoClient;
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) {
    this.cognitoClient = CognitoClient;
  }
  public signUp = async (email: string, password: string, username: string) => {
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
      password,
      id: response.UserSub,
    });
    if (!user) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "User creation failed."
      );
    }
    return user;
  };
}
