import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @MinLength(6)
  username!: string;
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
export class SignInUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

export class AuthTokenResponseDTO {
  @Expose()
  accessToken!: string;
  @Expose()
  refreshToken!: string;
  @Expose()
  idToken!: string;
  constructor(booking: Partial<AuthTokenResponseDTO>) {
    Object.assign(this, booking);
  }
}
