import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  username: string;
}
