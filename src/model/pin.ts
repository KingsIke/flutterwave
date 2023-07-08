import { Sequelize, Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface Pin_pay {
payload: object;
}

export class UserDetails extends Model<Pin_pay> {
  declare payload: object;
}

UserDetails.init(
  {
    payload: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
    sequelize: connectDB(),
    tableName: "User_Detail",
  }
);

UserDetails.sync();
