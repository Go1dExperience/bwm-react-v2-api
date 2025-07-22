import { Expose } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateBookingDTO {
  @IsNotEmpty()
  @IsDate()
  endAt!: Date;
  @IsNotEmpty()
  @IsDate()
  startAt!: Date;
  @IsNotEmpty()
  totalPrice!: number;
  @IsNotEmpty()
  days!: number;
  @IsNotEmpty()
  guests!: number;
  @IsNotEmpty()
  rentalId!: string;
}
export class BookingResponseDTO {
  @Expose()
  id!: string;
  @Expose()
  endAt!: Date;
  @Expose()
  startAt!: Date;
  @Expose()
  totalPrice!: number;
  @Expose()
  days!: number;
  @Expose()
  guests!: number;
  @Expose()
  userId!: string;
  @Expose()
  rentalId!: string;

  constructor(booking: Partial<BookingResponseDTO>) {
    Object.assign(this, booking);
  }
}
