import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Rental } from "./rental";
import { User } from "./user";
import { sequelize } from "../sequelize";

export class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<string>;
  declare endAt: Date;
  declare startAt: Date;
  declare totalPrice: number;
  declare days: number;
  declare guests: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare userId: ForeignKey<User["id"]>;
  declare rentalId: ForeignKey<Rental["id"]>;
}

Booking.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    endAt: {
      type: DataTypes.DATE,
    },
    startAt: {
      type: DataTypes.DATE,
    },
    totalPrice: {
      type: DataTypes.NUMBER,
    },
    days: {
      type: DataTypes.NUMBER,
    },
    guests: {
      type: DataTypes.NUMBER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    rentalId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "rentals",
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "bookings",
    timestamps: true,
  }
);
