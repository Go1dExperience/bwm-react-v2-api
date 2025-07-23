import { Expose } from "class-transformer";

export class UserResponseDTO {
  @Expose()
  id!: string;
  @Expose()
  email!: string;
  @Expose()
  username!: string;
  constructor(booking: Partial<UserResponseDTO>) {
    Object.assign(this, booking);
  }
}
