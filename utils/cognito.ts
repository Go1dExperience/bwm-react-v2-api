import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

class CognitoSingleton {
  private static instance: CognitoIdentityProviderClient;
  private constructor() {}
  public static getInstance(): CognitoIdentityProviderClient {
    if (!CognitoSingleton.instance) {
      CognitoSingleton.instance = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION || "us-east-1", // Default region if not set
      });
    }
    return CognitoSingleton.instance;
  }
  // Add methods for interacting with AWS Cognito here
}

export default CognitoSingleton.getInstance();
