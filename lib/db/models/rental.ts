import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { User } from "./user";
import { sequelize } from "../sequelize";

export class Rental extends Model<
  InferAttributes<Rental>,
  InferCreationAttributes<Rental>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare city: string;
  declare street: string;
  declare category: string;
  declare image: string;
  declare bedrooms: number;
  declare description: string;
  declare shared: boolean;
  declare dailyRate: number;
  declare createdAt: CreationOptional<Date>;
  declare userId: ForeignKey<User["id"]>;

}

Rental.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
    },
    shared: {
      type: DataTypes.BOOLEAN,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dailyRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
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
  },
  {
    sequelize,
    modelName: "Rental",
    tableName: "rentals",
    timestamps: true,
  }
);
