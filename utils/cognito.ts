import {
  AdminConfirmSignUpCommand,
  AdminConfirmSignUpCommandOutput,
  CognitoIdentityProviderClient,
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
  // Add methods for interacting with AWS Cognito here
}
export default new CognitoClient();
