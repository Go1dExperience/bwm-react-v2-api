import { createHmac } from "crypto";
import {
  AdminConfirmSignUpCommand,
  AdminConfirmSignUpCommandOutput,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  SignUpRequest,
} from "@aws-sdk/client-cognito-identity-provider";

class CognitoClient {
  private instance: CognitoIdentityProviderClient;
  public constructor() {
    this.instance = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION || "us-east-1", // Default region if not set
    });
  }
  public userSignUp = async (email: string, password: string) => {
    const secretHash = generateSecretHash(
      email,
      process.env.AWS_COGNITO_CLIENT_ID!,
      process.env.AWS_COGNITO_CLIENT_SECRET!
    );
    const params: SignUpRequest = {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      Username: email,
      SecretHash: secretHash,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    const command = new SignUpCommand(params);
    return await this.instance.send(command);
  };
  public adminConfirmSignUp = async (
    username: string
  ): Promise<AdminConfirmSignUpCommandOutput> => {
    const command = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
      Username: username,
    });
    return await this.instance.send(command);
  };

  public userSignIn = async (email: string, password: string) => {
    const secretHash = generateSecretHash(
      email,
      process.env.AWS_COGNITO_CLIENT_ID!,
      process.env.AWS_COGNITO_CLIENT_SECRET!
    );
    const command = new InitiateAuthCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });
    return await this.instance.send(command);
  };
}

/**
 * Generates the Cognito Secret Hash.
 * @param {string} username The username of the user.
 * @param {string} appClientId The ID of your Cognito User Pool App Client.
 * @param {string} appClientSecret The secret of your Cognito User Pool App Client.
 * @returns {string} The base64-encoded secret hash.
 */
const generateSecretHash = (
  username: string,
  appClientId: string,
  appClientSecret: string
) => {
  const message = username + appClientId;
  const hmac = createHmac("sha256", appClientSecret);
  hmac.update(message);
  return hmac.digest("base64");
};

export default new CognitoClient();
