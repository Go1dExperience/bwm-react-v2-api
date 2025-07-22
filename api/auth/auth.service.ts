import { UserRepository } from "./../../repositories/user.repository";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpRequest,
} from "@aws-sdk/client-cognito-identity-provider";
import CognitoSingleton from "../../utils/cognito";
import { inject } from "inversify";
import { CustomError } from "../../utils/customError";
import { StatusCodes } from "http-status-codes";
import TYPES from "../../types/DI";

export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient = CognitoSingleton;
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}
  public signUp = async (email: string, password: string, username: string) => {
    const params: SignUpRequest = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    const response = await this.cognitoClient.send(new SignUpCommand(params));
    if (!response.UserSub) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Can not create user");
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
        "User creation failed"
      );
    }
    return {
      data: user,
      message: "User created successfully",
      errorCode: null,
    };
  };
}
