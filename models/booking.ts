import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export class Booking extends Model {
  id!: number;
  userId!: number;
  roomId!: number;
  startTime!: Date;
  endTime!: Date;

  static initialize(sequelize: Sequelize.Sequelize) {
    Booking.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Booking",
        tableName: "bookings",
      }
    );
  }
}
