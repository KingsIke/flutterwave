import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface Tokonization {
  email: string;
  token: string;
  first_6digits: string;
  last_4digits: string;
  id: string;
}

export class CardDetails extends Model<Tokonization> {
  declare email: string;
  declare token: string;
  declare last_4digits: string;
  declare first_6digits: string;
  declare id: string;
}

CardDetails.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_4digits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_6digits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connectDB(),
    tableName: "Email_Token",
  }
);

CardDetails.sync();
