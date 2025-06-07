import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Rental } from "./rental";
import { User } from "./user";

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
  declare user: ForeignKey<User["id"]>;
  declare rental: ForeignKey<Rental["id"]>;

  static initialize(sequelize: Sequelize) {
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
        user: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          primaryKey: true,
        },
        rental: {
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
  }
}
